// pages/albumManage/components/customCheckToastForShare/customCheckToastForShare.js
const util = require('../../../../utils/util.js')
const app = getApp()
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        this.setData({
          title: this.properties.checkData.title,
          checkLists: this.properties.checkData.tabList,
          photoIds: this.properties.checkData.photoIds
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
  data: {
    show: false,
    status: false,
    title: '',
    checkLists: [],
    only: false, // 默认可以复选
    getIndex: false,
    newValue: '',
    photoIds: []
  },
  methods: {
    // 加一个新标签

    callBackToPage(e) {
      let back = {
        title: this.properties.checkData.title,
        id: [],
        name: []
      }
      this.data.checkLists.forEach((res) => {
        if (res.check) {
          back.name.push(res.tab)
          back.id.push(res.id)
        }
      })
      console.log(back)
      util.request({
        url: '/photo/publish',
        data: {
          labelIds: back.id,
          photoIds: this.properties.checkData.photoIds
        }
      }).then(res => {
        if (res.code)
          getApp().noIconToast('修改成功')
        else
          getApp().noIconToast('修改失败')
        this.triggerEvent('returnBack', {
          check: back
        })
        this.cancel()
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