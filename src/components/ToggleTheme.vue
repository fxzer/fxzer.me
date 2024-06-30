<script setup lang='ts'>
import { toggleDark } from '~/logics'
</script>

<template>
  <a class="select-none cursor-pointer" title="切换主题" @click="toggleDark">
    <div i-ri-sun-line dark:i-ri-moon-line />
  </a>
</template>
