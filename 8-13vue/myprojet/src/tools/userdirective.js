// 创建聚焦自定义指令 使用方式 v-focus
export const focus = {
  inserted: function (el) {
    el.focus()
  }
}
// 创建字体颜色自定义指令 使用方式 v-color="颜色值"
export const color = {
  inserted: function (el, binding) {
    el.style.color = binding.value
  }
}
