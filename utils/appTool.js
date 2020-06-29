const config = require('../config/config.js');
// const { promises } = require('fs');

//检测是否获取到uid
const checkoutUidStatus = async function checkoutUidStatus(callback, loginStatus = true) {
    let {
        uid,
        wxp
    } = this.globalData;
    if (!uid) {
        await wx.showLoading({
            title: '加载中',
            mask: true
        })
        let timer = setInterval(() => {
            if (this.globalData.uid) {
                clearInterval(timer);
                wx.hideLoading();
                callback && callback()
            }
        }, 300)
    } else {
        callback && callback()
    }

}

// 清空缓存（待完善）
const cleanStorage = async function cleanStorage(callback) {

}

// 清空 globalData 数据
const cleanGlobalData = async function refreshGlobalData(callback) {
    wx.login({
        success: res => {
            getApp().globalData = {
                accessToken: null,
                userInfo: null,
                code: res.code,
                config: config
            }
        }
    });

}

const toLoginPage = () => {
    let page = getCurrentPages()
    let lastPage = page[page.length - 1]
    console.log(lastPage.route)
    if (lastPage.route != 'pages/login/index') return wx.reLaunch({
        url: '/pages/login/index'
    });
}

// const uploadImage =(imageList)=>{
//     return new Promise((resolve, reject) => {
        
//     })
// }

module.exports = {
    checkoutUidStatus,
    cleanStorage,
    cleanGlobalData,
    toLoginPage
}