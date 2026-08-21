<template>
  <div class="w-full">
    <!-- 按摩師切換 Tabs -->
    <div class="mb-5 flex flex-wrap items-center gap-2 border-b border-border/70 pb-4">
      <span class="mr-1 text-xs font-bold uppercase tracking-widest text-muted-foreground"> 選擇按摩師： </span>
      <button
        type="button"
        :class="[
          'rounded-sm px-4 py-2 text-sm font-bold transition-all duration-200 cursor-pointer',
          selectedMasseurId === null
            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
            : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground',
        ]"
        @click="selectMasseur(null)"
      >
        全部按摩師（不指定）
      </button>
      <button
        v-for="m in masseurs"
        :key="m.id"
        type="button"
        :class="[
          'rounded-sm px-4 py-2 text-sm font-bold transition-all duration-200 cursor-pointer',
          selectedMasseurId === m.id
            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
            : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground',
        ]"
        @click="selectMasseur(m.id)"
      >
        {{ m.name }}
      </button>
    </div>

    <!-- 週次切換與當前範圍提示列 -->
    <div class="mb-6 flex flex-col gap-3 rounded-sm border border-border/80 bg-card/40 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
      <!-- 當前週範圍與圖例提示 -->
      <div class="flex flex-wrap items-center justify-between gap-3 sm:justify-start">
        <div class="flex items-center gap-2">
          <CalendarIcon class="h-4 w-4 text-primary shrink-0" />
          <span class="text-xs font-bold text-foreground sm:text-sm">
            {{ weekInfo.rangeLabel }}
          </span>
        </div>
        <div class="flex items-center gap-2.5 text-xs text-muted-foreground">
          <span class="flex items-center gap-1"> <span class="h-2.5 w-2.5 rounded-full bg-primary"></span> 可預約 </span>
          <span class="hidden md:flex items-center gap-1"> <span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30"></span> 已過期 </span>
        </div>
      </div>

      <!-- 週次切換控制器（手機版獨立成行，寬度自適應） -->
      <div class="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        <button
          type="button"
          :disabled="isCurrentWeek"
          :class="[
            'inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-sm border px-3 text-xs font-semibold transition-all sm:flex-initial',
            isCurrentWeek
              ? 'border-border/40 text-muted-foreground/40 cursor-not-allowed'
              : 'border-border bg-card/80 text-foreground hover:border-primary hover:text-primary cursor-pointer',
          ]"
          title="上一週"
          @click="changeWeek(-1)"
        >
          <ChevronLeft class="h-4 w-4" />
          <span>上一週</span>
        </button>

        <button
          v-if="!isCurrentWeek"
          type="button"
          class="inline-flex h-9 flex-1 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 px-3 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer sm:flex-initial"
          @click="resetToCurrentWeek"
        >
          回到本週
        </button>

        <button
          type="button"
          class="inline-flex h-9 flex-1 items-center justify-center gap-1 rounded-sm border border-border bg-card/80 px-3 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary cursor-pointer sm:flex-initial"
          title="下一週"
          @click="changeWeek(1)"
        >
          <span>下一週</span>
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- 載入中骨架畫面 -->
    <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      <div v-for="i in 7" :key="i" class="animate-pulse rounded-sm border border-border/60 bg-card/40 p-4">
        <div class="mb-3 h-5 w-16 rounded bg-muted/60"></div>
        <div class="space-y-2">
          <div class="h-10 rounded bg-muted/40"></div>
          <div class="h-10 rounded bg-muted/40"></div>
          <div class="h-10 rounded bg-muted/40"></div>
        </div>
      </div>
    </div>

    <!-- 行事曆網格視圖（電腦版全部顯示 7 天，手機版自動隱藏無可用時段的日期） -->
    <template v-else>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-7">
        <div
          v-for="day in weekInfo.weekDays"
          :key="day.dateString"
          :class="[
            'flex flex-col rounded-sm border p-3.5 transition-all duration-300',
            day.isToday
              ? 'border-primary/70 bg-linear-to-b from-primary/10 via-card/80 to-card shadow-lg shadow-primary/5'
              : 'border-border/70 bg-card/40 hover:border-border',
            !hasAvailableSlotsForDay(day.dateString) && 'hidden md:flex',
          ]"
        >
          <!-- 日期標頭 -->
          <div class="mb-3 flex items-center justify-between border-b border-border/50 pb-2.5">
            <div>
              <div class="flex items-center gap-1.5">
                <span :class="['text-xs font-bold', day.isToday ? 'text-primary' : 'text-muted-foreground']">
                  {{ day.dayLabel }}
                </span>
                <span v-if="day.isToday" class="rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary"> 今天 </span>
              </div>
              <div class="text-sm font-extrabold text-foreground">
                {{ day.shortDate }}
              </div>
            </div>
            <!-- 電腦版顯示該日總時段數，手機版顯示可用時段數 -->
            <span class="text-[11px] font-medium text-muted-foreground hidden md:inline">
              {{ getGroupedSlotsForDay(day.dateString).length }} 個時段
            </span>
            <span class="text-[11px] font-bold text-primary md:hidden"> {{ getAvailableGroupedSlotsForDay(day.dateString).length }} 個可選 </span>
          </div>

          <!-- 該日可用時段列表（依時段分組，多位按摩師並排展示） -->
          <div class="flex-1 space-y-2.5">
            <template v-if="getGroupedSlotsForDay(day.dateString).length > 0">
              <div
                v-for="group in getGroupedSlotsForDay(day.dateString)"
                :key="group.time_display"
                :class="[
                  'rounded-sm border p-2.5 transition-all duration-200',
                  group.isPast
                    ? 'border-border/30 bg-muted/10 opacity-50 hidden md:block'
                    : 'border-border/80 bg-card/90 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 block',
                ]"
              >
                <!-- 時段標題列 -->
                <div class="mb-2 flex items-center justify-between">
                  <span :class="['font-mono text-xs font-black tracking-tight', group.isPast ? 'text-muted-foreground' : 'text-foreground']">
                    {{ group.time_display }}
                  </span>
                  <span
                    v-if="!group.isPast && group.slots.length > 1 && selectedMasseurId === null"
                    class="rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary"
                  >
                    {{ group.slots.length }}位可選
                  </span>
                </div>

                <!-- 按摩師按鈕並排區 (1位滿版，多位並排) -->
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="slot in group.slots"
                    :key="slot.id"
                    type="button"
                    :disabled="slot.isPast"
                    :class="[
                      'group relative flex flex-1 min-w-[64px] items-center justify-center rounded-sm px-2 py-1.5 text-xs font-bold transition-all duration-200',
                      slot.isPast
                        ? 'cursor-not-allowed border border-transparent bg-muted/20 text-muted-foreground/40 hidden md:flex'
                        : 'cursor-pointer border border-primary/40 bg-primary/10 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 active:scale-[0.97] flex',
                    ]"
                    @click="handleSelectSlot(slot)"
                  >
                    <span class="truncate">
                      {{ slot.masseur_name }}
                    </span>
                  </button>
                </div>
              </div>
            </template>

            <div
              v-else
              class="flex h-28 flex-col items-center justify-center rounded-sm border border-dashed border-border/40 p-2 text-center text-xs text-muted-foreground"
            >
              <Clock class="mb-1 h-4 w-4 opacity-40" />
              <span>無可預約時段</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 手機版：若整週在手機上皆無任何可用預約時段時呈現的友善提示 -->
      <div
        v-if="!hasAnyAvailableSlotThisWeek"
        class="flex md:hidden flex-col items-center justify-center rounded-sm border border-dashed border-border/70 bg-card/40 p-8 text-center"
      >
        <CalendarX class="mb-3 h-10 w-10 text-muted-foreground/40" />
        <h4 class="text-base font-bold text-foreground">本週目前無可預約時段</h4>
        <p class="mt-1 text-xs text-muted-foreground">您可以點選「下一週」按鈕查看後續日期的排班與可用時段。</p>
        <button
          type="button"
          class="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:scale-[1.02] transition-all cursor-pointer shadow-md shadow-primary/20"
          @click="changeWeek(1)"
        >
          <span>前往下一週</span>
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CalendarX, Clock } from "lucide-vue-next"
import { getWeekDays, sliceToHourlySlots, formatDateTime, isSlotPast, type HourlySlot } from "~/utils/timeSlotHelper"
import { useBookingApi, type Masseur } from "~/composables/useBookingApi"

