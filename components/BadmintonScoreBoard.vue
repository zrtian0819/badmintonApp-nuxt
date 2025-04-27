<template>
  <div id="app" class="w-screen h-screen bg-green flex p-8 overflow-hidden relative">
    <div class="grid grid-cols-2 text-white w-full h- full border-white border-8">
      <div class="border-white border-r-4 flex flex-col justify-center items-center gap-6 relative">
        <span
          class="absolute right-5 top-[50%] -translate-y-[50%] flex items-center justify-center cursor-pointer"
        >
          <!-- @click="switchPlace('A')" -->
          <MoveVertical class="w-10 h-10" />
        </span>
        <div class="flex text-4xl">
          <span v-show="currentTeam === 'A' && teamA.score % 2 !== 0">🏸</span>
          {{ teamA.oddPlace }}
        </div>
        <div
          class="bg-green px-2 text-[12dvw] flex flex-row items-center cursor-pointer select-none"
          @click="getScore('A')"
        >
          {{ teamA.score }}
        </div>
        <div class="flex text-4xl">
          <span v-show="currentTeam === 'A' && teamA.score % 2 == 0">🏸</span>
          {{ teamA.evenPlace }}
        </div>
      </div>
      <div class="border-white border-l-4 flex flex-col justify-center items-center gap-6 relative">
        <span
          class="absolute left-5 top-[50%] -translate-y-[50%] flex items-center justify-center cursor-pointer"
        >
          <!-- @click="switchPlace('B')" -->
          <MoveVertical class="w-10 h-10" />
        </span>
        <div class="flex text-4xl">
          <span v-show="currentTeam === 'B' && teamB.score % 2 == 0">🏸</span>
          {{ teamB.evenPlace }}
        </div>
        <div
          class="bg-green px-2 text-[12dvw] flex flex-row items-center cursor-pointer select-none"
          @click="getScore('B')"
        >
          {{ teamB.score }}
        </div>
        <div class="flex text-4xl">
          <span v-show="currentTeam === 'B' && teamB.score % 2 !== 0">🏸</span>
          {{ teamB.oddPlace }}
        </div>
      </div>
    </div>

    <nav
      class="absolute bottom-0 transition-all duration-700 left-0 font-bold"
      :class="[isSettingOpen ? 'bottom-0' : 'translate-y-[45dvh]']"
    >
      <div
        class="inline-block rounded-t-xl px-5 py-1 relative left-[50%] -translate-x-[50%] bg-white click transition duration-1000 delay-100"
        :class="{ 'opacity-40': !isSettingOpen }"
        @click="isSettingOpen = !isSettingOpen"
      >
        設定
      </div>
      <div
        class="bg-white px-5 py-8 sm:p-10 rounded-t-[20px] w-screen shadow-sm h-[45dvh] flex flex-col gap-3 overflow-auto"
      >
        <div class="flex items-center gap-2">
          <span class="m-auto flex items-center gap-2">
            <label for="score">最高分</label>
            <select v-model="maxScore" placeholder="請選擇">
              <option value="1">11</option>
              <option value="2">21</option>
              <option value="3">25</option>
            </select>
          </span>
          <span class="m-auto flex items-center gap-2">
            <label for="score">單雙打</label>
            <select v-model="playerPerTeam" placeholder="請選擇">
              <option value="1">單打</option>
              <option value="2">雙打</option>
            </select>
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2">
          <div class="flex flex-col p-5 gap-3 sm:border-r-1 border-neutral-300">
            <h2 class="text-xl">隊A</h2>
            <div class="flex">
              <label for="" class="flex-1">選手1</label>
              <input v-model="teamA.playerA" type="text" class="flex-2" />
            </div>
            <div class="flex">
              <label for="" class="flex-1">選手2</label>
              <input
                v-model="teamA.playerB"
                type="text"
                class="flex-2"
                :disabled="playerPerTeam === '1'"
              />
            </div>
          </div>
          <div class="flex flex-col p-5 gap-3">
            <h2 class="text-xl">隊B</h2>
            <div class="flex">
              <label for="" class="flex-1">選手1</label>
              <input v-model="teamB.playerA" type="text" class="flex-2" />
            </div>
            <div class="flex">
              <label for="" class="flex-1">選手2</label>
              <input
                v-model="teamB.playerB"
                type="text"
                class="flex-2"
                :disabled="playerPerTeam === '1'"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="font-bold" @click="initGame">開始</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { MoveVertical } from 'lucide-vue-next'

const isSettingOpen = ref(true)
const maxScore = ref('2')
const playerPerTeam = ref('2')
const lastGetScoreTeam = ref<team>(undefined)
const currentTeam = ref<team>(undefined)

type team = 'A' | 'B' | undefined

// reactive 用於物件類型
const teamA = reactive({
  msg: 0,
  playerA: '雷俊龍',
  playerB: '林君潔',
  evenPlace: '',
  oddPlace: '',
  score: 0,
})

