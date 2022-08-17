
<script setup>
import { historyData, ticketsData } from '@/assets/json/data.json';
import TimeLine from "@/components/timeLine.vue";
import { _ } from "@/plugins/lodash.js"
import { useToast } from "vue-toastification";
import { ref, computed } from "vue";

const toast = useToast();
const tabBtns = [
  { name: "All", value: 1 },
  { name: "Queued", value: 2 },
  { name: "Resolved", value: 4 },
  { name: "Rejected", value: 3 },
];
const statusMap = {
  0: 'Rejected',
  1: 'Resolved',
  2: 'Processing',
  3: 'Pending',
}
const tabTarget = ref(1);
const subModal = ref(false);
const subData = ref({});

let history = historyData;
let tickets = ticketsData;
let idx = 0

const tablengths = computed(() => {
  let result = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }
  for (let i = 0; i < tickets.length; i++) {
    result[1] += 1
    switch (tickets[i].status) {
      case 0:
        result[3] += 1
        break;
      case 1:
        result[4] += 1
        break;
      case 2:
      case 3:
        result[2] += 1
        break;
    }
  }
  return result
})

const tabLists = computed(() => {
  return tickets.filter((item) => {
    let result = false
    switch (tabTarget.value) {
      case 1:
        result = true
        break;
      case 2:
        result = item.status === 2 || item.status === 3
        break;
      case 3:
        result = item.status === 0
        break;
      case 4:
        result = item.status === 1
        break;
    }
    if (result) {
      return item
    }
  })
})

function setTab(value) {
  tabTarget.value = value;
}

function displayModal(id) {
  idx = history.findIndex((item) => item.id === id)
  subData.value = _.cloneDeep(history[idx])
  subModal.value = true
}

function cancelModal() {
  subData.value = {}
  subModal.value = false
}

function submit() {
  const { loginTime, attackerIP, username } = subData.value.answer
  if (loginTime && attackerIP && username) {
    toast.success("送出成功", {
      timeout: 2000
    })
    cancelModal()
  } else {
    toast.error("請填寫必填欄位", {
      timeout: 3000
    })
  }
}

</script>

