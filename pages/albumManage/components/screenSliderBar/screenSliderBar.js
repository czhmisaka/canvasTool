// pages/albumManage/components/screenSliderBar/screenSliderBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkData: {
      type: Object,
      value: [],
      observer: function (e) {
        this.setData({
          tabCheckList: this.properties.checkData
        })
      }
    },
    checkStatus: {
      type: Boolean,
      value: false,
      observer: function (e) {
        setTimeout(() => {
          this.setData({
            ani: !this.properties.checkStatus
          })
        }, 10);
      }
    }
  },

  data: {
    tabCheckList: [{
      title: '对谁可见',
      tabList: [{
        tab: '所有人可见',
        check: true
      }, {
        tab: '一个稍微有点长的标签',
        check: false
      }, {
        tab: '人可见',
        check: false
      }, {
        tab: '有可见',
        check: true
      }]
    }, {
      title: '品类',
      tabList: [{
        tab: '所有人可见',
        check: true
      }, {
        tab: '所可见skahfisdiufeuifuiewbfebfuie',
        check: false
      }, {
        tab: '人可见',
        check: false
      }, {
        tab: '有可见',
        check: true
      }]
    }],
    ani: true
  },

  methods: {

    // 确认后 开始筛选事件
    callBackToPage(e) {
      this.cancel()
      this.triggerEvent('returnBack', {
        check: this.data.tabCheckList,
        start: true
      })
    },

    // 清空选择
    reset(e) {
      let {
        checkData
      } = this.properties
      let num = 0
      checkData.forEach((item) => {
        item.tabList.forEach((tab) => {
          if (tab.check) num++
          tab.check = false
        })
      })
      if (num == 0) wx.showToast({
        title: '您还未选择',
        icon: 'none'
      })
      this.setData({
        tabCheckList: checkData
      })
    },

    // 退出事件
    cancel(e) {
      this.setData({
        ani: true
      })
      this.triggerEvent('returnBack', {
        check: this.data.tabCheckList,
        start: false
      })
      setTimeout(() => {
        this.triggerEvent('cancel', {
          type: false
        })
      }, 230)

    },

    // 选择标签事件
    changeCheck(e) {
      let {
        tabCheckList
      } = this.data;
      let {
        index,
        listindex
      } = e.currentTarget.dataset
      tabCheckList[listindex].tabList[index].check = !tabCheckList[listindex].tabList[index].check
      this.setData({
        tabCheckList
      })
    },
  }
})