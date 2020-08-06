// pages/orderManage/components/customSetFastMail/customSetFastMail.js

const util = require('../../../../utils/util.js')
const {
  WxApiRoot
} = require('../../../../config/api.js')
const app = getApp()
let reduceLock = false
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        let {
          checkData
        } = this.properties
        if (checkData.notNew == true) {
          this.setData({
            back: this.properties.checkData.fastMail,
            title: this.properties.checkData.title,
            notNew: true
          })
        } else {
          this.setData({
            title: this.properties.checkData.title,
            notNew: false,
            back: {
              expressName: '',
              expressCode: '',
              code: '',
              orderExpressId: '',
            }
          })
        }
      }
    },
    letCusCheck: {
      value: false,
      type: Boolean,
      observer: function (e) {
        this.setData({
          show: this.properties.letCusCheck,
          status: this.properties.letCusCheck
        })
      }
    }
  },
  lifetimes: {
    attached: function () {
      this.getAllFastMailMsg()
    }
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    this.getAllFastMailMsg()
  },
  data: {
    show: false,
    status: false,
    title: '',
    fastMailMsgList: [],
    back: {
      expressName: '',
      expressCode: '',
      code: '',
      orderExpressId: '',
    },
    searchList: [],
    searchWord: '',
    notNew: false
  },
  methods: {
    // 搜索快递 相关
    openFastMail(e) {
      this.setData({
        showFastMail: true
      })
    },
    cancelFast(e) {
      this.setData({
        showFastMail: false
      })
    },
    bindFastMail(e) {
      reduceLock = false
      let {
        value
      } = e.detail
      this.setData({
        searchWord: value,
      })
      setTimeout(() => {
        reduceLock = true
      }, 20)
      setTimeout(() => {
        this.reduceFn()
      }, 50)
    },
    reduceFn() {
      if (!reduceLock) return
      let searchList = []
      this.data.fastMailMsgList.forEach((res) => {
        if (res.name.indexOf(this.data.searchWord) != -1) {
          searchList.push(res)
        }
      })
      this.setData({
        searchList
      })
      reduceLock = false
    },

    // 回传数据
    checkInFast(e) {
      let {
        item
      } = e.currentTarget.dataset
      let {
        back
      } = this.data
      back = {
        expressName: item.name,
        expressCode: item.code,
        code: back.code,
        orderExpressId: this.properties.checkData.fastMail ? this.properties.checkData.fastMail.orderExpressId : '',
      }
      this.cancelFast()
      this.setData({
        back
      })
    },
    // 搜索快递 相关

    // 唤起摄像头录入
    scanCodeForMail() {
      let that = this
      wx.scanCode({
        scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
        success: function (res) {
          if (res.result) {
            let {
              back
            } = that.data
            back.code = res.result
            that.setData({
              back
            })
          }
        }
      })
    },

    // 绑定输入
    bindInput(e) {
      let {
        back
      } = this.data
      back.code = e.detail.value
      this.setData({
        back
      })
    },

    // 获取所有快递数据
    getAllFastMailMsg(e) {
      app.getAllFastMailMsg(true).then((res) => {
        this.setData({
          fastMailMsgList: res,
          searchList: res
        })
      })
    },

    // 唤起页面回调
    callBackToPage(e) {
      this.triggerEvent('returnFastMsg', {
        back: this.data.back,
        type: this.data.type
      })
      this.cancel()
    },

    // 删除
    delete() {
      this.triggerEvent('delete', {
        back: this.data.back.orderExpressId,
        type: false
      })
      this.cancel()
    },

    // 关闭组件
    cancel(e) {
      this.triggerEvent('cancel', {
        type: false
      })
      this.setData({
        status: false
      })
      setTimeout(() => {
        this.setData({
          show: false
        })
      }, 200)
    },
  }
})