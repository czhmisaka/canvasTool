// pages/albumManage/components/customCheckToastForPrice/customCheckToast.js
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        let checkLists = []
        checkLists = this.properties.checkData.tabList
        this.setData({
          title: this.properties.checkData.title,
          checkLists,
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
    select: 0, //默认 一口价
    price: '',
    priceList: [
      {price:122,num:123}
    ]
  },
  methods: {
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
    },

    // 添加定价方式
    addToPriceList(e){
      let {priceList} = this.data
      priceList.push({
        num:0,
        price:0
      })
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
  }
})