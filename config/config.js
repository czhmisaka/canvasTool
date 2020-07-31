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
                // api_server: "wxapi.91bokuan.com/photo/workbench/",
                //     api_protocal: "https://",
                //     fileHost: fileHost

                api_server: "wxapi.91bkw.com/photo/workbench/",
                api_protocal: "https://",
                fileHost: fileHost
            }
            break;
        case 'trial':
            return {
                api_server: "wxapi.91bkw.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost
            }
            break;
        case 'release':
            return {
                api_server: "wxapi.91bkw.com/photo/workbench/",
                    api_protocal: "https://",
                    fileHost: fileHost
            }
    }
}

let config = configExchange()

module.exports = {
    config: config
}