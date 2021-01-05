$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 引用layUI内置方法
  const form = layui.form
  const layer = layui.layer

  // 引用layUI内置方法 写判断密码的条件
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      const pwd = $('.reg-box [name=password]').val()
      // 这里直接 return 不用 layer.msg 表单验证自带样式
      if (pwd !== value) return '两次密码不一致'
    }
  })

  // 注册
  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    // const username = $('.reg-box [name=username]').val()
    // const password = $('.reg-box [name=password]').val()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        console.log(res)
        layer.msg('注册成功，请登录')
        $('#link_login').click()
      }
    })
  })

  // 登录
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    // 这里用变量接受数据之后，data传输数据的时候不需要用{}
    // 等价于 data：$(this).serialize()
    const fd = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: fd,
      success: function (res) {
        if (res.status !== 0) {
          console.log(res)
          return layer.msg('登陆失败')
        }
        layer.msg('登录成功')
        // 存储 token 值
        localStorage.setItem('token', res.token)
        //登录成功后跳转主页面
        location.href = '/index.html'
      }
    })
  })
})
