const util = require("../../../../utils/util")

// pages/albumManage/components/customCheckToastForPrice/customCheckToast.js
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        let checkLists = []
        let priceList = []
        if (this.properties.checkData.goodsPriceAddDtos && this.properties.checkData.goodsPriceAddDtos.length > 0) {
          this.properties.checkData.goodsPriceAddDtos.forEach(res => {
            priceList.push({
              num: res.favorableNum,
              price: res.goodsPrice
            })
          })
          this.setData({
            priceList
          })
        }
        if (!this.data.priceList) {
          checkLists = this.properties.checkData.tabList
          this.setData({
            title: this.properties.checkData.title,
            checkLists,
          })
        }
        if (this.properties.checkData.isNew) {
          this.setData({
            isNew: this.properties.checkData.isNew
          })
        }
        if (this.properties.checkData.type == true) {
          this.setData({
            select: 1
          })
        } else {
          this.setData({
            select: 0
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
  data: {
    show: false,
    status: false,
    title: '',
    checkLists: [],
    select: 0, //默认 一口价
    price: '',
    priceList: [],
    isNew: false // 是否为 查看状态
  },
  methods: {

    // 回传页面回调
    callBackToPage(e) {
      let back = {
        title: this.properties.checkData.title,
        goodsPriceAddDtos: []
      }
      let key = true
      if (this.data.select == 0) {
        back.goodsPriceAddDtos.push({
          goodsPrice: this.data.price,
          favorableNum: 0
        })
      } else if (this.data.select == 1) {
        this.data.priceList.forEach((res, index) => {
          if (index > 0) {
            if (res.num <= this.data.priceList[index - 1].num) {
              key = false
            }
          }
          back.goodsPriceAddDtos.push({
            favorableNum: res.num,
            goodsPrice: res.price
          })
        })
      }
      if (key == false) return wx.showToast({
        title: '数量设置有误',
        icon: 'none'
      })
      this.cancel()
      this.triggerEvent('returnBack', {
        check: back
      })
    },

    // 退出
    cancel(e) {
      this.triggerEvent('cancel', {
        type: false
      })
    },

    // 添加定价方式
    addToPriceList(e) {
      let {
        priceList
      } = this.data
      priceList.push({
        num: priceList[priceList.length - 1] ? priceList[priceList.length - 1].num + 1 : 0,
        price: 0
      })
      this.setData({
        priceList,
        select: 1
      })
    },

    // 去除定价方式
    remove(e) {
      let {
        index
      } = e.currentTarget.dataset
      let {
        priceList
      } = this.data
      priceList.splice(index, 1)
      this.setData({
        priceList
      })
    },

    // 修改定价方式
    changeSelect(e) {
      let {
        select
      } = e.currentTarget.dataset
      this.setData({
        select
      })
    },

    // 输入绑定
    bindInput(e) {
      let {
        type,
        index
      } = e.currentTarget.dataset
      let {
        priceList,
      } = this.data
      let {
        value
      } = e.detail
      if (type == '一口价') {
        if (this.data.select != 0) {
          this.setData({
            select: 0
          })
        }
        let price = util.checkFloat(value)
        this.setData({
          price: price
        })
      } else if (type == 'num') {
        value = util.validateNumber(value)
        value = value.split('.')[0] * 1
        if (value == 0) {
          wx.showToast({
            title: '最低为一件',
            icon: 'none',
          });
          priceList[index][type] = ''
          this.setData({
            priceList
          })
        } else {
          priceList[index][type] = value
          this.setData({
            priceList
          })
        }
      } else if (type == 'price') {
        priceList[index][type] = util.checkFloat(value)
        this.setData({
          price: '',
          priceList
        })
      }
    }
  }
})