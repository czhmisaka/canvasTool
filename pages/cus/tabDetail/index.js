// pages/cus/tabDetail/index.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {},
//   onLoad: function (options) {},
//   onReady: function () {},
//   onShow: function () {},
//   onHide: function () {},
//   onUnload: function () {},
//   onPullDownRefresh: function () {},
//   onReachBottom: function () {},
//   onShareAppMessage: function () {}
// })

// var base64 = require("../images/base64");
Page({
  onLoad: function () {
    // this.setData({
    //   slideButtons: [{
    //     text: '普通',
    //     src: '/page/weui/cell/icon_love.svg', // icon的路径
    //   }, {
    //     text: '普通',
    //     extClass: 'test',
    //     src: '/page/weui/cell/icon_star.svg', // icon的路径
    //   }, {
    //     type: 'warn',
    //     text: '警示',
    //     extClass: 'test',
    //     src: '/page/weui/cell/icon_del.svg', // icon的路径
    //   }],
    // });
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
  }
});