<template>
  <!-- ACTION TIMELINE -->
  <div class="md:w-1/3 w-full px-8">
    <div class="text-center my-4 text-xl font-bold">
      ACTION TIMELINE
    </div>
    <TimeLine :items="history">
      <template v-slot:icon="{ data }">
        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" :class="{
          'text-red-600': data.status === 0,
          'text-green-600': data.status === 1,
          'text-yellow-400': data.status === 2
        }">
          <svg class=" w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path v-show="data.status === 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            <path v-show="data.status === 1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7"></path>
            <path v-show="data.status === 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </svg>
      </template>
      <template v-slot:title="{ data }">
        <h3 class="
              flex
              items-center
              mb-1
              text-md
              font-semibold
              text-gray-900
              border-b-2
            " :class="{
              'border-red-600': data.status === 0,
              'bg-green-500 p-1 px-3 rounded-lg': data.status === 1,
              'border-yellow-400': data.status === 2
            }">
          {{ data.action }}
        </h3>
      </template>
      <template v-slot:memo="{ data }">
        <div v-if="data.status !== 1" class="flex justify-between">
          <div class="mb-4 text-sm text-gray-500">
            {{ data.duration }} minutes
          </div>
          <div class="mb-4 text-sm text-gray-500 text-right">
            Score {{ data.score }} pts
            <div class="text-xs">
              <a class="border-b border-gray-400 cursor-pointer hover:text-black" @click="displayModal(data.id)">
                Reda more >
              </a>
            </div>
          </div>
        </div>
        <div v-else class="mb-4 text-xs text-gray-500">
          {{ data.submitAt }}
        </div>
      </template>
    </TimeLine>
  </div>

  <!-- Tickets -->
  <div class="md:w-2/3 w-full">
    <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
      <a>
        <h5 class="
            mb-3
            pb-2
            text-lg
            font-bold
            tracking-tight
            text-gray-900
            border-b
          ">
          Tickets
        </h5>
      </a>
      <div class="
        text-sm
        font-medium
        text-center text-gray-500
      ">
        <ul class="flex flex-wrap -mb-px">
          <li v-for="(btn, idx) in tabBtns" :key="`btn_${idx}`" class="mr-2">
            <a class="
                cursor-pointer
                inline-block
                p-3
                rounded-t-lg
                border-b-2 border-transparent
              " :class="{
                'text-blue-400 border-b-2 border-blue-400 active font-bold': btn.value === tabTarget,
                'hover:text-gray-700 hover:border-gray-300': btn.value !== tabTarget
              }" @click="setTab(btn.value)">
              {{ btn.name }}
              <span class="text-gray-700 bg-gray-100 text-xs font-xs ml-2 px-2.5 py-0.5 rounded-xl" :class="{
                'text-blue-400 bg-blue-100 active font-bold': btn.value === tabTarget,
              }">
                {{ tablengths[btn.value] }}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="relative mt-2">
        <table class="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr v-for="(list, listIdx) in tabLists" :key="`list_${listIdx}`" class="bg-white border-b" :class="{
              'opacity-50': list.status !== 3
            }">
              <td class="font-medium text-gray-900 w-4">
                <span class="text-white text-xs font-semibold mr-2 px-2 py-1 rounded" :class="{
                  'bg-red-600': list.status === 0,
                  'bg-green-600': list.status === 1,
                  'bg-yellow-400': list.status === 2,
                  'bg-blue-600': list.status === 3,
                }">
                  {{ statusMap[list.status] }}
                </span>
              </td>
              <td class="py-2">
                <div class="text-xs font-bold">
                  {{ list.action }}
                </div>
                <span>
                  {{ list.tags }}
                </span>
                <span v-show="list.status === 1" class="text-xs font-bold text-green-600">
                  + {{ list.score }} pts
                </span>
              </td>
              <td class="py-2 text-xs">
                start 1 minutes
              </td>
              <td class="py-2 text-right">
                #{{ list.id }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="subModal">
    <div class="
        overflow-y-auto
        fixed
        top-0
        right-0
        left-0
        z-30
        w-full
        md:inset-0
        bg-gray-600
        bg-opacity-75
        transition-opacity
        justify-center
        items-center
        flex
      ">
      <div class="
          xl:w-1/3
          lg:w-1/2
          w-full
          h-auto
          m-4
          bg-white
          modal-dialog
          rounded-xl
        ">
        <div class="modal-content shadow-md bg-cover rounded-xl">
          <div class="
              relative
              modal-header
              items-center
              justify-center
            ">
            <div class="
                absolute
                top-5
                right-5
                text-gray-400
                border-none
                rounded-none
                cursor-pointer
                z-10
              " @click="cancelModal">
              <svg class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
          <div class="modal-body relative p-7 pt-1">
            <div class="mx-auto flex flex-col items-center justify-between">
              <p class="py-6 font-bold text-xl text-gray-600">
                {{ subData.action }}
              </p>
              <div class="w-full flex justify-between">
                <p class="mb-0 text-xs text-gray-500">
                  Duration <span class="text-gray-700 font-black">{{ subData.duration }} minutes</span>
                </p>
                <p class="mb-0 text-xs text-gray-500 text-right">
                  Score <span class="text-gray-700 font-black">{{ subData.score }} pts</span>
                </p>
              </div>
              <div class="text-center">
                <span class="px-3 py-1 text-xs bg-blue-200 rounded-2xl">
                  {{ subData.tags }}
                </span>
              </div>
              <p class="pt-3 text-sm text-left">
                {{ subData.memo }}
              </p>
              <p class="w-full text-left pt-2 text-xs text-gray-500">
                Notice: There may be more than one answer. You can submit any of it.
              </p>
              <div class="flex flex-wrap my-3 w-full">
                <div class="border-t-2 py-5 px-3 w-1/2">
                  <p>Login Time</p>
                  <span class="text-xs text-gray-400">* success login time</span>
                  <input v-model="subData.answer.loginTime"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                </div>
                <div class="border-t-2 py-5 px-3 w-1/2">
                  <p>Attacker IP</p>
                  <span class="text-xs text-gray-400">* source ip address</span>
                  <input v-model="subData.answer.attackerIP"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                </div>
                <div class="border-t-2 py-5 px-3 w-1/2">
                  <p>Username</p>
                  <span class="text-xs text-gray-400">* login username</span>
                  <input v-model="subData.answer.username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                </div>
              </div>
              <div class="w-full flex justify-end">
                <button type="button" class="
                    w-24
                    text-white
                    bg-gray-700
                    font-medium
                    rounded-lg
                    text-sm
                    py-2
                  " @click="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
