$(function () {
  getUserInfo()
})

const layer = layui.layer

// 获取个人信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      console.log(res)
      renderAvatar(res.data)
    }
  })
}

// 将个人信息渲染到页面上
function renderAvatar(user) {
  // 1. 获取用户名
  // 优先获取渲染昵称 没有昵称则获取渲染用户注册名
  let name = user.nickname || user.username
  // 1.1 设置欢迎文本
  $('#welcome').html('欢迎&nbsp;' + name)
  // 2. 渲染用户头像
  // 判断用户是否设置头像
  // 如果有设置头像 则渲染用户的头像 关闭文本框
  //如果没有设置头像 则关闭头像 将用户名的首字母大写渲染成头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