const teamB = reactive({
  msg: 0,
  playerA: '張人天',
  playerB: '唐允強',
  evenPlace: '',
  oddPlace: '',
  score: 0,
})

// 方法
const initGame = () => {
  isSettingOpen.value = false
  randomStart()
}

const randomStart = () => {
  teamA.score = 0
  teamB.score = 0
  const randomNum = Math.floor(Math.random() * 2)
  if (randomNum === 0) {
    currentTeam.value = 'A'
    lastGetScoreTeam.value = 'A'
    teamA.evenPlace = teamA.playerA
    teamA.oddPlace = teamA.playerB
    teamB.evenPlace = teamB.playerA
    teamB.oddPlace = teamB.playerB
  } else {
    currentTeam.value = 'B'
    lastGetScoreTeam.value = 'B'
    teamA.evenPlace = teamA.playerB
    teamA.oddPlace = teamA.playerA
    teamB.evenPlace = teamB.playerB
    teamB.oddPlace = teamB.playerA
  }
}

// const switchPlace = (team: 'A' | 'B') => {}

const getScore = (team: team) => {
  if (!team) return console.error('team is undefined')

  if (team === 'A') {
    teamA.score++
    currentTeam.value = 'A'

    if (lastGetScoreTeam.value === 'A') {
      const originEvenPlayer = teamA.evenPlace
      const originOddPlayer = teamA.oddPlace
      teamA.evenPlace = originOddPlayer
      teamA.oddPlace = originEvenPlayer
    }

    lastGetScoreTeam.value = 'A'
  } else {
    teamB.score++
    currentTeam.value = 'B'

    if (lastGetScoreTeam.value === 'B') {
      const originEvenPlayer = teamB.evenPlace
      const originOddPlayer = teamB.oddPlace
      teamB.evenPlace = originOddPlayer
      teamB.oddPlace = originEvenPlayer
    }

    lastGetScoreTeam.value = 'B'
  }

  // if (teamA.score >= maxScore.value) {
  //   alert(`${teamA.playerA} & ${teamA.playerB} 贏了！`)
  //   initGame()
  // } else if (teamB.score >= maxScore.value) {
  //   alert(`${teamB.playerA} & ${teamB.playerB} 贏了！`)
  //   initGame()
  // }
}
</script>

<style scoped lang="scss">
$green: #016934;

html {
  font-family: serif '微軟正黑體';
}

.bg-green {
  background-color: $green;
}

.click {
  cursor: pointer;
}

.test {
  border: 1px solid black;
  & * {
    border: 1px solid black;
  }
}

input {
  border: 2px solid $green;
  border-radius: 5px;
  max-width: 250px;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    border: 2px solid $green;
    box-shadow: 0 0 0 3px rgba($green, 0.3);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #e0e0e0;
    color: #888888;
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
    transform: none;

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
}

select {
  border: 2px solid $green;
  border-radius: 5px;
  max-width: 250px;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  appearance: none; // Removes default browser styling
  background-color: white;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px; // Space for the custom arrow

  &:focus {
    border: 2px solid $green;
    box-shadow: 0 0 0 3px rgba($green, 0.3);
    transform: translateY(-1px);
  }

  &:hover {
    cursor: pointer;
  }

  // Styling for option elements
  option {
    padding: 8px;
    font-size: 14px;
  }
}

button {
  border: 2px solid $green;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: $green;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    // background-color: darken($green, 5%);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba($green, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }

  // Secondary/outline variant
  &.outline {
    background-color: transparent;
    color: $green;

    &:hover {
      background-color: rgba($green, 0.1);
    }
  }

  // Disabled state
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;

    &:hover {
      background-color: $green;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}

// Custom Scrollbar with Inset Design
// Designed for: zrtian0819
// Created: 2025-04-27

// Custom Scrollbar with Inset Design
// Designed for: zrtian0819
// Created: 2025-04-27

// Hide default buttons/arrows
::-webkit-scrollbar-button {
  display: none;
}

// Main scrollbar container - making it more inset
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  margin-right: 4px;
}

// Track (background) - more inset with transparency
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.08);
  margin: 4px;
}

// Thumb (the draggable part) - using $green with transparency
::-webkit-scrollbar-thumb {
  background-color: rgba($green, 0.6);
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba($green, 0.8);
  }

  &:active {
    background-color: rgba($green, 1);
  }
}

// Corner where horizontal and vertical scrollbars meet
::-webkit-scrollbar-corner {
  background: transparent;
}

// For Firefox (different syntax)
* {
  scrollbar-width: thin;
  scrollbar-color: rgba($green, 0.6) transparent;
}

// Optional: Additional inset for specific containers
.inset-scrollbar {
  padding-right: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.12);
    margin: 6px;
  }
}

// label{
//   min-width: 100px;
// }
</style>
