const utils = require('../../utils/util.js')
const app = getApp()
// components/photoFall/photoFall.js
let index = 0
let page = 1
let open = true
let finish = true
let isLeft = true
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      value: '',
      type: String,
      observer: function () {
        var that = this
        that.refresh()
      }
    }
  },

  lifetimes: {
    attached: function () {},
    detached: function () {},
  },
  /**
   * 组件的初始数据
   */
  data: {
    leftLine: [],
    rightLine: [],
    line: [],
    data: [],
    shareId: '' // 分享用的哈
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 刷新
    refresh: function () {
      page = 0
      finish = true
      open = true
      this.getPhotoList(0,true)
      console.log('asd')
    },
    // 去添加新相册
    toAdd: function () {
      if (!app.globalData.isLogin) return utils.toLogin()
      app.navTo('/pages/albumManage/newAlbum/index');
    },

    // 分享用 回调函数
    returnBack: function (e) {
      this.triggerEvent('returnBack', {
        back: e.detail.back
      })
    },
    // 下拉加载预置
    getMore: function () {
      if (!finish) return wx.showToast({
        title: '再滑也没有啦！',
        icon: 'none',
        duration: 1000,
        mask: false,
      });
      page++
      this.getPhotoList(page)
    },
    // 数据获取
    getPhotoList: function (num, isRefresh = false) {
      if (!open) return;
      if (!finish) return;
      getApp().getKeyFromGlobalData('shopInfo').then((shopInfo) => {
        // if(shopInfo==='null') return getApp().noIconToast('未能获取店铺信息')
        if(shopInfo == 'null') return 0;
        open = false
        utils.request({
          url: '/photo/list',
          data: {
            storeId: shopInfo.storeVo.id,
            pageNum: num,
            pageSize: 12
          }
        }).then((res) => {
          if (isRefresh) {
            this.setData({
              leftLine: [],
              rightLine: [],
              line: [],
              data: [],
            })
            index = 0
            page = 1
            open = true
            finish = true
          }
          if (res.code != 200) return getApp().noIconToast(res.msg)
          if (res.data.pages === page)
            finish = false
          page++
          let {
            data
          } = this.data
          res.data.data.forEach(item => {
            data.push(item)
          })
          this.setData({
            data: data
          })
          this.compareAndFix()
        })
      })
    },
    // 比对左右高度并填充数据
    compareAndFix: function (e) {
      var that = this
      let {
        data,
        leftLine,
        rightLine
      } = that.data
      if (data.length <= index) return open = true;
      var query = that.createSelectorQuery();
      query.select('#l').boundingClientRect()
      query.select('#r').boundingClientRect()
      query.exec(function (res) {
        if (res[0].height < res[1].height) {
          leftLine.push(data[index])
          isLeft = true
        }else if(!isLeft){
          leftLine.push(data[index])
          isLeft = true
        } else {
          rightLine.push(data[index])
          isLeft = false
        }
        index++;
        that.setData({
          leftLine,
          rightLine
        })
        setTimeout(() => {
          that.compareAndFix()
        }, 200)
      })
    }
  }
})