export interface GroupedTimeSlot {
  time_display: string
  label: string
  start_at: string
  end_at: string
  isPast: boolean
  slots: HourlySlot[]
}

const emit = defineEmits<{
  (e: "select-slot", slot: HourlySlot): void
}>()

const api = useBookingApi()

const masseurs = ref<Masseur[]>([])
const selectedMasseurId = ref<number | null>(null)
const currentWeekOffset = ref(0)
const referenceDate = ref(new Date())
const loading = ref(false)
const rawSlotsByDate = ref<Record<string, HourlySlot[]>>({})

// 計算當前週資訊
const weekInfo = computed(() => getWeekDays(referenceDate.value))

// 判斷是否為當前週
const isCurrentWeek = computed(() => currentWeekOffset.value === 0)

// 取得特定日期的所有時段
function getAllSlotsForDay(dateString: string): HourlySlot[] {
  const slots = rawSlotsByDate.value[dateString] || []
  return selectedMasseurId.value === null ? slots : slots.filter((s) => s.masseur_id === selectedMasseurId.value)
}

// 依時段分組（包含所有時段，精確標註 isPast）
function getGroupedSlotsForDay(dateString: string): GroupedTimeSlot[] {
  const slots = getAllSlotsForDay(dateString)
  const map = new Map<string, GroupedTimeSlot>()

  for (const slot of slots) {
    const isPast = isSlotPast(slot.start_at, 30)

    if (!map.has(slot.time_display)) {
      map.set(slot.time_display, {
        time_display: slot.time_display,
        label: slot.label,
        start_at: slot.start_at,
        end_at: slot.end_at,
        isPast,
        slots: [],
      })
    }
    map.get(slot.time_display)!.slots.push({
      ...slot,
      isPast,
    })
  }

  const list = Array.from(map.values())
  list.forEach((g) => {
    g.isPast = g.slots.every((s) => s.isPast)
  })
  return list
}

