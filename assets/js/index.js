$(function () {
  getUserInfo()

  // const layer = layui.layer

  $('#btnLogout').on('click', function () {
    // console.log(222)
    layui.layer.confirm(
      '确定退出登录？',
      {
        icon: 3,
        title: '提示'
      },
      function (index) {
        // console.log(111)
        //do something
        // 清除token值
        localStorage.removeItem('token')
        // 跳回登陆页面
        location.href = '/login.html'
        layui.layer.close(index)
      }
    )
  })
})

const layer = layui.layer

// 获取个人信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    /* headers: {
      Authorization: localStorage.getItem('token') || ''
    }, */
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      // console.log(res)
      renderAvatar(res.data)
    }
    // 最终执行函数 无论成功或者失败都会执行 complete 函数
    /*     complete: function (res) {
      // console.log(res)
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 清除 token 值
        localStorage.removeItem('token')
        // 跳转回登陆页面
        location.href = '/login.html'
      }
    } */
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
