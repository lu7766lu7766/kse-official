<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
    <!-- 頂部簡單導覽列 -->
    <header class="border-b border-border/60 bg-card/40 backdrop-blur px-4 py-3.5 sm:px-8">
      <div class="mx-auto flex max-w-lg items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 text-foreground font-black tracking-wider text-base">
          <span class="text-primary font-black text-lg">KSE</span>
          <span class="text-xs text-muted-foreground font-medium hidden sm:inline">美式筋膜放鬆教室</span>
        </NuxtLink>
        <span class="text-[11px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 border border-primary/20 rounded-sm px-2 py-0.5">
          LINE 帳號綁定
        </span>
      </div>
    </header>

    <!-- 主體內容區 -->
    <main class="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div class="rise-in surface-card w-full max-w-md rounded-sm border border-border p-6 sm:p-8 relative overflow-hidden">
        <!-- 成功覆蓋畫面 (綁定成功後倒數關閉) -->
        <div
          v-if="isSuccess"
          class="flex flex-col items-center justify-center py-6 text-center"
        >
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10 mb-4 animate-bounce">
            <CheckCircle2 class="h-10 w-10" />
          </div>

          <span class="eyebrow mb-1 text-emerald-400">Success</span>
          <h2 class="text-2xl font-black text-foreground">
            LINE 帳號綁定成功！
          </h2>

          <p class="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs">
            您的 LINE 帳號已成功與會員完成綁定，未來將自動透過 LINE 接收預約確認與通知。
          </p>

          <!-- 綁定資訊明細卡 -->
          <div class="mt-4 w-full rounded-sm border border-border/70 bg-background/60 p-3 text-left text-xs space-y-1.5 backdrop-blur">
            <div class="flex items-center justify-between text-muted-foreground">
              <span>綁定會員帳號</span>
              <strong class="font-mono text-foreground font-bold">{{ boundUsername }}</strong>
            </div>
            <div class="flex flex-col text-muted-foreground pt-1 border-t border-border/40">
              <span class="text-[10px] uppercase font-bold text-primary">LINE User ID</span>
              <span class="font-mono text-[11px] text-foreground select-all break-all mt-0.5">{{ liff.profile.value?.userId }}</span>
            </div>
          </div>

          <div class="mt-5 w-full rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300 font-medium">
            視窗將於 <strong class="text-base font-black text-emerald-400 font-mono">{{ countdown }}</strong> 秒後自動關閉...
          </div>

          <div class="mt-6 flex w-full gap-2">
            <button
              type="button"
              class="w-full rounded-sm bg-[#06C755] py-2.5 text-xs font-bold text-white transition-all hover:bg-[#05b34c] cursor-pointer"
              @click="handleCloseWindow"
            >
              立即返回 LINE 聊天室
            </button>
          </div>
        </div>

        <!-- 綁定表單本體 -->
        <div v-else>
          <!-- 標題區 -->
          <div class="mb-6 border-b border-border/60 pb-4">
            <span class="eyebrow mb-1">Account Binding</span>
            <h1 class="text-xl font-extrabold text-foreground sm:text-2xl">
              綁定 LINE 官方帳號
            </h1>
            <p class="mt-1 text-xs text-muted-foreground">
              連結您的會員帳號，即時享有預約通知與排程提醒服務。
            </p>
          </div>

          <!-- LINE 使用者資訊卡片 -->
          <div class="mb-5 rounded-sm border border-border/70 bg-background/60 p-3.5 backdrop-blur">
            <div class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
              <span>LINE 授權身分</span>
              <span v-if="liff.isLoggedIn.value || liff.isInClient.value" class="text-emerald-400 flex items-center gap-1 font-semibold text-[10px]">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                已連動
              </span>
            </div>

            <!-- 已取得 LINE Profile -->
            <div v-if="liff.profile.value" class="space-y-3">
              <div class="flex items-center gap-3">
                <img
                  v-if="liff.profile.value.pictureUrl"
                  :src="liff.profile.value.pictureUrl"
                  :alt="liff.profile.value.displayName"
                  class="h-11 w-11 shrink-0 rounded-full border-2 border-primary/50 object-cover"
                />
                <div
                  v-else
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-base"
                >
                  {{ liff.profile.value.displayName.charAt(0) }}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="font-extrabold text-sm text-foreground truncate">
                    {{ liff.profile.value.displayName }}
                  </div>
                  <div class="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span>LINE 授權已就緒</span>
                  </div>
                </div>
              </div>

              <!-- 清楚顯示完整 LINE User ID -->
              <div class="rounded-sm border border-primary/30 bg-primary/10 px-3 py-2 text-xs">
                <div class="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center justify-between">
                  <span>LINE User ID</span>
                  <span class="text-[10px] font-normal text-muted-foreground">已讀取</span>
                </div>
                <div class="mt-1 font-mono text-xs font-semibold text-foreground select-all break-all bg-background/60 rounded px-2.5 py-1.5 border border-border/50">
                  {{ liff.profile.value.userId }}
                </div>
              </div>
            </div>

            <!-- 載入中 -->
            <div v-else-if="liff.isInitializing.value" class="flex items-center gap-2 py-2 text-xs text-muted-foreground">
              <Loader2 class="h-4 w-4 animate-spin text-primary" />
              <span>正在讀取 LINE 授權資訊...</span>
            </div>

            <!-- 未登入 (外部瀏覽器開啟) -->
            <div v-else class="flex flex-col gap-2 py-1">
              <p class="text-xs text-muted-foreground">
                尚未登入 LINE，請點擊下方按鈕進行授權：
              </p>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-sm bg-[#06C755] px-4 py-2 text-xs font-bold text-white hover:bg-[#05b34c] transition-colors cursor-pointer"
                @click="liff.login()"
              >
                <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.019 9.608.391.084.922.258 1.057.592.121.303.079.777.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.645 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.589-3.844 2.589-5.99" />
                </svg>
                <span>使用 LINE 帳號登入授權</span>
              </button>
            </div>
          </div>

          <!-- 錯誤訊息提示 -->
          <div
            v-if="errorMessage"
            class="mb-4 flex items-start gap-2 rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive"
          >
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- 綁定表單 -->
          <form @submit.prevent="handleBind" class="space-y-4">
            <div>
              <label for="username" class="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                會員帳號 / 手機號碼 <span class="text-primary">*</span>
              </label>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                placeholder="請輸入您的手機號碼（例如：0912345678）"
                class="mt-1.5 w-full rounded-sm border border-input bg-background/60 px-3.5 py-2.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>

            <button
              type="submit"
              :disabled="submitting || !canSubmit"
              class="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-bold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/20"
            >
              <Loader2 v-if="submitting" class="h-4 w-4 animate-spin" />
              <span>{{ submitting ? "綁定處理中..." : "確認綁定 LINE 帳號" }}</span>
            </button>
          </form>
        </div>
      </div>
    </main>

    <!-- 底部版權 -->
    <footer class="border-t border-border/50 py-4 text-center text-xs text-muted-foreground/60">
      © {{ new Date().getFullYear() }} KSE 美式筋膜放鬆教室. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-vue-next"
import { useLiff } from "~/composables/useLiff"
import { useBookingApi } from "~/composables/useBookingApi"

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: "LINE 帳號綁定 | KSE 美式筋膜放鬆教室",
  description: "綁定您的 KSE 會員帳號與 LINE 官方帳號，即時接收最新預約排程與服務通知。",
  robots: "noindex, nofollow",
})

