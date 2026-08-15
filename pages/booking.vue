<template>
  <div>
    <!-- 頂部 Hero 區塊 -->
    <PageHero eyebrow="Online Booking" title="線上預約放鬆" desc="採預約制。歡迎點選合適的師傅與時段，體驗美式筋膜放鬆、運動按摩與動作評估服務。" />

    <Section tone="ink">
      <!-- 雙分頁切換 Tabs -->
      <div class="mb-10 flex justify-center">
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
        <!-- 預約流程指引卡片 -->
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="surface-card rounded-sm p-4 text-xs border border-border/70">
            <span class="eyebrow text-[10px] mb-1">Step 01</span>
            <h4 class="text-sm font-bold text-foreground">選擇師傅與時段</h4>
            <p class="mt-1 text-muted-foreground">瀏覽週曆各整點時段，點選符合您行程的 1 小時服務區間。</p>
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
          <BookingCalendar ref="calendarRef" @select-slot="handleSelectSlot" />
        </div>
      </div>

      <!-- Tab 2: 預約查詢與取消 -->
      <div v-show="activeTab === 'search'">
        <BookingSearch ref="searchRef" :initial-phone="searchInitialPhone" />
      </div>

      <!-- 常見問答與到訪提醒 -->
      <div class="mt-16 border-t border-border/70 pt-10">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="surface-card rounded-sm p-6 border border-border/70">
            <h3 class="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <Clock class="h-4 w-4 text-primary" />
              服務須知與收費
            </h3>
            <p class="text-xs text-muted-foreground leading-relaxed">每次預約服務時間為 1 小時（含身體動作評估、徒手放鬆與動作優化建議）。</p>
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
    </Section>

    <!-- 填寫資料對話框 Modal -->
    <BookingModal :show="showModal" :slot="selectedSlot" @close="showModal = false" @success="handleBookingSuccess" />

    <!-- 預約成功確認卡片 Modal -->
    <BookingSuccessModal
      :show="showSuccessModal"
      :appointment="createdAppointment"
      @close="showSuccessModal = false"
      @go-to-search="handleGoToSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CalendarCheck, Search, Clock, MapPin } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import BookingCalendar from "~/components/booking/BookingCalendar.vue"
import BookingModal from "~/components/booking/BookingModal.vue"
import BookingSuccessModal from "~/components/booking/BookingSuccessModal.vue"
import BookingSearch from "~/components/booking/BookingSearch.vue"
import type { HourlySlot } from "~/utils/timeSlotHelper"
import type { AppointmentRecord } from "~/composables/useBookingApi"
import { BRAND } from "~/utils/site-data"

const activeTab = ref<"calendar" | "search">("calendar")

// 選擇時段與預約表單狀態
const selectedSlot = ref<HourlySlot | null>(null)
const showModal = ref(false)

// 預約成功卡片狀態
const createdAppointment = ref<AppointmentRecord | null>(null)
const showSuccessModal = ref(false)

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
function handleBookingSuccess(appointment: AppointmentRecord) {
  createdAppointment.value = appointment
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

const SEO_TITLE = "線上預約｜KSE 美式筋膜放鬆教室｜台中運動按摩與動作評估"
const SEO_DESC = "KSE 官方線上預約系統：提供專業運動按摩、美式徒手筋膜放鬆、動作評估預約。支援週曆時段點選、線上預約查詢與取消。"

useHead({
  title: SEO_TITLE,
  meta: [
    { name: "description", content: SEO_DESC },
    {
      name: "keywords",
      content: "台中運動按摩預約,筋膜放鬆預約,KSE預約,南屯按摩預約,運動傷害恢復,動作訓練預約,美式筋膜放鬆",
    },
    { property: "og:title", content: SEO_TITLE },
    { property: "og:description", content: SEO_DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.kse-release.com.tw/booking" },
  ],
  link: [{ rel: "canonical", href: "https://www.kse-release.com.tw/booking" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        name: BRAND.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.address,
          addressLocality: "台中市",
          addressCountry: "TW",
        },
        telephone: BRAND.phone,
        url: "https://www.kse-release.com.tw/booking",
        openingHours: "Mo-Su 09:00-21:00",
      }),
    },
  ],
})
</script>
