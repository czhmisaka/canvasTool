// pages/albumManage/components/customCheckToast/customCheckToast.js
Component({
  properties: {
    checkData: {
      type: Object,
      observer: function (e) {
        this.setData({
          title: this.properties.checkData.title,
          checkLists: this.properties.checkData.checkLists
        })
      }
    },
    letCusCheck: {
      value: false,
      type: Boolean,
      observer: function (e) {
        this.setData({
          status: this.properties.letCusCheck
        })
      }
    }
  },
  data: {
    title: '',
    checkLists: [],
    status: false
  },
  methods: {
    
  }
})