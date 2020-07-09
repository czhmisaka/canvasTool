// pages/orderManage/components/sharePreDeal/sharePreDeal.js

const util = require("../../../../utils/util");
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderId:String,
    userId:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(e){
      if(this.properties.id)
      return new Promise((resolve,reject)=>{
        util.request({

        }).then(res=>{

        })
      })
    },
  }
})