const config = useRuntimeConfig()
const bindLiffId = (config.public.bindLiffId as string) || "2011127433-o3my6dZx"
const liff = useLiff()
const api = useBookingApi()

const username = ref("")
const submitting = ref(false)
const errorMessage = ref("")
const isSuccess = ref(false)
const boundUsername = ref("")
const countdown = ref(3)
let timer: any = null

const canSubmit = computed(() => {
  return username.value.trim().length > 0 && !!liff.profile.value?.userId
})

async function handleBind() {
  errorMessage.value = ""

  if (!username.value.trim()) {
    errorMessage.value = "請輸入會員帳號或手機號碼"
    return
  }

  const lineUserId = liff.profile.value?.userId
  if (!lineUserId) {
    errorMessage.value = "尚未取得 LINE 授權資訊，請先登入 LINE"
    return
  }

  submitting.value = true

  try {
    const result = await api.bindLine({
      username: username.value.trim(),
      line_user_id: lineUserId,
    })

    boundUsername.value = result.username
    isSuccess.value = true

    // 儲存手機號碼至快取
    liff.savePhone(result.username)

    // 啟動 3 秒倒數計時並關閉視窗
    startCountdown()
  } catch (err: any) {
    errorMessage.value = err.message || "綁定失敗，請確認帳號是否正確"
  } finally {
    submitting.value = false
  }
}

function startCountdown() {
  countdown.value = 3
  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      handleCloseWindow()
    }
  }, 1000)
}

function handleCloseWindow() {
  if (liff.isInClient.value) {
    liff.closeWindow()
  } else if (typeof window !== "undefined") {
    // 外部瀏覽器嘗試關閉或導航回首頁
    try {
      window.close()
    } catch (e) {
      // 瀏覽器不允許直接 window.close()
    }
    navigateTo("/")
  }
}

onMounted(() => {
  liff.init(bindLiffId)
  // 若有快取手機號碼，自動帶入
  const saved = liff.getSavedPhone()
  if (saved && !username.value) {
    username.value = saved
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
