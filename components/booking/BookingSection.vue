<template>
  <Section tone="ink">
    <!-- LINE LIFF / 登入狀態橫幅 (依環境與登入狀態動態切換) -->
    <div class="mb-8 mx-auto max-w-4xl">
      <!-- 狀態 1: 外部瀏覽器 且 尚未登入 LINE (顯示登入橫幅) -->
      <div
        v-if="liff.isReady.value && !liff.isInClient.value && !liff.isLoggedIn.value"
        class="rise-in relative overflow-hidden rounded-sm border border-[#06C755]/30 bg-linear-to-r from-[#06C755]/10 via-card to-card p-4 sm:p-5 backdrop-blur shadow-lg shadow-[#06C755]/5"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3.5">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#06C755] text-white shadow-md shadow-[#06C755]/30">
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-bold text-foreground">使用 LINE 快速登入預約</h4>
                <span class="rounded bg-[#06C755]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#06C755]">推薦</span>
              </div>
              <p class="mt-0.5 text-xs text-muted-foreground">
                一鍵帶入姓名，預約完成後可在 LINE 收到即時預約確認通知與提醒。
              </p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-sm bg-[#06C755] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#05b34c] hover:scale-[1.02] cursor-pointer shadow-md shadow-[#06C755]/25 shrink-0"
            @click="liff.login()"
          >
            <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
            </svg>
            <span>LINE 快速登入</span>
          </button>
        </div>
      </div>

      <!-- 狀態 2: 外部瀏覽器 且 已登入 LINE (顯示個人狀態列與登出) -->
      <div
        v-else-if="liff.isReady.value && !liff.isInClient.value && liff.isLoggedIn.value && liff.profile.value"
        class="rise-in flex items-center justify-between rounded-sm border border-border/80 bg-card/70 px-4 py-3 text-xs backdrop-blur"
      >
        <div class="flex items-center gap-3">
          <img
            v-if="liff.profile.value.pictureUrl"
            :src="liff.profile.value.pictureUrl"
            :alt="liff.profile.value.displayName"
            class="h-8 w-8 rounded-full border border-border object-cover"
          />
          <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
            {{ liff.profile.value.displayName.charAt(0) }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-foreground">{{ liff.profile.value.displayName }}</span>
              <span class="inline-flex items-center gap-1 rounded bg-[#06C755]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#06C755] border border-[#06C755]/30">
                <span class="h-1.5 w-1.5 rounded-full bg-[#06C755]"></span>
                LINE 已連動
              </span>
            </div>
            <p class="text-[11px] text-muted-foreground">預約資料將自動帶入您的個人資料</p>
          </div>
        </div>

        <button
          type="button"
          class="rounded px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          @click="liff.logout()"
        >
          切換帳號 / 登出
        </button>
      </div>

      <!-- 狀態 3: LINE App 內部開啟 (LIFF 環境，無需登入按鈕) -->
      <div
        v-else-if="liff.isReady.value && liff.isInClient.value && liff.profile.value"
        class="rise-in flex items-center justify-between rounded-sm border border-[#06C755]/20 bg-[#06C755]/5 px-4 py-2.5 text-xs backdrop-blur"
      >
        <div class="flex items-center gap-2.5">
          <img
            v-if="liff.profile.value.pictureUrl"
            :src="liff.profile.value.pictureUrl"
            :alt="liff.profile.value.displayName"
            class="h-7 w-7 rounded-full border border-[#06C755]/40 object-cover"
          />
          <span class="text-xs text-muted-foreground">
            您好，<strong class="text-foreground font-semibold">{{ liff.profile.value.displayName }}</strong>（預約完成將發送確認卡片至此聊天室）
          </span>
        </div>
        <span class="inline-flex items-center gap-1.5 rounded bg-[#06C755]/15 px-2 py-0.5 text-[10px] font-bold text-[#06C755]">
          <span class="h-1.5 w-1.5 rounded-full bg-[#06C755] animate-pulse"></span>
          LINE 連動中
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

  // 若在 LINE App 內 (LIFF 環境) 發送預約確認 Flex Message 至聊天室
  if (liff.isInClient.value && liff.isLoggedIn.value) {
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
