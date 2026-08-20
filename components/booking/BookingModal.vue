<template>
  <div
    v-if="show && slot"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
  >
    <!-- 背景遮罩 -->
    <div
      class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      @click="handleClose"
    ></div>

    <!-- 彈窗本體 -->
    <div
      class="rise-in relative z-10 w-full max-w-lg overflow-hidden rounded-sm border border-border bg-card p-6 shadow-2xl sm:p-8"
    >
      <!-- 關閉按鈕 -->
      <button
        type="button"
        class="absolute right-4 top-4 rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        aria-label="關閉"
        @click="handleClose"
      >
        <X class="h-5 w-5" />
      </button>

      <!-- 標題與時段摘要 -->
      <div class="mb-6 border-b border-border/70 pb-4">
        <span class="eyebrow mb-1">Appointment Confirmation</span>
        <h2 class="text-xl font-extrabold text-foreground sm:text-2xl">
          預約資料填寫
        </h2>

        <div class="mt-3 rounded-sm border border-primary/30 bg-primary/5 p-3.5 text-sm">
          <div class="flex items-center gap-2 text-primary font-bold">
            <Calendar class="h-4 w-4 shrink-0" />
            <span>{{ slot.date }} ({{ slot.label }})</span>
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>服務按摩師：<strong class="text-foreground">{{ slot.masseur_name }}</strong></span>
            <span class="mx-1">•</span>
            <span>服務時間：1 小時</span>
            <span class="mx-1">•</span>
            <span class="text-primary font-medium">需至少提前半小時以上</span>
          </div>
        </div>
      </div>

      <!-- 1. 未登入 LINE 帳號 (隱藏預約表單) -->
      <div v-if="!isLoggedIn" class="py-8 text-center space-y-4">
        <div class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
          <Lock class="h-7 w-7" />
        </div>
        <h3 class="text-lg font-bold text-foreground">預約前請先登入 LINE 帳號</h3>
        <p class="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          為了提供即時預約確認推播與到訪提醒服務，請先完成 LINE 帳號登入身分驗證。
        </p>
        <div class="pt-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-sm bg-[#06C755] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#06C755]/20 transition-all hover:bg-[#05b34c] hover:scale-[1.02] cursor-pointer"
            @click="liff.login()"
          >
            <svg class="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
            </svg>
            <span>點此登入 LINE 帳號</span>
          </button>
        </div>
      </div>

      <!-- 2. 已登入 LINE 載入會員資料中 -->
      <div v-else-if="loadingUser" class="py-12 text-center text-muted-foreground">
        <Loader2 class="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
        <p class="text-xs font-medium">正在查詢會員綁定資料...</p>
      </div>

      <!-- 3. 已登入 LINE 且載入完畢，顯示預約表單 -->
      <template v-else>
        <!-- 錯誤提示訊息 -->
        <div
          v-if="errorMessage"
          class="mb-4 flex items-start gap-2 rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
          <span>{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 顧客姓名 -->
          <div>
            <div class="flex items-center justify-between">
              <label for="customer_name" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                您的姓名 <span class="text-primary">*</span>
                <span v-if="liff.profile.value" class="ml-1 text-[11px] font-normal text-muted-foreground/70">
                  （LINE 已帶入）
                </span>
              </label>
            </div>
            <input
              id="customer_name"
              v-model="form.customer_name"
              type="text"
              required
              placeholder="請輸入姓名（例如：陳小明）"
              class="mt-1.5 w-full rounded-sm border border-input bg-background/60 px-3.5 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <!-- 手機號碼 / 會員帳號 -->
          <div>
            <!-- Case 1: 已有 USER 資料 -> 顯示 username，不提供輸入電話 -->
            <template v-if="fetchedUser">
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                會員帳號 / 綁定電話
              </label>
              <div class="rounded-sm border border-border/80 bg-muted/30 px-3.5 py-2.5 text-base sm:text-sm font-mono font-bold text-foreground flex items-center justify-between">
                <span>{{ fetchedUser.username }}</span>
                <span class="text-xs font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm">已綁定帳號</span>
              </div>
              <p class="mt-1.5 text-[11px] text-amber-400/90 leading-normal flex items-start gap-1">
                <Info class="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>如果電話錯誤，請透過官方 LINE 帳號聯繫管理人員進行修改</span>
              </p>
            </template>

            <!-- Case 2: 為空 -> 出現電話輸入欄位供填寫 (與現在相同) -->
            <template v-else>
              <label for="customer_phone" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                手機號碼 <span class="text-primary">*</span>
                <span class="text-[11px] font-normal text-muted-foreground/70">（查詢與預約綁定使用）</span>
              </label>
              <input
                id="customer_phone"
                v-model="form.customer_phone"
                type="tel"
                required
                maxlength="10"
                placeholder="0912345678 (10 碼數字)"
                class="mt-1.5 w-full rounded-sm border border-input bg-background/60 px-3.5 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
              <p class="mt-1.5 text-[11px] text-muted-foreground/90 leading-normal flex items-start gap-1">
                <Info class="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                <span>電話經過綁定就不可自行修改，請如實填寫。</span>
              </p>
            </template>
          </div>

          <!-- 需求備註 -->
          <div>
            <label for="note" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              備註需求（選填）
            </label>
            <textarea
              id="note"
              v-model="form.note"
              rows="2"
              placeholder="例如：肩頸容易緊繃、腰部曾受傷、希望能加強下肢放鬆..."
              class="mt-1.5 w-full rounded-sm border border-input bg-background/60 px-3.5 py-2 text-base sm:text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            ></textarea>
          </div>

          <!-- 按鈕操作列 -->
          <div class="mt-6 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="rounded-sm border border-border px-5 py-2.5 text-xs font-bold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground cursor-pointer"
              @click="handleClose"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/20"
            >
              <Loader2 v-if="submitting" class="h-4 w-4 animate-spin" />
              <span>{{ submitting ? "預約處理中..." : "確認送出預約" }}</span>
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { X, Calendar, AlertCircle, Loader2, Lock, Info } from "lucide-vue-next"
import type { HourlySlot } from "~/utils/timeSlotHelper"
import { useBookingApi, type AppointmentRecord, type UserRecord } from "~/composables/useBookingApi"
import { useLiff } from "~/composables/useLiff"

const props = defineProps<{
  show: boolean
  slot: HourlySlot | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "success", appointment: AppointmentRecord): void
}>()

