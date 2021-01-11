$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      const pwd = $('[name=oldPwd]').val()
      // 这里直接 return 不用 layer.msg 表单验证自带样式
      if (value === pwd) return '新旧密码不能相同'
    },
    rePwd: function (value) {
      const pwd = $('[name=newPwd]').val()
      if (pwd !== value) return '两次密码不一致'
    }
  })

  // 修改密码和重置页面功能
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新密码失败')
        layer.msg('更新密码成功！')
        // 重置功能
        // 使用 [0] 调用 js 方法
        $('.layui-form')[0].reset()
      }
    })
  })
})
