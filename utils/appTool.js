const {
    config
} = require('../config/config.js');
const util = require('./util.js');

// 简化弹窗
const noIconToast = (e, type = "none") => {
    wx.hideLoading()
    wx.showToast({
        title: e,
        icon: type
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

// 双重确认
const showModal = (content, title = "") => {
    return new Promise((res, rej) => {
        wx.showModal({
            title,
            content,
            success: (result) => {
                if (result.confirm) {
                    res(true)
                } else {
                    res(false)
                }
            }
        })
    })
}

// 获取 图片拼接地址
const getCdnEnv = () => {
    return config.cdn
}

// 获取快递信息
const getAllFastMailMsg = (needRefresh = false) => {
    return new Promise((res, rej) => {
        if (getApp().globalData.AllFastMailMsg && getApp().globalData.AllFastMailMsg.length > 1 && !needRefresh) {
            return res(getApp().globalData.AllFastMailMsg)
        } else {
            util.request({
                url: 'order/express',
                method: 'get'
            }).then((result) => {
                getApp().globalData.AllFastMailMsg = result.data
                res(result.data)
            })
        }
    })
}

// 回到首页
const toHomePage = function () {
    wx.reLaunch({
        url: '/pages/home/index'
    })
}

// 确定 this.globalData.onShowOptions 的返回
const getQuery = (e) => {
    return new Promise((res, rej) => {
        let lock = 0
        let clock = setInterval(() => {
            if (getApp().globalData.onShowOptions) {
                res(getApp().globalData.onShowOptions)
                getApp().globalData.onShowOptions = null
                clearInterval(clock)
            } else if (lock > 20) {
                res("null")
                clearInterval(clock)
            } else {
                lock++
            }
        }, 100)
    })
}

const getKeyFromGlobalData = (key) => {
    return new Promise((res, rej) => {
        let lock = 0
        let clock = setInterval(() => {
            if (getApp().globalData && getApp().globalData[key]) {
                res(getApp().globalData[key])
                wx.hideLoading()
                clearInterval(clock)
            } else if (lock > 20) {
                wx.hideLoading()
                res("null")
                clearInterval(clock)
            } else {
                lock++
            }
        }, 100)
    })
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
        let back = false
        if (!this.globalData.needRefresh || this.globalData.needRefresh.length == 0) {
            back = false
        } else {
            this.globalData.needRefresh.forEach((item, i) => {
                if (item.route == page.route) {
                    back = item.back
                    this.globalData.needRefresh.splice(i, 1)
                }
            })
        }
        res(back)
    })
}

// 跨页面传参 辅助添加函数
const setNeedRefresh = async function (route, back) {
    if (this.globalData.needRefresh) this.globalData.needRefresh.push({
        route,
        back
    })
    else {
        this.globalData.needRefresh = []
        this.globalData.needRefresh.push({
            route,
            back
        })
    }
}

// 获取搜索历史记录 Ps:相册/订单
const getSearchHistoryStorage = async function getSearchHistoryStorage(type) {
    if (type) {
        return wx.getStorageSync(type)
    }
}

// 添加历史记录
const setSearchHistoryStorage = async function setSearchHistoryStorage(type, history = []) {
    if (type) {
        wx.setStorageSync(type, history)
    }
}

// 清空搜索历史记录 Ps
const cleanSearchHistoryStorage = async function cleanSearchHistoryStorage(type) {
    if (type) {
        wx.setStorageSync(type, [])
    }
}

// 清空缓存（待完善）
const cleanStorage = function cleanStorage() {
    wx.removeStorageSync('globalData')
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

// 获取登录 code
const getWxCode = () => {
    return new Promise((res, rej) => {
        wx.login({
            success: code => {
                res(code)
            },
            fail: code => {
                rej(code)
            }
        })
    })
}

// 去登录页面 --- 会清空登录数据
const toLoginPage = (fromPage) => {
    let page = getCurrentPages()
    let lastPage = page[page.length - 1]
    fromPage = fromPage || '/pages/home/index'
    fromPage = fromPage.toString().replace(/[\#=]/g, ':').replace(/[\#?]/g, '@').replace(/[\#&]/g, '##')
    if (lastPage.route != 'pages/login/index') return wx.reLaunch({
        url: '/pages/login/index?fromPage=' + fromPage
    });
}


// 通用跳转函数
const navTo = (url) => {
    getApp().setRoute(url)
    wx.navigateTo({
        url
    })
}


// 对比修改痕迹
function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true); //默认为true
}

function CompareObj(objA, objB, flag) {
    for (var key in objA) {
        if (!flag) //跳出整个循环
            break;
        if (!objB.hasOwnProperty(key)) {
            flag = false;
            break;
        }
        if (!isArray(objA[key])) { //子级不是数组时,比较属性值
            if (objB[key] != objA[key]) {
                flag = false;
                break;
            }
        } else {
            if (!isArray(objB[key])) {
                flag = false;
                break;
            }
            var oA = objA[key],
                oB = objB[key];
            if (oA.length != oB.length) {
                flag = false;
                break;
            }
            for (var k in oA) {
                if (!flag) //这里跳出循环是为了不让递归继续
                    break;
                flag = CompareObj(oA[k], oB[k], flag);
            }
        }
    }
    return flag;
}

function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    var count = 0;
    for (var i in object) count++;
    return count;
}

module.exports = {
    Compare,
    getWxCode,
    getCdnEnv,
    toHomePage,
    setSearchHistoryStorage,
    cleanSearchHistoryStorage,
    getSearchHistoryStorage,
    showModal,
    getAllFastMailMsg,
    setNeedRefresh,
    checkNeedRefresh,
    successTimeOutBack,
    navTo,
    checkoutUidStatus,
    cleanStorage,
    cleanGlobalData,
    toLoginPage,
    noIconToast,
    errorTimeOutBack,
    getQuery,
    getKeyFromGlobalData
}