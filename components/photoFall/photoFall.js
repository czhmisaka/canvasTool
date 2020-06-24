const utils = require('../../utils/util.js')
// components/photoFall/photoFall.js
let index = 0
let page = 1
let open = true
let finish = true
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      value: '',
      type: String,
      observer: function () {
        console.log(index, 'a', new Date().getTime())
        let that = this
        that.getPhotoList()
      }
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    leftLine: [],
    rightLine: [],
    line: [],
    data: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMore: function () {
      if (!finish) return wx.showToast({
        title: '再滑也没有啦！',
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      this.getPhotoList(++page)
    },
    getPhotoList: function (num = 0) {
      if (!open) return;
      if (!finish) return;
      open = false
      if (this.properties.storeId) {
        utils.request({
          url: '/photo/list',
          data: {
            storeId: this.properties.storeId,
            pageNum: num,
            pageSize: 4
          }
        }).then((res) => {
          if (res.data.pages === page)
            finish = false
          let {
            data
          } = this.data
          res.data.data.forEach(item => {
            data.push(item)
          })
          this.setData({
            data: data
          })
          setTimeout(() => {
            this.compareAndFix()
          }, 10)
        })
      }
    },
    // calcHeight: function (data) {
    //   let leftLine = [],
    //     rightLine = []
    //   data.forEach((item, index) => {
    //     if (this.compareAndFix()) {
    //       leftLine.push(item)
    //     } else {
    //       rightLine.push(item)
    //     }
    //   })
    //   this.setData({
    //     leftLine,
    //     rightLine
    //   })
    // },
    compareAndFix: function (e) {
      // console.log(index, 'a', new Date().getTime())
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
        // console.log(index, res[0].height, res[1].height, res[0].height < res[1].height ? '左' : '右')
        if (res[0].height < res[1].height) {
          leftLine.push(data[index])
        } else {
          rightLine.push(data[index])
        }
        index++;
        that.setData({
          leftLine,
          rightLine
        })
        that.compareAndFix()
      })
    }
  }
})