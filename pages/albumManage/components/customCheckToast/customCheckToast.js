// pages/albumManage/components/customCheckToast/customCheckToast.js
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        let checkLists = []
        this.properties.checkData.tabList.forEach(item => {
          checkLists.push({
            name: item.attrValueName,
            id: item.id,
            storeId: item.storeId,
            check: false
          })
        })
        this.setData({
          title: this.properties.checkData.title,
          checkLists
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
    back: {
      list: [],
      name: [],
    }
  },
  methods: {
    callBackToPage(e) {
      this.cancel()
      this.triggerEvent('returnBack', {
        check: this.data.back
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
        checkLists,
        back
      } = this.data
      checkLists[index].check = !checkLists[index].check
      back.list.push(index)
      back.name.push(checkLists[index].name)
      this.setData({
        checkLists,
        back
      })
    }
  }
})