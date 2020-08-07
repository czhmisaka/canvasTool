const {
    config
} = require('../../config/config.js')
const util = require('../util.js')
const canConsole = true

// debug 输出
const show = function (word) {
    if (canConsole) {
        console.log(word)
    }
}

// 获取记录顺序 id
const getIdForDataWork = function () {
    return getApp().globalData.dataWorkHistory ? getApp().globalData.dataWorkHistory.length : 0
}

// 获取时间 时间戳
const getTimeForDataWork = function () {
    return new Date().getTime()
}

// 获取用户手机型号/所在地等信息
const getUserInfo_systemInfo = function () {
    return wx.getSystemInfoSync()
}

// 写入记录
const writeData = function (data) {
    if (!getApp().globalData.dataWorkHistory)
        getApp().globalData.dataWorkHistory = []
    getApp().globalData.dataWorkHistory.push(data)
    show(getApp().globalData.dataWorkHistory)
}

// 进入小程序 场景记录
const setSceneWhenMPStart = async function (options) {
    let data = {
        title: '小程序打开场景记录',
        type: 'setSceneWhenMPStart',
        upLoadTime: 0,
        time: getTimeForDataWork(),
        id: getIdForDataWork(),
        data: options,
        systemInfo: getUserInfo_systemInfo()
    }
    writeData(data)
}

// 请求记录
const setRequest = function (obj) {
    this.data = {
        title: '小程序请求记录',
        type: 'setRequest',
        upLoadTime: 0,
        startTime: getTimeForDataWork(),
        responseTime: '',
        id: getIdForDataWork(),
        data: obj,
        response: {},
        success: false
    }
    // 请求成功  -- 一般判断res.code==200    
    // res = 响应体
    this.success = function (res) {
        this.data.success = true
        this.data.response = res
        this.data.responseTime = getTimeForDataWork()
        writeData(this.data)
    }
    // 请求失败     
    // res = 响应体
    this.fail = function (res) {
        this.data.response = res
        this.data.responseTime = getTimeForDataWork()
        writeData(this.data)
    }
}

// 跳转记录
const setRoute = async function (url) {
    let data = {
        title: '小程序请求记录',
        type: 'setRequest',
        upLoadTime: 0,
        startTime: getTimeForDataWork(),
        responseTime: '',
        id: getIdForDataWork(),
        data: obj,
        response: res,
        success: false
    }
}

// 通用化记录
const setHistory = async function (obj) {

}

// 页面访问次数记录
const setPageLife = async function (obj) {

}

// 定时整理提交数据，合并同类数据等
const sortDataForUserDataWork = async function () {

}

// 上传用户记录到服务器
const upDataWork = async function () {

}



module.exports = {
    setSceneWhenMPStart,
    setRequest,
    setRoute,
    setHistory,
    setPageLife,
    sortDataForUserDataWork,
    upDataWork
}