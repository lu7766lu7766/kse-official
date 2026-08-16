<template>
  <div
    v-if="show && appointment"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
  >
    <!-- 背景遮罩 -->
    <div
      class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      @click="handleClose"
    ></div>

    <!-- 彈窗內容 -->
    <div
      class="rise-in relative z-10 w-full max-w-lg overflow-hidden rounded-sm border border-primary/50 bg-card p-6 shadow-2xl shadow-primary/10 sm:p-8"
    >
      <!-- 頂部成功圖示 -->
      <div class="mb-4 flex flex-col items-center text-center">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary ring-8 ring-primary/10">
          <CheckCircle2 class="h-8 w-8" />
        </div>
        <span class="eyebrow mt-3">Booking Confirmed</span>
        <h2 class="mt-1 text-2xl font-extrabold text-foreground">
          預約成功！
        </h2>
        <p class="mt-1 text-xs text-muted-foreground">
          我們已收到您的預約，期待為您提供專業的運動放鬆與身體評估。
        </p>
      </div>

      <!-- 預約編號展示區（支援一鍵複製） -->
      <div class="mb-5 rounded-sm border border-primary/30 bg-primary/10 p-3.5 text-center">
        <div class="text-[11px] font-bold uppercase tracking-widest text-primary">
          您的預約編號
        </div>
        <div class="mt-1 flex items-center justify-center gap-2">
          <span class="font-mono text-lg font-black tracking-wider text-foreground">
            {{ appointment.booking_no }}
          </span>
          <button
            type="button"
            class="rounded-sm border border-primary/40 bg-card px-2 py-1 text-[11px] font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
            @click="copyBookingNo"
          >
            {{ copied ? "已複製！" : "複製" }}
          </button>
        </div>
      </div>

      <!-- 預約詳細資訊卡片 -->
      <div class="mb-6 space-y-2 rounded-sm border border-border/80 bg-background/50 p-4 text-xs">
        <div class="flex justify-between py-1 border-b border-border/40">
          <span class="text-muted-foreground">預約按摩師</span>
          <span class="font-bold text-foreground">{{ appointment.masseur_name }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-border/40">
          <span class="text-muted-foreground">預約時段</span>
          <span class="font-bold text-primary">{{ formatSlotTime(appointment.start_at, appointment.end_at) }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-border/40">
          <span class="text-muted-foreground">顧客姓名 / 手機</span>
          <span class="font-medium text-foreground">{{ appointment.customer_name }} ({{ appointment.customer_phone }})</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-muted-foreground">教室地點</span>
          <span class="font-medium text-foreground">台中市南屯區大墩七街202號</span>
        </div>
      </div>

      <!-- 注意事項提醒 -->
      <div class="mb-6 rounded-sm bg-muted/30 p-3 text-[11px] text-muted-foreground">
        <div class="font-bold text-foreground mb-1">貼心提醒：</div>
        <ul class="list-disc list-inside space-y-0.5">
          <li>請於預約時間前 5~10 分鐘抵達，以利進行完整評估。</li>
          <li>建議穿著寬鬆或富有彈性的運動服飾，以方便進行活動度評估。</li>
        </ul>
      </div>

      <!-- LINE 訊息提醒已發送通知 (低調精緻設計) -->
      <div
        v-if="lineMessageSent"
        class="mb-5 flex items-center gap-2.5 rounded-sm border border-border/70 bg-card/60 p-3 text-xs text-muted-foreground"
      >
        <svg class="h-4 w-4 shrink-0 fill-[#06C755] opacity-90" viewBox="0 0 24 24">
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
        </svg>
        <div class="leading-tight">
          <div class="font-medium text-foreground">LINE 預約通知已發送</div>
          <div class="text-[11px] text-muted-foreground/80 mt-0.5">預約確認卡片已傳送至您的 LINE 聊天室。</div>
        </div>
      </div>

      <!-- 加入 Google 行事曆按鈕 -->
      <div class="mb-5">
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-sm border border-primary/50 bg-primary/10 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer shadow-sm"
          @click="handleAddToCalendar"
        >
          <CalendarPlus class="h-4 w-4" />
          <span>加入 Google 行事曆</span>
        </button>
      </div>

      <!-- 操作按鈕 (若在 LINE 內優先提供返回聊天室) -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex-1 rounded-sm border border-border py-2.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
          @click="handleViewSearch"
        >
          查看預約記錄
        </button>

        <button
          v-if="liff.isInClient.value"
          type="button"
          class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#06C755] py-2.5 text-xs font-bold text-white transition-all hover:bg-[#05b34c] hover:scale-[1.02] cursor-pointer shadow-md shadow-[#06C755]/20"
          @click="handleReturnToLine"
        >
          <span>返回 LINE 聊天室</span>
        </button>

        <button
          v-else
          type="button"
          class="flex-1 rounded-sm bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/20"
          @click="handleClose"
        >
          完成關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CheckCircle2, CalendarPlus } from "lucide-vue-next"
import type { AppointmentRecord } from "~/composables/useBookingApi"
import { useLiff } from "~/composables/useLiff"
import { createGoogleCalendarUrl } from "~/utils/calendarHelper"

const props = withDefaults(
  defineProps<{
    show: boolean
    appointment: AppointmentRecord | null
    lineMessageSent?: boolean
  }>(),
  {
    lineMessageSent: false,
  }
)

const emit = defineEmits<{
  (e: "close"): void
  (e: "go-to-search", phone: string): void
}>()

const liff = useLiff()
const copied = ref(false)

function formatSlotTime(start: string, end: string): string {
  if (!start || !end) return ""
  return `${start.substring(0, 16)} ~ ${end.substring(11, 16)}`
}

async function copyBookingNo() {
  if (!props.appointment?.booking_no) return
  try {
    await navigator.clipboard.writeText(props.appointment.booking_no)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    console.error("複製失敗", err)
  }
}

function handleAddToCalendar() {
  if (!props.appointment) return
  const url = createGoogleCalendarUrl(props.appointment)
  window.open(url, "_blank", "noopener,noreferrer")
}

function handleReturnToLine() {
  if (liff.isInClient.value) {
    liff.closeWindow()
  } else {
    emit("close")
  }
}

function handleClose() {
  emit("close")
}

function handleViewSearch() {
  if (props.appointment?.customer_phone) {
    emit("go-to-search", props.appointment.customer_phone)
  }
  emit("close")
}
</script>
