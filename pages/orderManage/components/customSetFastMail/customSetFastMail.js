// pages/orderManage/components/customSetFastMail/customSetFastMail.js

const util = require('../../../../utils/util.js')
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
        this.setData({
          title: this.properties.checkData.title
        })
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
    searchWord: ''
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
    checkInFast(e) {
      let {
        item
      } = e.currentTarget.dataset
      let back = this.data
      back = {
        expressName: item.name,
        expressCode: item.code,
        code: back.code,
        orderExpressId: item.id,
      }
      this.cancelFast()
      this.setData({
        back: back
      })
    },
    // 搜索快递 相关



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
      this.cancel()
      this.triggerEvent('returnFastMsg', {
        back: this.data.back
      })
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