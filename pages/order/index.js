// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      '全部',
      '待接单',
      '已接单',
      '已完成',
      '已取消'
    ],
    selectType: 0,
    orderList:[]
  },
  switchSubtitle(e) {
    var that = this
    if (e.currentTarget) {
     e  = e.currentTarget.dataset.index
    }
    let node = wx.createSelectorQuery()
    node.selectAll('.type').boundingClientRect()
    node.exec((res) => {
      let selectType = {
        index: e,
        len: that.data.typeList[e].length,
        left: res[0][e].left
      }
      this.setData({
        selectType: selectType
      })
    })
  },
  initOrderList(){
    let orderList = []
    this.data.typeList.forEach((res)=>{
      orderList.push()
    })
    this.setData({
      orderList
    })
  },
  initFn() {
    this.switchSubtitle(0)
    this.initOrderList()
  },


  onLoad: function (options) {
    this.initFn()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})