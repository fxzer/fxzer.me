---
title: CSS常用代码段
date: 2023-06-30 10:51:38
art: random
duration: 2min
---

## 单行与多行溢出隐藏

```css
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

```css
.text {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; /* 布局方向 */
  -webkit-line-clamp: 3; /* 显示三行文本 */
}
```

## 自定义滚动条

```css
html,
body {
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

/* 自定义滚动条 */
body {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: #0085f9;
    border-radius: 6px;
  }
}
```

## 画布网状满天星背景

```html
<svg>
  <pattern
    id="pattern-1"
    x="0"
    y="0"
    width="24"
    height="24"
    patternUnits="userSpaceOnUse"
    patternTransform="translate(-0.5,-0.5)"
  >
    <circle cx="0.5" cy="0.5" r="0.5" fill="#60606F"></circle>
  </pattern>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1)"></rect>
</svg>
```

```css
svg {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  background-color: #13121a;
}
```

<!-- ![2023-03-09-15-45-20](https://zerdocs.oss-cn-shanghai.aliyuncs.com/interview/2023-03-09-15-45-20.png) -->

## 轮播闪光

![](https://zerdocs.oss-cn-shanghai.aliyuncs.com/interview/202306052345184.gif)

```css
.shine::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(-45deg);
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  from {
    left: -200%;
  }

  to {
    left: 150%;
  }
}
```

## flex布局子元素给了高度，实际渲染确有小数点问题

```css
.parent {
  display: flex;
  flex-direction: column;
}
.child {
  height: 100%;
}
.child1 {
  flex: 1; /*  需要给相邻元素添加 */
}
```

## 屏蔽chrome浏览器默认项输入框背景色

```css
/* 屏蔽chrome浏览器默认项输入框背景色: 解决 Element-Plus 样式问题 */
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  transition: background-color 999999999s !important;
}
```
