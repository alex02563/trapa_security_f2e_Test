<!-- 提供 icon title memo slot 欄位-->
<script setup>
defineProps({
  items: Array
})

</script>

<template>
  <ol class="relative border-l border-gray-200">
    <li v-for="(item, idx) in items" :key="`item-${idx}`" class="mb-4 ml-8">
      <span
        class="
          flex
          absolute
          -left-3
          justify-center
          items-center
          w-6
          h-6
          rounded-full
          ring-8 ring-white
          bg-white
        "
      >
        <slot name="icon" :data="item">
          {{ item.status }}
        </slot>
      </span>
      <div>
        <slot name="title" :data="item">
          {{ item.action }}
        </slot>
      </div>
      <div>
        <slot name="memo" :data="item">
          {{ item.memo }}
        </slot>
      </div>
    </li>
  </ol>
</template>