const api = useBookingApi()
const liff = useLiff()

const submitting = ref(false)
const errorMessage = ref("")
const loadingUser = ref(false)
const fetchedUser = ref<UserRecord | null>(null)

const isLoggedIn = computed(() => liff.isLoggedIn.value || liff.isInClient.value)

const form = reactive({
  customer_name: "",
  customer_phone: "",
  note: "",
})

// 重設表單
function resetForm() {
  form.customer_name = ""
  form.customer_phone = ""
  form.note = ""
  errorMessage.value = ""
  fetchedUser.value = null
  loadingUser.value = false
}

// 根據 LINE Profile 及本地快取自動帶入預設姓名與快取電話
function populateLineData() {
  if (liff.profile.value?.displayName && !form.customer_name) {
    form.customer_name = liff.profile.value.displayName
  }
  const savedPhone = liff.getSavedPhone()
  if (savedPhone && !form.customer_phone) {
    form.customer_phone = savedPhone
  }
}

// 查詢 LINE User 綁定資料
async function checkUserStatus() {
  const lineUserId = liff.profile.value?.userId
  if (!lineUserId) {
    fetchedUser.value = null
    populateLineData()
    return
  }

  loadingUser.value = true
  try {
    const user = await api.getUserByLine(lineUserId)
    fetchedUser.value = user
    if (user) {
      form.customer_phone = user.username
      if (user.name && !form.customer_name) {
        form.customer_name = user.name
      }
    } else {
      populateLineData()
    }
  } catch (e) {
    console.warn("checkUserStatus Error:", e)
    populateLineData()
  } finally {
    loadingUser.value = false
  }
}

watch(
  () => props.show,
  async (val) => {
    if (val) {
      errorMessage.value = ""
      if (isLoggedIn.value) {
        await checkUserStatus()
      }
    } else {
      resetForm()
    }
  }
)

function handleClose() {
  if (submitting.value) return
  emit("close")
}

async function handleSubmit() {
  if (!props.slot) return

  // 前端基本驗證
  if (!form.customer_name.trim()) {
    errorMessage.value = "請輸入預約者姓名"
    return
  }

  const phoneClean = form.customer_phone.trim().replace(/\D/g, "")
  if (phoneClean.length !== 10) {
    errorMessage.value = "手機號碼格式錯誤，請輸入 10 碼數字（如 0912345678）"
    return
  }

  submitting.value = true
  errorMessage.value = ""

  try {
    const result = await api.submitBooking({
      masseur_id: props.slot.masseur_id,
      start_at: props.slot.start_at,
      customer_name: form.customer_name.trim(),
      customer_phone: phoneClean,
      note: form.note.trim() || undefined,
      line_user_id: liff.profile.value?.userId || undefined,
    })

    liff.savePhone(phoneClean)
    emit("success", result)
    emit("close")
  } catch (err: any) {
    errorMessage.value = err.message || "預約失敗，該時段可能剛剛已被其他客人預約"
  } finally {
    submitting.value = false
  }
}
</script>
