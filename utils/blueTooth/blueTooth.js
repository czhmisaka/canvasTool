const {
    config
} = require('../config/config.js')
const app = getApp()

// 检查蓝牙环境
const checkEnvForBlueTooth = function checkEnvForBlueTooth() {
    return new Promise((res, rej) => {
        wx.openBluetoothAdapter({
            success(res) {
                console.log(res)
            }
        })
    })
}


module.exports = {
    checkEnvForBlueTooth,
}