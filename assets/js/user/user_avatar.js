$(function () {
  const layer = layui.layer
  const $image = $('#image')
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  $image.cropper(options)

  // 选择文件功能
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    const filelist = e.target.files

    if (filelist.length === 0) return layer.msg('请选择照片')

    const newImgURL = URL.createObjectURL(filelist[0])

    $image.cropper('destroy').attr('src', newImgURL).cropper(options)
  })

  // 将裁剪后的图片上传到服务器
  $('#btnUpload').on('click', function () {
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 canvas 画布上的内容转为 base64 格式的字符串
    // 2.调用接口把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg('更换头像失败！')
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})
