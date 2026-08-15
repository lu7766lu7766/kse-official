<template>
  <div class="w-full">
    <!-- 師傅切換 Tabs -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-5">
      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          選擇師傅：
        </span>
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
          全部師傅（不指定）
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

      <!-- 週次切換控制器 -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          :disabled="isCurrentWeek"
          :class="[
            'inline-flex h-9 items-center justify-center gap-1 rounded-sm border px-3 text-xs font-semibold transition-all',
            isCurrentWeek
              ? 'border-border/40 text-muted-foreground/40 cursor-not-allowed'
              : 'border-border bg-card/80 text-foreground hover:border-primary hover:text-primary cursor-pointer',
          ]"
          title="上一週"
          @click="changeWeek(-1)"
        >
          <ChevronLeft class="h-4 w-4" />
          <span class="hidden sm:inline">上一週</span>
        </button>

        <button
          v-if="!isCurrentWeek"
          type="button"
          class="inline-flex h-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 px-3 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
          @click="resetToCurrentWeek"
        >
          回到本週
        </button>

        <button
          type="button"
          class="inline-flex h-9 items-center justify-center gap-1 rounded-sm border border-border bg-card/80 px-3 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary cursor-pointer"
          title="下一週"
          @click="changeWeek(1)"
        >
          <span class="hidden sm:inline">下一週</span>
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- 當前週範圍提示 -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <CalendarIcon class="h-4 w-4 text-primary" />
        <span class="text-sm font-bold text-foreground">
          {{ weekInfo.rangeLabel }}
        </span>
      </div>
      <div class="flex items-center gap-3 text-xs text-muted-foreground">
        <span class="flex items-center gap-1">
          <span class="h-2.5 w-2.5 rounded-full bg-primary"></span> 可預約時段 (1小時)
        </span>
        <span class="flex items-center gap-1">
          <span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30"></span> 已過期/需提前半小時以上
        </span>
      </div>
    </div>

    <!-- 載入中骨架畫面 -->
    <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      <div
        v-for="i in 7"
        :key="i"
        class="animate-pulse rounded-sm border border-border/60 bg-card/40 p-4"
      >
        <div class="mb-3 h-5 w-16 rounded bg-muted/60"></div>
        <div class="space-y-2">
          <div class="h-10 rounded bg-muted/40"></div>
          <div class="h-10 rounded bg-muted/40"></div>
          <div class="h-10 rounded bg-muted/40"></div>
        </div>
      </div>
    </div>

    <!-- 7 天行事曆網格視圖 -->
    <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      <div
        v-for="day in weekInfo.weekDays"
        :key="day.dateString"
        :class="[
          'flex flex-col rounded-sm border p-3.5 transition-all duration-300',
          day.isToday
            ? 'border-primary/70 bg-gradient-to-b from-primary/10 via-card/80 to-card shadow-lg shadow-primary/5'
            : 'border-border/70 bg-card/40 hover:border-border',
        ]"
      >
        <!-- 日期標頭 -->
        <div class="mb-3 flex items-center justify-between border-b border-border/50 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5">
              <span
                :class="[
                  'text-xs font-bold',
                  day.isToday ? 'text-primary' : 'text-muted-foreground',
                ]"
              >
                {{ day.dayLabel }}
              </span>
              <span
                v-if="day.isToday"
                class="rounded-full bg-primary/20 px-1.5 py-0.2 text-[10px] font-bold text-primary"
              >
                今天
              </span>
            </div>
            <div class="text-sm font-extrabold text-foreground">
              {{ day.shortDate }}
            </div>
          </div>
          <span class="text-[11px] font-medium text-muted-foreground">
            {{ getGroupedSlotsForDay(day.dateString).length }} 個時段
          </span>
        </div>

        <!-- 該日可用時段列表（依時段分組，多位師傅並排展示） -->
        <div class="flex-1 space-y-2.5">
          <template v-if="getGroupedSlotsForDay(day.dateString).length > 0">
            <div
              v-for="group in getGroupedSlotsForDay(day.dateString)"
              :key="group.time_display"
              :class="[
                'rounded-sm border p-2.5 transition-all duration-200',
                group.isPast
                  ? 'border-border/30 bg-muted/10 opacity-50'
                  : 'border-border/80 bg-card/90 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5',
              ]"
            >
              <!-- 時段標題列 -->
              <div class="mb-2 flex items-center justify-between">
                <span
                  :class="[
                    'font-mono text-xs font-black tracking-tight',
                    group.isPast ? 'text-muted-foreground' : 'text-foreground',
                  ]"
                >
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
                      ? 'cursor-not-allowed border border-transparent bg-muted/20 text-muted-foreground/40'
                      : 'cursor-pointer border border-primary/40 bg-primary/10 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 active:scale-[0.97]',
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-vue-next"
import {
  getWeekDays,
  sliceToHourlySlots,
  formatDateTime,
  type HourlySlot,
} from "~/utils/timeSlotHelper"
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

// 取得特定日期的可用時段
function getSlotsForDay(dateString: string): HourlySlot[] {
  const slots = rawSlotsByDate.value[dateString] || []
  if (selectedMasseurId.value === null) {
    return slots
  }
  return slots.filter((s) => s.masseur_id === selectedMasseurId.value)
}

// 依時段分組時段（支援同時間多位師傅並排）
function getGroupedSlotsForDay(dateString: string): GroupedTimeSlot[] {
  const slots = getSlotsForDay(dateString)
  const map = new Map<string, GroupedTimeSlot>()

  for (const slot of slots) {
    if (!map.has(slot.time_display)) {
      map.set(slot.time_display, {
        time_display: slot.time_display,
        label: slot.label,
        start_at: slot.start_at,
        end_at: slot.end_at,
        isPast: !!slot.isPast,
        slots: [],
      })
    }
    map.get(slot.time_display)!.slots.push(slot)
  }

  return Array.from(map.values())
}

// 載入師傅清單
async function loadMasseurs() {
  try {
    masseurs.value = await api.fetchMasseurs()
  } catch (err) {
    console.error("載入師傅失敗", err)
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

// 切換師傅篩選
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
