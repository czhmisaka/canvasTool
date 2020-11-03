var fileHost = ""
// const config = {
//     api_server: "wxapi.91bkw.com/photo/workbench/",
//     api_protocal: "https://",
//     fileHost: fileHost
// };
let isTest = true

function configExchange() {
    const envVersion = __wxConfig.envVersion
    switch (envVersion) {
        case 'develop':
            if (isTest)
                return {
                    api_protocal: "https://",
                    fileHost: fileHost,
                    api_server: "wxapi.91bokuan.com/photo/workbench/",
                    cdn: 'https://yunshentechoss.oss-cn-hangzhou.aliyuncs.com/', // 测试服
                    loginImg: 'yunshentech/159799337578195.png'
                    // cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/', // 正式服
                    // api_server: "wxapi.91bkw.com/photo/workbench/",
                    // loginImg: 'yunshentech/1597993523384135.png'
                    //     api_protocal: "https://",
                    //     fileHost: fileHost,
                    //     cdn: 'http://cdn.91bkw.com/'
                }
            else
                return {
                    api_protocal: "https://",
                    fileHost: fileHost,
                    // api_server: "wxapi.91bokuan.com/photo/workbench/",
                    // cdn: 'https://yunshentechoss.oss-cn-hangzhou.aliyuncs.com/', // 测试服
                    // loginImg: 'yunshentech/159799337578195.png'
                    cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/', // 正式服
                    api_server: "wxapi.91bkw.com/photo/workbench/",
                    loginImg: 'yunshentech/1597993523384135.png'
                    // api_protocal: "https://",
                    //     fileHost: fileHost,
                    //     cdn: 'http://cdn.91bkw.com/'
                }
            break;
        case 'trial':
            return {
                api_server: "wxapi.91bkw.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost,
                    // cdn: 'http://cdn.91bkw.com/',
                    cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/',
                    loginImg: 'yunshentech/1597993523384135.png'
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
                    // cdn: 'http://cdn.91bkw.com/',
                    cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/',
                    loginImg: 'yunshentech/1597993523384135.png'
            }
    }
}

let config = configExchange()

module.exports = {
    config: config
}