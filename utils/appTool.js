const config = require('../config/config.js');
// const { promises } = require('fs');

// 简化弹窗
const noIconToast = (e) => {
    wx.hideLoading()
    wx.showToast({
        title: e,
        icon: 'none'
    })
}

const errorTimeOutBack = (word, index = 1) => {
    noIconToast(word)
    setTimeout(() => {
        wx.navigateBack({
            delta: index //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        });
    }, 1500)
}

const successTimeOutBack = (word, index = 1) => {
    wx.showToast({
        title: word
    })
    setTimeout(() => {
        wx.navigateBack({
            delta: index //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        });
    }, 1500)
}

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

// 检查当前页面是否需要重新载入 -- 跨页面传参
const checkNeedRefresh = async function checkNeedRefresh(callback) {
    return new Promise((res, rej) => {
        let pageStack = getCurrentPages()
        let page = pageStack[pageStack.length - 1]
        let {
            route
        } = page
        let back = false
        this.globalData.needRefresh.forEach((item, i) => {
            if (item.route == route) {
                back = item.back
                this.globalData.needRefresh.splice(i, 1)
            }
        })
        res(back)
    })
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
    if (lastPage.route != 'pages/login/index') return wx.reLaunch({
        url: '/pages/login/index'
    });
}

const navTo = (url) => {
    wx.navigateTo({
        url
    })
}

// const uploadImage =(imageList)=>{
//     return new Promise((resolve, reject) => {

//     })
// }

module.exports = {
    checkNeedRefresh,
    successTimeOutBack,
    navTo,
    checkoutUidStatus,
    cleanStorage,
    cleanGlobalData,
    toLoginPage,
    noIconToast,
    errorTimeOutBack
}