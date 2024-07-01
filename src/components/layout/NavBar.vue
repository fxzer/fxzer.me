<script setup lang="ts">
import Logo from './Logo.vue'

const navList = [
  {
    title: '博客',
    to: '/posts',
    icon: 'i-ri-article-line',
  },
  {
    title: '项目',
    to: '/projects',
    icon: 'i-codicon:github-project scale-105',
  },
]

const linkList = [
  {
    title: 'GitHub',
    icon: 'i-simple-icons:github',
    href: 'https://github.com/fxzer',
  },
  {
    title: 'Gitee',
    icon: 'i-simple-icons:gitee',
    href: 'https://gitee.com/fxzer',
  },
]
const route = useRoute()
</script>

<template>
  <header class="my-3 flex items-center px-4 h-12 justify-around z-40">
    <RouterLink
      class="w-12 h-12  select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo text-black dark:text-white />
    </RouterLink>

    <nav class="flex gap-4 md:gap-10">
      <RouterLink v-for="item, idx in navList" :key="idx" :to="item.to" title="item.title" :class="route.path.includes(item.to) ? 'font-semibold' : 'op80 '">
        <div :class="item.icon" /> {{ item.title }}
      </RouterLink>
    </nav>
    <div class="flex gap-4">
      <a v-for="link, i in linkList" :key="i" :href="link.href" title="link.title">
        <div :class="link.icon" />
      </a>
      <ToggleTheme />
    </div>
  </header>
</template>

<style scoped>
</style>
