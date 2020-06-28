// components/navBarCustom/navBarCustom.js
// components/navbar/index.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 60
  },
  lifetimes: {
    attached: function () {
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop:App.globalData.navTop
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    toIndex: function () {
      wx.switchTab({
        url: '/pages/home/index'
      })
    },
  }
})