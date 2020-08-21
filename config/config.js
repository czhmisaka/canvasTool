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
                api_protocal: "https://",
                    fileHost: fileHost,
                    api_server: "wxapi.91bokuan.com/photo/workbench/",
                    cdn: 'https://yunshentechoss.oss-cn-hangzhou.aliyuncs.com/',

                    // cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/', // 正式服
                    // api_server: "wxapi.91bkw.com/photo/workbench/",
                    //     api_protocal: "https://",
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
                    cdn: 'https://yunshentechprodoss.oss-cn-hangzhou.aliyuncs.com/'
            }
    }
}

let config = configExchange()

module.exports = {
    config: config
}