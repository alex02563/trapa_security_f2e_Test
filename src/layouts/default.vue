<script setup>
import {
  FlagIcon,
  HomeIcon,
  ChartSquareBarIcon,
  DocumentSearchIcon,
  TableIcon,
  AcademicCapIcon,
  IdentificationIcon,
  AdjustmentsIcon,
  LogoutIcon,
  BellIcon
} from '@heroicons/vue/outline'

</script>
<template>
  <div class="flex">
    <!-- Menu -->
    <div class="w-14 bg-gray-900 text-white">
      <FlagIcon class="p-4 border-b-2 border-gray-700" />
      <HomeIcon class="p-4" />
      <ChartSquareBarIcon class="p-4" />
      <DocumentSearchIcon class="bg-gray-800 p-2 m-2 rounded-md" />
      <TableIcon class="p-4" />
      <AcademicCapIcon class="p-4" />
      <IdentificationIcon class="p-4" />
      <AdjustmentsIcon class="p-4" />
    </div>

    <!-- Page -->
    <div class="w-full min-h-screen">
      <div class="text-gray-500 border border-gray-200 font-black shadow-md flex justify-between px-4">
        <div class="p-2 text-gray-900">
          SOC Room
        </div>
        <div class="flex">
          <div class="p-2">
            admin
          </div>
          <div class="p-2">
            <BellIcon class="w-6 h-6" />
          </div>
          <div class="p-2">
            <LogoutIcon class="w-6 h-6" />
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-3 pb-0 bg-gray-100 min-h-screen">
        <router-view />
      </div>
    </div>
  </div>
</template>