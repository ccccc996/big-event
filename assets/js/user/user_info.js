$(function () {
  const layer = layui.layer
  const form = layui.form

  // 昵称判断
  form.verify({
    nickname: function (value) {
      if (value > 6) return '昵称必须在1~6个字符之间'
    }
  })

  initUserInfo()
  // 初始化页面
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取用户信息失败!')
        // layui 提供的内置方法 form.val(filter, object)
        // 将object里面的值渲染到 filter 表单中
        form.val('userInfo', res.data)
      }
    })
  }

  // 重置按钮
  $('#btnReset').on('click', function (e) {
    // 取消默认行为
    e.preventDefault()
    // 重新初始化页面
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新用户信息失败！')
        layer.msg('更新用户信息成功！')
        // 调用父页面的方法 重新渲染(昵称优先于登陆名)
        window.parent.getUserInfo()
      }
    })
  })
})
