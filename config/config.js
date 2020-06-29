var fileHost = "xxxx.aliyuncs.com(你的阿里云oss地址)"
const config = {
    api_server: "wxapi.91bkw.com/photo/workbench/",
    api_protocal: "https://",
    fileHost: fileHost
};

// uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
//     AccessKeySecret: '填你自己的AccessKeySecret',
//     OSSAccessKeyId: '填你自己的 OSSAccessKeyId',
//     timeout: 87600 //这个是上传文件时Policy的失效时间

module.exports = {
    config: config
}