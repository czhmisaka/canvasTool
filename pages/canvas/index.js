// /pages/canvas/index
const util = require('../../utils/util.js')
const app = getApp()
let cropper = null;
Page({
  data: {
    id: '',
    type: '',
    show: true,
  },

  onLoad(options) {
    let {
      id,
      type
    } = options
    this.setData({
      id,
      type
    })
  },

  formatImage(e) {
    this.getImage(e).then((res) => {
      let cropper = this.selectComponent('#cropper');
      cropper.fnInit({
        imagePath: res.tempFilePaths[0], //*必填
        debug: true, //可选。是否启用调试，默认值为false。true：打印过程日志；false：关闭过程日志
        outputFileType: 'png', //可选。目标文件的类型。默认值为jpg，jpg：输出jpg格式图片；png：输出png格式图片
        quality: 1, //可选。图片的质量。默认值为1，即最高质量。目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
        aspectRatio: 1, //可选。裁剪的宽高比，默认null，即不限制剪裁宽高比。aspectRatio需大于0
        minBoxWidthRatio: 0.2, //可选。最小剪裁尺寸与原图尺寸的比率，默认0.15，即宽度最小剪裁到原图的0.15宽。
        minBoxHeightRatio: 0.2, //可选。同minBoxWidthRatio，当设置aspectRatio时，minBoxHeight值设置无效。minBoxHeight值由minBoxWidth 和 aspectRatio自动计算得到。
        initialBoxWidthRatio: 0.6, //可选。剪裁框初始大小比率。默认值0.6，即剪裁框默认宽度为图片宽度的0.6倍。
        initialBoxHeightRatio: 0.6 //可选。同initialBoxWidthRatio，当设置aspectRatio时，initialBoxHeightRatio值设置无效。initialBoxHeightRatio值由initialBoxWidthRatio 和 aspectRatio自动计算得到。
      });
    })
  },

  getImage(e) {
    return new Promise((reslove, reject) => {
      wx.chooseImage({
        count: 1,
        success: function (res) {
          reslove(res)
        }
      })
    })
  }
})