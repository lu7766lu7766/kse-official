<template>
  <Section tone="ink">
    <!-- LINE LIFF / 登入狀態列 (低調簡約設計) -->
    <div
      v-if="liff.isReady.value && (!liff.isInClient.value || (liff.isInClient.value && liff.profile.value))"
      class="mb-6 mx-auto max-w-4xl"
    >
      <!-- 狀態 1: 外部瀏覽器 且 尚未登入 LINE (低調提示條) -->
      <div
        v-if="!liff.isInClient.value && !liff.isLoggedIn.value"
        class="rise-in flex flex-wrap items-center justify-between gap-2.5 rounded-sm border border-border/50 bg-card/40 px-3.5 py-2 text-xs backdrop-blur"
      >
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="h-3.5 w-3.5 shrink-0 fill-[#06C755]/80" viewBox="0 0 24 24">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
          </svg>
          <span class="text-[12px]">使用 LINE 快速登入，可自動帶入預約資料並接收通知</span>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-sm border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-secondary hover:border-primary/40 transition-colors cursor-pointer"
          @click="liff.login()"
        >
          <svg class="h-3 w-3 fill-[#06C755]" viewBox="0 0 24 24">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
          </svg>
          <span>LINE 快速登入</span>
        </button>
      </div>

      <!-- 狀態 2: 外部瀏覽器 且 已登入 LINE (低調個人狀態列) -->
      <div
        v-else-if="!liff.isInClient.value && liff.isLoggedIn.value && liff.profile.value"
        class="rise-in flex items-center justify-between gap-3 rounded-sm border border-border/40 bg-card/30 px-3.5 py-1.5 text-xs backdrop-blur"
      >
        <div class="flex items-center gap-2 text-muted-foreground min-w-0">
          <img
            v-if="liff.profile.value.pictureUrl"
            :src="liff.profile.value.pictureUrl"
            :alt="liff.profile.value.displayName"
            class="h-5 w-5 shrink-0 rounded-full border border-border/60 object-cover"
          />
          <div
            v-else
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground font-bold"
          >
            {{ liff.profile.value.displayName.charAt(0) }}
          </div>
          <span class="truncate text-[12px]">
            LINE 帳號：<strong class="font-medium text-foreground">{{ liff.profile.value.displayName }}</strong>
          </span>
          <span class="hidden sm:inline text-[11px] text-muted-foreground/60">（已連動）</span>
        </div>

        <button
          type="button"
          class="text-[11px] text-muted-foreground/70 transition-colors hover:text-foreground cursor-pointer shrink-0"
          @click="liff.logout()"
        >
          切換 / 登出
        </button>
      </div>

      <!-- 狀態 3: LINE App 內部開啟 (LIFF 環境) -->
      <div
        v-else-if="liff.isInClient.value && liff.profile.value"
        class="rise-in flex items-center justify-between gap-3 rounded-sm border border-border/40 bg-card/30 px-3.5 py-1.5 text-xs backdrop-blur"
      >
        <div class="flex items-center gap-2 text-muted-foreground min-w-0">
          <img
            v-if="liff.profile.value.pictureUrl"
            :src="liff.profile.value.pictureUrl"
            :alt="liff.profile.value.displayName"
            class="h-5 w-5 shrink-0 rounded-full border border-border/60 object-cover"
          />
          <span class="truncate text-[12px]">
            已連動 LINE：<strong class="font-medium text-foreground">{{ liff.profile.value.displayName }}</strong>
          </span>
        </div>
        <span class="text-[11px] text-muted-foreground/60 shrink-0">
          完成將自動於此聊天室通知
        </span>
      </div>
    </div>

    <!-- 雙分頁切換 Tabs (可藉由 hideTabs / onlySlots 隱藏) -->
    <div v-if="!shouldHideTabs" class="mb-10 flex justify-center">
      <div class="inline-flex rounded-sm border border-border bg-card/70 p-1.5 backdrop-blur">
        <button
          type="button"
          :class="[
            'inline-flex items-center gap-2 rounded-sm px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'calendar'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeTab = 'calendar'"
        >
          <CalendarCheck class="h-4 w-4" />
          線上預約
        </button>

        <button
          type="button"
          :class="[
            'inline-flex items-center gap-2 rounded-sm px-6 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer',
            activeTab === 'search'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeTab = 'search'"
        >
          <Search class="h-4 w-4" />
          查詢 / 取消預約
        </button>
      </div>
    </div>

    <!-- Tab 1: 週行事曆線上預約 -->
    <div v-show="activeTab === 'calendar'" class="space-y-10">
      <!-- 預約流程指引卡片 (可藉由 hideSteps / onlySlots 隱藏) -->
      <div v-if="!shouldHideSteps" class="grid gap-4 sm:grid-cols-3">
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70">
          <span class="eyebrow text-[10px] mb-1">Step 01</span>
          <h4 class="text-sm font-bold text-foreground">選擇按摩師與時段</h4>
          <p class="mt-1 text-muted-foreground">瀏覽週曆各整點時段，點選合適的 1 小時服務區間（請至少提前半小時以上預約）。</p>
        </div>
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70">
          <span class="eyebrow text-[10px] mb-1">Step 02</span>
          <h4 class="text-sm font-bold text-foreground">填寫預約者資料</h4>
          <p class="mt-1 text-muted-foreground">填寫姓名與手機號碼，方便後續查詢與確認預約。</p>
        </div>
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70">
          <span class="eyebrow text-[10px] mb-1">Step 03</span>
          <h4 class="text-sm font-bold text-foreground">完成預約與到訪</h4>
          <p class="mt-1 text-muted-foreground">取得專屬預約編號，請於預約時間前 5~10 分鐘抵達教室。</p>
        </div>
      </div>

      <!-- 週行事曆組件 -->
      <div class="surface-card rounded-sm p-5 sm:p-8">
        <BookingCalendar
          ref="calendarRef"
          :only-available="shouldOnlyAvailable"
          @select-slot="handleSelectSlot"
        />
      </div>
    </div>

    <!-- Tab 2: 預約查詢與取消 -->
    <div v-show="!shouldHideTabs && activeTab === 'search'">
      <BookingSearch ref="searchRef" :initial-phone="searchInitialPhone" />
    </div>

    <!-- 常見問答與到訪提醒 (可藉由 hideInfo / onlySlots 隱藏) -->
    <div v-if="!shouldHideInfo" class="mt-16 border-t border-border/70 pt-10">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="surface-card rounded-sm p-6 border border-border/70">
          <h3 class="text-base font-bold text-foreground mb-2 flex items-center gap-2">
            <Clock class="h-4 w-4 text-primary" />
            服務須知與收費
          </h3>
          <p class="text-xs text-muted-foreground leading-relaxed">
            採預約制，請至少提前半小時以上預約。每次預約服務時間為 1 小時（含身體動作評估、徒手放鬆與動作優化建議）。
          </p>
        </div>

        <div class="surface-card rounded-sm p-6 border border-border/70">
          <h3 class="text-base font-bold text-foreground mb-2 flex items-center gap-2">
            <MapPin class="h-4 w-4 text-primary" />
            教室地址與交通
          </h3>
          <p class="text-xs text-muted-foreground leading-relaxed">
            {{ BRAND.address }}。周邊設有收費停車格與停車場，鄰近文心森林公園捷運站，交通十分便利。
          </p>
        </div>
      </div>
    </div>

    <!-- 填寫資料對話框 Modal -->
    <BookingModal :show="showModal" :slot="selectedSlot" @close="showModal = false" @success="handleBookingSuccess" />

    <!-- 預約成功確認卡片 Modal -->
    <BookingSuccessModal
      :show="showSuccessModal"
      :appointment="createdAppointment"
      :line-message-sent="lineMessageSent"
      @close="showSuccessModal = false"
      @go-to-search="handleGoToSearch"
    />
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue"
import { useRoute } from "vue-router"
import { CalendarCheck, Search, Clock, MapPin } from "lucide-vue-next"
import Section from "~/components/ui/Section.vue"
import BookingCalendar from "~/components/booking/BookingCalendar.vue"
import BookingModal from "~/components/booking/BookingModal.vue"
import BookingSuccessModal from "~/components/booking/BookingSuccessModal.vue"
import BookingSearch from "~/components/booking/BookingSearch.vue"
import type { HourlySlot } from "~/utils/timeSlotHelper"
import type { AppointmentRecord } from "~/composables/useBookingApi"
import { useLiff } from "~/composables/useLiff"
import { BRAND } from "~/utils/site-data"