// 取得特定日期中有效可預約的群組時段清單（手機版專用）
function getAvailableGroupedSlotsForDay(dateString: string): GroupedTimeSlot[] {
  const allGroups = getGroupedSlotsForDay(dateString)
  return allGroups
    .map((g) => ({
      ...g,
      slots: g.slots.filter((s) => !s.isPast),
    }))
    .filter((g) => g.slots.length > 0)
}

// 判斷特定日期是否有至少一個未過期的有效時段
function hasAvailableSlotsForDay(dateString: string): boolean {
  return getAvailableGroupedSlotsForDay(dateString).length > 0
}

// 判斷當前週是否有任何有效可預約時段（手機版全空判定）
const hasAnyAvailableSlotThisWeek = computed(() => {
  return weekInfo.value.weekDays.some((day) => hasAvailableSlotsForDay(day.dateString))
})

// 載入按摩師清單
async function loadMasseurs() {
  try {
    masseurs.value = await api.fetchMasseurs()
  } catch (err) {
    console.error("載入按摩師失敗", err)
  }
}

// 載入週行事曆時段
async function loadAvailabilities() {
  loading.value = true
  try {
    const start_at = formatDateTime(weekInfo.value.startOfWeek)
    const end_at = formatDateTime(weekInfo.value.endOfWeek)

    const rawData = await api.fetchAvailabilities({
      start_at,
      end_at,
      masseur_id: selectedMasseurId.value,
    })

    rawSlotsByDate.value = sliceToHourlySlots(rawData)
  } catch (err) {
    console.error("載入排班失敗", err)
  } finally {
    loading.value = false
  }
}

// 切換按摩師篩選
function selectMasseur(id: number | null) {
  selectedMasseurId.value = id
  loadAvailabilities()
}

// 切換週次
function changeWeek(direction: number) {
  const nextOffset = currentWeekOffset.value + direction
  if (nextOffset < 0) return // 不允許回朔到過去的週次

  currentWeekOffset.value = nextOffset
  const newRef = new Date()
  newRef.setDate(newRef.getDate() + nextOffset * 7)
  referenceDate.value = newRef
  loadAvailabilities()
}

// 回到本週
function resetToCurrentWeek() {
  currentWeekOffset.value = 0
  referenceDate.value = new Date()
  loadAvailabilities()
}

// 點選時段
function handleSelectSlot(slot: HourlySlot) {
  if (slot.isPast) return
  emit("select-slot", slot)
}

onMounted(async () => {
  await loadMasseurs()
  await loadAvailabilities()
})

// 提供給外部父層重新整理用
defineExpose({
  refresh: loadAvailabilities,
})
</script>
