<template>
  <div class="w-full max-w-4xl mx-auto">
    <!-- 1. 未登入 LINE 帳號 -->
    <div v-if="!isLoggedIn" class="surface-card rounded-sm border border-border p-8 sm:p-12 mb-8 text-center space-y-4">
      <div class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
        <Lock class="h-7 w-7" />
      </div>
      <h3 class="text-lg font-bold text-foreground">查詢預約請先登入 LINE 帳號</h3>
      <p class="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
        為了保護您的個人隱私與預約資料安全，請先完成 LINE 帳號登入以查詢名下預約。
      </p>
      <div class="pt-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-sm bg-[#06C755] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#06C755]/20 transition-all hover:bg-[#05b34c] hover:scale-[1.02] cursor-pointer"
          @click="liff.login()"
        >
          <svg class="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path
              d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99"
            />
          </svg>
          <span>點此登入 LINE 帳號</span>
        </button>
      </div>
    </div>

    <!-- 2. 已登入 LINE，正在查詢會員資料 -->
    <div v-else-if="loadingUser" class="surface-card rounded-sm border border-border p-12 mb-8 text-center text-muted-foreground">
      <Loader2 class="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
      <p class="text-xs font-medium">正在查詢會員預約資料...</p>
    </div>

    <!-- 3. 已登入 LINE 但查無 USER 會員資料 -->
    <div v-else-if="!fetchedUser" class="surface-card rounded-sm border border-border p-8 sm:p-12 mb-8 text-center space-y-4">
      <div class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted/40 text-muted-foreground mb-2">
        <UserX class="h-7 w-7" />
      </div>
      <h3 class="text-lg font-bold text-foreground">查無會員與預約資料</h3>
      <p class="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">您當前登入的 LINE 帳號尚未在系統中建立預約或綁定會員資料。</p>
      <div class="pt-3 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors cursor-pointer"
          @click="liff.switchAccount()"
        >
          更換其他 LINE 帳號
        </button>
      </div>
    </div>

    <!-- 4. 已登入 LINE 且查到 USER 資料 -> 顯示查詢表單 (電話唯讀) -->
    <template v-else>
      <!-- 查詢表單區塊 -->
      <div class="surface-card rounded-sm p-6 sm:p-8 mb-8">
        <div class="mb-6">
          <span class="eyebrow mb-1">Appointment Lookup & Cancel</span>
          <h2 class="text-xl font-extrabold text-foreground sm:text-2xl">預約查詢與取消</h2>
          <p class="mt-1 text-xs text-muted-foreground">已自動帶入您綁定的會員手機號碼，可即時查看名下預約紀錄或辦理取消。</p>
        </div>

        <form @submit.prevent="handleSearch" class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-12 items-start">
            <!-- 手機號碼 / 會員帳號（唯讀） -->
            <div class="sm:col-span-6">
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  會員帳號 / 綁定電話 <span class="text-primary">*</span>
                </label>
                <button
                  type="button"
                  class="text-[11px] text-muted-foreground underline hover:text-foreground transition-colors cursor-pointer"
                  title="切換其他 LINE 帳號"
                  @click="liff.switchAccount()"
                >
                  更換帳號
                </button>
              </div>

              <!-- 唯讀電話展示 -->
              <div
                class="h-10.5 rounded-sm border border-border/80 bg-muted/30 px-3.5 py-2 text-base sm:text-sm font-mono font-bold text-foreground flex items-center justify-between"
              >
                <span>{{ fetchedUser.username }}</span>
                <span class="text-[11px] font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm"
                  >已綁定帳號</span
                >
              </div>
              <p class="mt-1.5 text-[11px] text-amber-400/90 leading-normal flex items-start gap-1">
                <Info class="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>如果電話錯誤，請透過官方 LINE 帳號聯繫管理人員進行修改</span>
              </p>
            </div>

            <!-- 預約編號（選填） -->
            <div class="sm:col-span-4">
              <label for="search_booking_no" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                預約編號（選填）
              </label>
              <input
                id="search_booking_no"
                v-model="searchBookingNo"
                type="text"
                placeholder="例如：BK2026..."
                class="h-10.5 w-full rounded-sm border border-input bg-background/60 px-3.5 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>

            <!-- 查詢按鈕 -->
            <div class="sm:col-span-2">
              <div class="hidden sm:block text-xs font-bold text-transparent mb-1.5 select-none" aria-hidden="true">查詢</div>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex h-10.5 w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer shadow-md shadow-primary/20"
              >
                <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
                <Search v-else class="h-4 w-4" />
                <span>{{ loading ? "查詢中" : "查詢預約" }}</span>
              </button>
            </div>
          </div>
        </form>

        <!-- 錯誤訊息提示 -->
        <div
          v-if="errorMessage"
          class="mt-4 flex items-center gap-2 rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <AlertCircle class="h-4 w-4 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- 成功取消通知 -->
        <div
          v-if="successMessage"
          class="mt-4 flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/10 p-3 text-xs text-primary font-semibold"
        >
          <CheckCircle2 class="h-4 w-4 shrink-0" />
          <span>{{ successMessage }}</span>
        </div>
      </div>

      <!-- 查詢結果列表區 -->
      <div v-if="searched" class="space-y-4">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
            <span>查詢結果</span>
            <span class="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary font-mono"> 共 {{ appointments.length }} 筆 </span>
          </h3>
        </div>

        <!-- 無紀錄空狀態 -->
        <div v-if="appointments.length === 0" class="rounded-sm border border-dashed border-border/80 bg-card/40 p-12 text-center">
          <CalendarX class="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
          <h4 class="text-base font-bold text-foreground">目前尚無預約紀錄</h4>
          <p class="mt-1 text-xs text-muted-foreground">若您曾預約但查無紀錄，請確認預約時所填寫之手機號碼是否與當前 LINE 綁定帳號一致。</p>
        </div>

        <!-- 預約卡片清單 -->
        <div v-for="item in appointments" :key="item.id" class="surface-card rounded-sm border border-border p-5 transition-all sm:p-6">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-border/50 pb-4">
            <div>
              <div class="flex items-center gap-2.5">
                <span class="font-mono text-xs font-bold text-primary">
                  {{ item.booking_no }}
                </span>
                <span
                  :class="[
                    'rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                    isUpcoming(item.start_at) ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-muted text-muted-foreground',
                  ]"
                >
                  {{ isUpcoming(item.start_at) ? "即將進行" : "已完成 / 歷史預約" }}
                </span>
              </div>
              <h4 class="mt-1.5 text-lg font-black text-foreground">{{ item.masseur_name }} 按摩師</h4>
            </div>

            <!-- 操作按鈕區 -->
            <div v-if="isUpcoming(item.start_at)" class="flex items-center gap-2">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-sm border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer shadow-sm"
                @click="addToCalendar(item)"
              >
                <CalendarPlus class="h-3.5 w-3.5" />
                <span>加到行事曆</span>
              </button>
              <button
                type="button"
                class="rounded-sm border border-destructive/60 bg-destructive/10 px-3.5 py-1.5 text-xs font-bold text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                @click="openCancelConfirm(item)"
              >
                取消預約
              </button>
            </div>
          </div>

          <!-- 預約細節網格 -->
          <div class="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div>
              <span class="text-muted-foreground block text-[11px]">預約時段</span>
              <span class="font-bold text-foreground font-mono"> {{ item.start_at }} ~ {{ item.end_at ? item.end_at.substring(11, 16) : "" }} </span>
            </div>

            <div>
              <span class="text-muted-foreground block text-[11px]">預約人資訊</span>
              <span class="font-medium text-foreground"> {{ item.customer_name }} ({{ item.customer_phone }}) </span>
            </div>

            <div v-if="item.note" class="sm:col-span-2">
              <span class="text-muted-foreground block text-[11px]">備註需求</span>
              <p class="mt-0.5 text-xs text-foreground bg-muted/20 rounded-sm p-2">
                {{ item.note }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 取消預約二次確認對話框 -->
      <div
        v-if="showCancelModal && targetAppointment"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" @click="showCancelModal = false"></div>

        <div class="rise-in relative z-10 w-full max-w-md overflow-hidden rounded-sm border border-destructive/50 bg-card p-6 shadow-2xl">
          <div class="mb-4 flex items-center gap-3 text-destructive">
            <AlertTriangle class="h-6 w-6 shrink-0" />
            <h3 class="text-lg font-bold text-foreground">確認取消預約？</h3>
          </div>

          <p class="text-xs text-muted-foreground leading-relaxed">
            您即將取消預約編號 <strong class="text-primary font-mono">{{ targetAppointment.booking_no }}</strong> （{{
              targetAppointment.masseur_name
            }}
            - {{ targetAppointment.start_at }}）。 <br /><br />
            取消後該時段將重新釋出給其他顧客。
          </p>

          <div class="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              :disabled="cancelling"
              class="rounded-sm border border-border px-4 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              @click="showCancelModal = false"
            >
              保留預約
            </button>
            <button
              type="button"
              :disabled="cancelling"
              class="inline-flex items-center justify-center gap-1.5 rounded-sm bg-destructive px-5 py-2 text-xs font-bold text-destructive-foreground transition-all hover:bg-destructive/90 disabled:opacity-50 cursor-pointer"
              @click="confirmCancel"
            >
              <Loader2 v-if="cancelling" class="h-3.5 w-3.5 animate-spin" />
              <span>{{ cancelling ? "正在取消..." : "確認取消預約" }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { Search, Loader2, AlertCircle, CheckCircle2, CalendarX, CalendarPlus, AlertTriangle, Lock, UserX, Info } from "lucide-vue-next"
import { useBookingApi, type AppointmentRecord } from "~/composables/useBookingApi"
import { useLiff } from "~/composables/useLiff"
import { createGoogleCalendarUrl } from "~/utils/calendarHelper"

const props = defineProps<{
  initialPhone?: string
}>()

const api = useBookingApi()
const liff = useLiff()

const isLoggedIn = computed(() => liff.isLoggedIn.value || liff.isInClient.value)
const fetchedUser = computed(() => liff.dbUser.value)
const loadingUser = computed(() => liff.isFetchingDbUser.value || liff.isInitializing.value)

const searchBookingNo = ref("")
const loading = ref(false)
const searched = ref(false)
const errorMessage = ref("")
const successMessage = ref("")
const appointments = ref<AppointmentRecord[]>([])

// 取消確認彈窗狀態
const showCancelModal = ref(false)
const targetAppointment = ref<AppointmentRecord | null>(null)
const cancelling = ref(false)

function isUpcoming(startAtStr: string): boolean {
  if (!startAtStr) return false
  const now = new Date().getTime()
  const start = new Date(startAtStr.replace(" ", "T")).getTime()
  return start > now
}

async function handleSearch() {
  const phone = fetchedUser.value?.username || ""
  const phoneClean = phone.trim().replace(/\D/g, "")
  if (phoneClean.length !== 10) {
    errorMessage.value = "查無有效之會員手機號碼"
    return
  }

  loading.value = true
  errorMessage.value = ""
  successMessage.value = ""

  try {
    const list = await api.searchAppointments({
      customer_phone: phoneClean,
      booking_no: searchBookingNo.value.trim() || undefined,
    })
    appointments.value = list
    searched.value = true
  } catch (err: any) {
    errorMessage.value = err.message || "查詢失敗，請重試"
  } finally {
    loading.value = false
  }
}

function openCancelConfirm(appointment: AppointmentRecord) {
  targetAppointment.value = appointment
  showCancelModal.value = true
}

async function confirmCancel() {
  if (!targetAppointment.value) return

  cancelling.value = true
  errorMessage.value = ""

  try {
    await api.cancelAppointment({
      booking_no: targetAppointment.value.booking_no,
      customer_phone: targetAppointment.value.customer_phone,
    })

    successMessage.value = `預約編號 [${targetAppointment.value.booking_no}] 已成功取消！`
    showCancelModal.value = false
    targetAppointment.value = null

    // 重新載入預約清單
    await handleSearch()
  } catch (err: any) {
    errorMessage.value = err.message || "取消失敗，請稍後重試"
  } finally {
    cancelling.value = false
  }
}

// 加入 Google 行事曆
function addToCalendar(appointment: AppointmentRecord) {
  const url = createGoogleCalendarUrl(appointment)
  window.open(url, "_blank", "noopener,noreferrer")
}

// 支援外部觸發查詢
function setPhoneAndSearch(_phone?: string) {
  if (fetchedUser.value?.username) {
    handleSearch()
  }
}

// 監聽全域 dbUser 變動同步自動查詢
watch(
  () => liff.dbUser.value,
  (newUser) => {
    if (newUser?.username) {
      handleSearch()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (liff.dbUser.value?.username) {
    handleSearch()
  }
})

defineExpose({
  setPhoneAndSearch,
})
</script>
