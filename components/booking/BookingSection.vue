<template>
  <Section tone="ink">
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
      <!-- 預約流程指引卡片 (5 步驟) -->
      <div v-if="!shouldHideSteps" class="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        <!-- Step 01: 加入官方 LINE 帳號 -->
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70 flex flex-col justify-between">
          <div>
            <span class="eyebrow text-[10px] mb-1">Step 01</span>
            <h4 class="text-sm font-bold text-foreground">加入官方 LINE 帳號</h4>
            <p class="mt-1 text-muted-foreground">若要接收預約通知與排程提醒，請先加入官方 LINE 帳號。</p>
          </div>
          <div class="mt-3 pt-2 border-t border-border/40">
            <a
              :href="BRAND.line"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-sm border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-secondary hover:border-primary/50 transition-colors"
            >
              <svg class="h-2.5 w-2.5 fill-[#06C755]" viewBox="0 0 24 24">
                <path
                  d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99"
                />
              </svg>
              <span>加官方好友</span>
              <span class="text-[10px] text-muted-foreground">↗</span>
            </a>
          </div>
        </div>

        <!-- Step 02: 登入 LINE 帳號 -->
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70 flex flex-col justify-between">
          <div>
            <span class="eyebrow text-[10px] mb-1">Step 02</span>
            <h4 class="text-sm font-bold text-foreground">登入 LINE 帳號</h4>
            <p class="mt-1 text-muted-foreground">點擊登入 LINE 帳號進行身分認證以解鎖預約表單。</p>
          </div>
          <div class="mt-3 pt-2 border-t border-border/40">
            <button
              v-if="liff.isReady.value && !liff.isInClient.value && !liff.isLoggedIn.value"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-sm border border-border/70 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-secondary hover:border-primary/50 transition-colors cursor-pointer"
              @click="liff.login()"
            >
              <svg class="h-2.5 w-2.5 fill-[#06C755]" viewBox="0 0 24 24">
                <path
                  d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99"
                />
              </svg>
              <span>登入 LINE 帳號</span>
              <span class="text-[10px] text-muted-foreground">↗</span>
            </button>

            <div v-else-if="liff.profile.value" class="flex flex-wrap items-center justify-between gap-1.5 pt-1">
              <span class="text-[11px] text-emerald-400 font-medium truncate"> ✓ 已登入: {{ liff.profile.value.displayName }} </span>
              <button
                type="button"
                class="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0 ml-1"
                title="切換其他 LINE 帳號"
                @click="liff.switchAccount()"
              >
                更換帳號
              </button>
            </div>
            <span v-else class="text-[11px] text-muted-foreground/70 inline-block pt-1"> 載入中... </span>
          </div>
        </div>

        <!-- Step 03: 選擇按摩師與時段 -->
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70 flex flex-col justify-between">
          <div>
            <span class="eyebrow text-[10px] mb-1">Step 03</span>
            <h4 class="text-sm font-bold text-foreground">選擇按摩師與時段</h4>
            <p class="mt-1 text-muted-foreground">瀏覽週曆各時段，點選合適的 1 小時服務區間（需提前半小時以上）。</p>
          </div>
        </div>

        <!-- Step 04: 填寫預約者資料 -->
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70 flex flex-col justify-between">
          <div>
            <span class="eyebrow text-[10px] mb-1">Step 04</span>
            <h4 class="text-sm font-bold text-foreground">填寫預約者資料</h4>
            <p class="mt-1 text-muted-foreground">填寫姓名與手機號碼，方便後續查詢與確認預約。</p>
          </div>
        </div>

        <!-- Step 05: 完成預約與到訪 -->
        <div class="surface-card rounded-sm p-4 text-xs border border-border/70 flex flex-col justify-between">
          <div>
            <span class="eyebrow text-[10px] mb-1">Step 05</span>
            <h4 class="text-sm font-bold text-foreground">完成預約與到訪</h4>
            <p class="mt-1 text-muted-foreground">取得專屬預約編號，請於預約時間前 5~10 分鐘抵達教室。</p>
          </div>
        </div>
      </div>

      <!-- 週行事曆組件 -->
      <div class="surface-card rounded-sm p-5 sm:p-8">
        <BookingCalendar ref="calendarRef" :only-available="shouldOnlyAvailable" @select-slot="handleSelectSlot" />
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

  // 若使用者有 LINE 身分，後端已自動發送推播通知
  if (liff.isLoggedIn.value || liff.isInClient.value) {
    lineMessageSent.value = true
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
  const config = useRuntimeConfig()
  // 初始化 LINE LIFF SDK
  liff.init(config.public.liffId)

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
