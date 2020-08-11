const {
    config
} = require('../../config/config.js')
const util = require('../util.js')
//// 可用于记录 请求数据/页面访问数据/页面访问情况数据

/// 一些配置项

// 控制台输出/调试用
const canConsole = true
// 是否保存信息到缓存中（防止漏上传等）
const canSaveHistory = true
// 绑定事件列表
const eventList = {
    pageRoute: true,
    request: true
}
// 全事件触发记录（这个可能会造成一些内存上的问题，应为记录很频繁）
const allEvent = true
/// 一些配置项

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
    data.accessToken = getApp().globalData.accessToken
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
    let self = new Object
    self.data = {
        title: '小程序请求记录',
        type: 'setRequest',
        upLoadTime: 0,
        startTime: getTimeForDataWork(),
        responseTime: '',
        useTime: '',
        id: getIdForDataWork(),
        data: obj,
        response: {},
        success: false
    }
    // 请求成功  -- 一般判断res.code==200    
    // res = 响应体
    self.success = function success(res) {
        if (!eventList.request) return 0
        self.data.success = true
        self.data.response = res
        self.data.responseTime = getTimeForDataWork()
        self.data.useTime = self.data.responseTime - self.data.startTime
        writeData(self.data)
    }
    // 请求失败     
    // res = 响应体
    self.fail = function fail(res) {
        if (!eventList.request) return 0
        self.data.response = res
        self.data.responseTime = getTimeForDataWork()
        self.data.useTime = self.data.responseTime - self.data.startTime
        writeData(self.data)
    }
    return self
}

// 跳转记录
const setRoute = function (url) {
    let baseUrl, query;
    baseUrl = url.split('?')[0]
    query = url.split('?')[1]
    let data = {
        title: '小程序跳转记录',
        type: 'setRoute',
        upLoadTime: 0,
        startTime: getTimeForDataWork(),
        id: getIdForDataWork(),
        fromUrl: getNowPage().route,
        url: baseUrl,
        query,
        success: false
    }
    writeData(data)
}

// 页面 生命周期记录
const setPageLife = function () {
    let self = new Object
    let pageStock = getCurrentPages()
    let page = pageStock[pageStock.length - 1]
    let id = setPageVisitTime(page)
    setAllEvent(page)
    let isClose = false
    self.data = {
        title: '页面访问时间记录',
        type: 'setPageLife',
        upLoadTime: 0,
        startTime: getTimeForDataWork(),
        closeTime: '',
        useTime: '',
        id: getIdForDataWork(),
        url: page.route,
        query: ''
    }
    self.closePage = function () {
        if (isClose) return
        isClose = true
        self.data.closeTime = getTimeForDataWork()
        self.data.useTime = self.data.closeTime - self.data.startTime
        setPageVisitTime(page, id)
        if (!eventList.pageRoute) return
        writeData(self.data)
    }
    self.onHide = page.onHide
    self.onUnload = page.onUnload
    page.onHide = function () {
        self.closePage()
        self.onHide()
    }
    page.onUnload = function () {
        self.closePage()
        self.onUnload()
    }
}

// 通用化记录
const setNormal = async function (obj) {
    let data = {
        title: obj.title || '',
        type: obj.type || '',
        startTime: getTimeForDataWork(),
        id: getIdForDataWork(),
        url: page.route,
        query: '',
        obj: obj.data
    }
    writeData(data)
}

// 全页面内函数使用记录
const setAllEvent = function (page) {
    // return 0
    // let self = new Object 
    // let self = page
    for (let item in page) {
        if (item[0] != '_' && (typeof page[item] === 'function')) {
            console.log(page[item].arguments,456)
            page[item] = function(){
                page[item]
                console.log('asd',item)
            }
        }
    }
    // for (let item in page) {
    //     page[item] = self[item]
    // }
    // page.bindEventBack = (item) => {
    //     console.log(item)
    // }
    // return self
}

const bindMethod = function (func, ) {
    // return 
}

// 获取用户系统信息
const setUserPhoneInfo = function () {
    
}

// 页面访问次数记录
const setPageVisitTime = function (page, id = "") {
    if (!getApp().globalData.dataWorkPageVisitList)
        getApp().globalData.dataWorkPageVisitList = []
    let dataWorkPageVisitList = getApp().globalData.dataWorkPageVisitList
    let needAdd = true
    dataWorkPageVisitList.forEach((item) => {
        if (item.path == page.route && !id) {
            needAdd = false
            item.times = item.times + 1
            item.visitDataList.push({
                data: page.options,
                id: item.times,
                startTime: getTimeForDataWork(),
                endTime: ''
            })
            id = item.times
        } else if (item.path == page.route && id) {
            needAdd = false
            item.visitDataList.forEach((res, index) => {
                if (res.id == id) {
                    item.visitDataList[index].endTime = getTimeForDataWork()
                }
            })
        }
    })
    if (needAdd) {
        dataWorkPageVisitList.push({
            accessToken: getApp().globalData.accessToken,
            path: page.route,
            times: 1,
            visitDataList: [{
                data: page.options,
                id: 1,
                startTime: getTimeForDataWork(),
                endTime: ''
            }]
        })
        id = 1
    }
    getApp().globalData.dataWorkPageVisitList = dataWorkPageVisitList
    show(getApp().globalData.dataWorkPageVisitList)
    return id
}

// 定时整理提交数据，合并同类数据等 -- 目前看来好像不需要了，直接在记录的时候整合就好
const sortDataForUserDataWork = async function () {

}

// 上传用户记录到服务器
const upDataWork = async function () {

}

// 记录数据到缓存
const setDataToStorage = async function () {

}

// 获得当前页面的页面栈
const getNowPage = function () {
    let pageStock = getCurrentPages()
    let page = pageStock[pageStock.length - 1]
    return page
}

module.exports = {
    setSceneWhenMPStart,
    setRequest,
    setRoute,
    setPageVisitTime,
    setNormal,
    setPageLife,
    sortDataForUserDataWork,
    upDataWork
}