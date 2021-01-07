$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url

  // 封装请求头 判断请求路径里面是否带有 /my/ 有的话就加上 token 值
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 封装最终执行函数
  options.complete = function (res) {
    // console.log(res)
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 清除 token 值
      localStorage.removeItem('token')
      // 跳转回登陆页面
      location.href = '/login.html'
    }
  }
})
