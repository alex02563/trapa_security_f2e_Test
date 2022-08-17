<script setup>
import img from '/src/assets/png/favicon.png'
</script>

<template>
  <div class="mx-auto p-12 pt-0 h-screen grid gap-4 content-around">
    <div class="text-center">
      <div class="flex justify-center my-4">
        <img :src="img">
      </div>
      <p class="font-large text-4xl py-4">404 錯誤頁面</p>
      <div class="mt-2 font-medium text-xl">
        <router-link to="/" class="border-b-2 border-black">
          回到首頁
        </router-link>
      </div>
    </div>
  </div>
</template>