const props = withDefaults(
  defineProps<{
    onlyAvailable?: boolean
    hideTabs?: boolean
    hideSteps?: boolean
    hideInfo?: boolean
    onlySlots?: boolean
  }>(),
  {
    onlyAvailable: false,
    hideTabs: false,
    hideSteps: false,
    hideInfo: false,
    onlySlots: false,
  }
)

const shouldOnlyAvailable = computed(() => props.onlyAvailable || props.onlySlots)
const shouldHideTabs = computed(() => props.hideTabs || props.onlySlots)
const shouldHideSteps = computed(() => props.hideSteps || props.onlySlots)
const shouldHideInfo = computed(() => props.hideInfo || props.onlySlots)

const route = useRoute()
const liff = useLiff()
const activeTab = ref<"calendar" | "search">("calendar")

// 選擇時段與預約表單狀態
const selectedSlot = ref<HourlySlot | null>(null)
const showModal = ref(false)

// 預約成功卡片狀態
const createdAppointment = ref<AppointmentRecord | null>(null)
const showSuccessModal = ref(false)
const lineMessageSent = ref(false)

// 查詢頁初始手機
const searchInitialPhone = ref("")

// 組件實例 Ref
const calendarRef = ref<any>(null)
const searchRef = ref<any>(null)

// 點擊週曆時段格
function handleSelectSlot(slot: HourlySlot) {
  selectedSlot.value = slot
  showModal.value = true
}

// 預約成功處理
async function handleBookingSuccess(appointment: AppointmentRecord) {
  createdAppointment.value = appointment
  lineMessageSent.value = false

  // 本地快取手機號碼
  liff.savePhone(appointment.customer_phone)

  // 只要有 LINE 登入資料，皆觸發官方帳號推播通知
  if (liff.isLoggedIn.value || liff.isInClient.value) {
    const res = await liff.sendBookingConfirmation(appointment)
    lineMessageSent.value = res.sent
  }

  showSuccessModal.value = true

  // 重新整理週曆時段
  if (calendarRef.value) {
    calendarRef.value.refresh()
  }
}

// 從成功卡片切換至查詢頁面
function handleGoToSearch(phone: string) {
  searchInitialPhone.value = phone
  activeTab.value = "search"
  if (searchRef.value) {
    searchRef.value.setPhoneAndSearch(phone)
  }
}

onMounted(() => {
  // 初始化 LINE LIFF SDK
  liff.init()

  if (route.query.tab === "search" || route.query.phone) {
    activeTab.value = "search"
    if (route.query.phone) {
      searchInitialPhone.value = String(route.query.phone)
      nextTick(() => {
        if (searchRef.value) {
          searchRef.value.setPhoneAndSearch(String(route.query.phone))
        }
      })
    }
  }
})
</script>
