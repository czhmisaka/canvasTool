var fileHost = ""
// const config = {
//     api_server: "wxapi.91bkw.com/photo/workbench/",
//     api_protocal: "https://",
//     fileHost: fileHost
// };
function configExchange() {
    const envVersion = __wxConfig.envVersion
    switch (envVersion) {
        case 'develop':
            return {
                api_server: "wxapi.91bokuan.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost,
                    cdn: 'https://yunshentechoss.oss-cn-hangzhou.aliyuncs.com/',

                // api_server: "wxapi.91bkw.com/photo/workbench/",
                // api_protocal: "https://",
                // fileHost: fileHost,
                // cdn:'http://cdn.91bkw.com/'
            }
            break;
        case 'trial':
            return {
                api_server: "wxapi.91bkw.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost,
                    cdn: 'http://cdn.91bkw.com/'
            }
            // return {
            //     api_server: "wxapi.91bokuan.com/photo/workbench/",
            //         api_protocal: "https://",
            //         fileHost: fileHost,
            //         cdn: 'https://yunshentechoss.oss-cn-hangzhou.aliyuncs.com/'
            // }
            break;
        case 'release':
            return {
                api_server: "wxapi.91bkw.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost,
                    cdn: 'http://cdn.91bkw.com/'
            }
    }
}

let config = configExchange()

module.exports = {
    config: config
}