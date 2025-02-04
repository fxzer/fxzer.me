import '@unocss/reset/tailwind.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import '@shikijs/twoslash/style-rich.css'
import 'shiki-magic-move/style.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'

import 'uno.css'

import { routes } from 'vue-router/auto-routes'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import { setupRouterScroller } from 'vue-router-better-scroller'
import { createPinia } from 'pinia'
import App from './App.vue'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: '/fxzer.me/',
  },
  ({ router, app, isClient }) => {
    app.use(createPinia())
    if (isClient) {
      const html = document.querySelector('html')!
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            if (ctx.savedPosition?.top || import.meta.hot)
              html.classList.add('no-sliding')
            else
              html.classList.remove('no-sliding')
            return true
          },
        },
        behavior: 'auto',
      })

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
