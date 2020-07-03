// pages/albumManage/components/customCheckToast/customCheckToast.js
const util = require('../../../../utils/util.js')
const app = getApp()
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        let checkLists = []
        let only = false
        let {
          checkData
        } = this.properties
        this.properties.checkData.tabList.forEach(item => {
          checkLists.push({
            name: item.attrValueName,
            id: item.id,
            check: false
          })
        })
        if (checkData.checkIdList) {
          checkLists.forEach((res, index) => {
            if (checkData.checkIdList.indexOf(res.id) != -1) {
              res.check = true
            }
          })
        }
        if (this.properties.checkData.only) {
          only = this.properties.checkData.only
        }
        this.setData({
          title: this.properties.checkData.title,
          checkLists,
          only
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
        // setTimeout(() => {
        // this.setData({
        //   status: this.properties.letCusCheck,
        // })
        // }, 30)
      }
    }
  },
  data: {
    show: false,
    status: false,
    title: '',
    checkLists: [],
    only: false, // 默认可以复选
    getIndex: false,
    newValue: ''
  },
  methods: {
    // 加一个新标签
    addTab(e) {
      let that = this
      let {
        type
      } = e.currentTarget.dataset
      if (type != "品类") {
        util.request({
          url: 'photo/goodsAttr/add',
          data: {
            "attrId": this.properties.checkData.id,
            "attrValueName": e.detail.value,
            "storeId": app.globalData.shopInfo.storeVo.id
          }
        }).then((res) => {
          if (res.data) {
            let {
              checkLists
            } = that.data
            checkLists.push({
              name: e.detail.value,
              id: res.data.id,
              check: true
            })
            that.setData({
              checkLists,
              newValue: ''
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    },

    callBackToPage(e) {
      let back = {
        title: this.properties.checkData.title,
        id: [],
        name: []
      }
      this.data.checkLists.forEach((res) => {
        if (res.check) {
          back.name.push(res.name)
          back.id.push(res.id)
        }
      })
      this.cancel()
      this.triggerEvent('returnBack', {
        check: back
      })
    },
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
    check(e) {
      let {
        index
      } = e.currentTarget.dataset
      let {
        checkLists
      } = this.data
      if (this.data.only) {
        checkLists.forEach((res, indexa) => {
          if (indexa != index) {
            res.check = false
          }
        })
        checkLists[index].check = true
      } else {
        checkLists[index].check = !checkLists[index].check
      }
      this.setData({
        checkLists,
      })
    }
  }
})