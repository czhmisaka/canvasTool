// pages/albumManage/findGoods/GoodsDetail/index.js
const app = getApp()
const util = require('../../../../utils/util.js');
Page({
  data: {
    goodsId: '',
    goodsDetail: {},
    noChoice: '请选择',
    size: '',
    color: '',
    new: false, // 判断是否为新建货物/如果不是新建话就无法编辑（2020 6 30 记录）
    checkStatus: false,
    checkData: { // 自定义选择器的相关数据
      title: '请选择',
      checkLists: []
    }
  },

  // 输入绑定-货号
  inputType(e) {
    let {
      goodsDetail
    } = this.data
    goodsDetail.goodsSerial = e.currentTarget.value
    this.setData({
      goodsDetail
    })
  },

  // id查询商品数据
  getGoodsDetailById(id) {
    return new Promise((resolve, reject) => {
      util.request({
        url: 'photo/goods/getGoodsDetail',
        data: {
          id
        }
      }).then((res) => {
        if (res.code === 200) {
          this.goodDetailInitFn(res.data)
          this.setData({
            goodsDetail: res.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          });
        }
      })
    })
  },

  // 处理商品数据
  goodDetailInitFn(data) {
    let {
      goodsSpecVos
    } = data
    let size = '',
      color = '';
    goodsSpecVos.forEach(res => {
      let {
        goodsSpecAttrVos
      } = res
      goodsSpecAttrVos.forEach(item => {
        switch (item.goodsAttrName) {
          case '颜色':
            if (size.length != 0) {
              size += '/'
            }
            size += item.goodsAttrValueName
            break;
          case '尺码':
            if (color.length != 0) {
              color += '/'
            }
            color += item.goodsAttrValueName
            break;
        }
      })
    })
    this.setData({
      size,
      color
    })
  },

  // 通用跳转
  navTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },

  // 获取选择项
  setCheck(e) {

  },

  // 调起自定义选择
  letCusCheck(e) {
    this.setData({
      checkStatus: true,
      checkData: { 
        title: '请选择',
        checkLists: ['123','234','2345']
      }
    })
  },

  onLoad: function (options) {
    this.letCusCheck()
    if (options.id) {
      this.getGoodsDetailById(options.id)
    } else {
      this.setData({
        new: true
      })
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onReachBottom: function () {}
})