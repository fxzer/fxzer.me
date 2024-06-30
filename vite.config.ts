import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import GitHubAlerts from 'markdown-it-github-alerts'
import UnoCSS from 'unocss/vite'
import SVG from 'vite-svg-loader'
import MarkdownItShiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import TOC from 'markdown-it-table-of-contents'
import { slugify } from './scripts/slugify'

const promises: Promise<any>[] = []

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
    ],
  },
  plugins: [
    UnoCSS(),
    VueRouter({
      dts: 'types/typed-router.d.ts',
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      logs: true,

      extendRoute(route) {
        const path = route.components.get('default')
        if (!path)
          return

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.addToMeta({
            frontmatter: {
              ...data,
              aaa: 'aaa',
            },
          })
        }
      },
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true,
      },
    }),

    Markdown({
      wrapperComponent: 'WrapperPost',
      wrapperClasses: (id) => {
        return id.includes('projects') ? '' : 'prose m-auto slide-enter-content'
      },
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(await MarkdownItShiki({
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(GitHubAlerts)
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    AutoImport({
      dts: 'types/auto-imports.d.ts',
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: 'types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
      defaultImport: 'url',
    }),

    {
      name: 'await',
      async closeBundle() {
        await Promise.all(promises)
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: 'minify',
  },
})
