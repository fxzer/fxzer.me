---
title: Projects - fxzer
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Vue:
    - name: 'Json Viewer'
      link: 'https://github.com/fxzer/json-viewer'
      desc: 'JSON 可视化网站'
    - name: 'x-admin'
      link: 'https://github.com/fxzer/x-admin'
      desc: 'Vue3后台管理系统模板'
    - name: 'funny-canvas'
      link: 'https://github.com/fxzer/funny-canvas'
      desc: '有趣的 Canvas 案例'
  Nuxt:
    - name: 'github-trends'
      link: 'https://github.com/fxzer/github-trands'
      desc: 'Github 趋势一览'
  React:
    - name: 'React XXX'
      link: 'https://github.com/fxzer/xxx'
      desc: 'xxx'
---

<ListProjects :projects="frontmatter.projects" />
