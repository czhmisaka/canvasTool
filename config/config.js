const config = () => {
    let testMode
    try {
        testMode = require('./test_mode.js')
    } catch (err) {}

    try {
        switch (__wxConfig.envVersion) {
            case 'develop': // 开发模式
                return {
                    api_server: "wxapi.91bkw.com/photo/workbench",
                        api_protocal: "https://"
                }
                case 'release': // 线上版本
                    return {
                        api_server: "wxapi.91bkw.com/photo/workbench",
                            api_protocal: "https://"
                    };
                default: // 一般走不到这里
                    return {
                        api_server: "wxapi.91bkw.com/photo/workbench",
                            api_protocal: "https://"
                    }
        }
    } catch (err) {
        return {}
    }
}

module.exports = {
    config: config
}