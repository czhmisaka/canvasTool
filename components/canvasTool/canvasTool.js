/* global Component wx */

Component({
  properties: {
    painting: {
      type: Object,
      value: {
        view: []
      },
      observer(newVal, oldVal) {
        if (!this.data.isPainting) {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            if (newVal && newVal.width && newVal.height) {
              this.setData({
                showCanvas: true,
                isPainting: true
              })
              this.readyPigment()
            }
          } else {
            if (newVal && newVal.mode !== 'same') {
              this.triggerEvent('getImage', {
                errMsg: 'canvasdrawer:samme params'
              })
            }
          }
        }
      }
    }
  },
  lifeTimes: {},
  data: {
    showCanvas: false,
    width: 375,
    height: 555,
    tempFileList: [],
    isPainting: false,
    codeimg: ''
  },
  ctx: null,
  cache: {},
  ready() {
    wx.removeStorageSync('canvasdrawer_pic_cache')
    this.cache = wx.getStorageSync('canvasdrawer_pic_cache') || {}
    this.ctx = wx.createCanvasContext('canvasdrawer', this)
  },
  methods: {
    readyPigment() {
      const {
        width,
        height,
        views
      } = this.data.painting
      this.setData({
        width,
        height
      })

      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter)
          this.ctx.clearActions()
          this.ctx.save()
          this.getImagesInfo(views)
        }
      }, 100)
    },
    getImagesInfo(views) {
      const imageList = []
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(this.getImageInfo(views[i].url))
        }
      }

      const loadTask = []
      for (let i = 0; i < Math.ceil(imageList.length / 8); i++) {
        loadTask.push(new Promise((resolve, reject) => {
          Promise.all(imageList.splice(i * 8, 8)).then(res => {
            resolve(res)
          }).catch(res => {
            reject(res)
          })
        }))
      }
      Promise.all(loadTask).then(res => {
        let tempFileList = []
        for (let i = 0; i < res.length; i++) {
          tempFileList = tempFileList.concat(res[i])
        }
        this.setData({
          tempFileList
        })
        this.startPainting()
      })
    },
    startPainting() {
      const {
        tempFileList,
        painting: {
          views
        }
      } = this.data
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            url: tempFileList[imageIndex]
          })
          imageIndex++
        } else if (views[i].type === 'text') {
          if (!this.ctx.measureText) {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。'
            })
            this.triggerEvent('getImage', {
              errMsg: 'canvasdrawer:version too low'
            })
            return
          } else {
            this.drawText(views[i])
          }
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i])
        } else if (views[i].type === 'roundRect') {
          this.roundRect(views[i])
        }
      }
      this.ctx.draw(false, () => {
        wx.setStorageSync('canvasdrawer_pic_cache', this.cache)
        const system = wx.getSystemInfoSync().system
        if (/ios/i.test(system)) {
          this.saveImageToLocal()
        } else {
          // 延迟保存图片，解决安卓生成图片错位bug。
          setTimeout(() => {
            this.saveImageToLocal()
          }, 800)
        }
      })
    },
    drawImage(params) {
      this.ctx.save()
      const {
        url,
        top = 0,
        left = 0,
        width = 0,
        height = 0,
        borderRadius = 0,
        deg = 0
      } = params
      if (borderRadius) {
        this.ctx.beginPath()
        this.ctx.arc(left + borderRadius, top + borderRadius, borderRadius, 0, 2 * Math.PI)
        this.ctx.clip()
        this.ctx.drawImage(url, left, top, width, height)
      } else {
        if (deg !== 0) {
          this.ctx.translate(left + width / 2, top + height / 2)
          this.ctx.rotate(deg * Math.PI / 180)
          this.ctx.drawImage(url, -width / 2, -height / 2, width, height)
        } else {
          this.ctx.drawImage(url, left, top, width, height)
        }
      }
      this.ctx.restore()
    },
    drawText(params) {
      this.ctx.save()
      const {
        MaxLineNumber = 2,
          breakWord = false,
          color = 'black',
          content = '',
          fontSize = 16,
          top = 0,
          left = 0,
          lineHeight = 20,
          textAlign = 'left',
          width,
          bolder = false,
          textDecoration = 'none'
      } = params

      this.ctx.beginPath()
      this.ctx.setTextBaseline('top')
      this.ctx.setTextAlign(textAlign)
      this.ctx.setFillStyle(color)
      this.ctx.setFontSize(fontSize)

      if (!breakWord) {
        this.ctx.fillText(content, left, top)
        this.drawTextLine(left, top, textDecoration, color, fontSize, content)
      } else {
        let fillText = ''
        let fillTop = top
        let lineNum = 1
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]]
          if (this.ctx.measureText(fillText).width > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...'
                this.ctx.fillText(fillText, left, fillTop)
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
                fillText = ''
                break
              }
            }
            this.ctx.fillText(fillText, left, fillTop)
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
            fillText = ''
            fillTop += lineHeight
            lineNum++
          }
        }
        this.ctx.fillText(fillText, left, fillTop)
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
      }

      this.ctx.restore()

      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none'
        })
      }
    },
    drawTextLine(left, top, textDecoration, color, fontSize, content) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      }
    },
    drawRect(params) {
      this.ctx.save()
      const {
        background,
        top = 0,
        left = 0,
        width = 0,
        height = 0
      } = params

      this.ctx.setFillStyle(background)
      // if (borderRadius != 0)
      //   this.ctx.fillRoundRect(left, top, width, height, borderRadius)
      // else
      this.ctx.fillRect(left, top, width, height)
      this.ctx.restore()
    },
    getImageInfo(url) {
      return new Promise((resolve, reject) => {
        if (this.cache[url]) {
          resolve(this.cache[url])
        } else {
          const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
          if (objExp.test(url)) {
            wx.getImageInfo({
              src: url,
              complete: res => {
                if (res.errMsg === 'getImageInfo:ok') {
                  this.cache[url] = res.path
                  resolve(res.path)
                } else {
                  this.triggerEvent('getImage', {
                    errMsg: 'canvasdrawer:download fail'
                  })
                  reject(new Error('getImageInfo fail'))
                }
              }
            })
          } else {
            this.cache[url] = url
            resolve(url)
          }
        }
      })
    },
    saveImageToLocal() {
      const {
        width,
        height
      } = this.data
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId: 'canvasdrawer',
        complete: res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            this.setData({
              showCanvas: false,
              isPainting: false,
              tempFileList: []
            })
            this.triggerEvent('getImage', {
              tempFilePath: res.tempFilePath,
              errMsg: 'canvasdrawer:ok'
            })
          } else {
            this.triggerEvent('getImage', {
              errMsg: 'canvasdrawer:fail'
            })
          }
        }
      }, this)
    },
    // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    roundRect(czh) {
      let x, y, w, h, r, fillColor, strokeColor = '#fff';
      x = czh.left
      y = czh.top
      w = czh.width
      h = czh.height
      r = czh.raidus
      fillColor = czh.fillColor
      // 开始绘制
      this.ctx.beginPath()

      // 绘制左上角圆弧 Math.PI = 180度
      // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
      this.ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

      // 绘制border-top
      // 移动起点位置 x终点、y终点
      this.ctx.moveTo(x + r, y)
      // 画一条线 x终点、y终点
      this.ctx.lineTo(x + w - r, y)
      // this.ctx.lineTo(x + w, y + r)

      // 绘制右上角圆弧
      this.ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

      // 绘制border-right
      this.ctx.lineTo(x + w, y + h - r)
      // this.ctx.lineTo(x + w - r, y + h)

      // 绘制右下角圆弧
      this.ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

      // 绘制border-bottom
      this.ctx.lineTo(x + r, y + h)
      // this.ctx.lineTo(x, y + h - r)

      // 绘制左下角圆弧
      this.ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

      // 绘制border-left
      this.ctx.lineTo(x, y + r)
      // this.ctx.lineTo(x + r, y)

      if (fillColor) {
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        this.ctx.setFillStyle(fillColor)
        // 对绘画区域填充
        this.ctx.fill()
      }

      if (strokeColor) {
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        this.ctx.setStrokeStyle(strokeColor)
        // 画出当前路径的边框
        this.ctx.stroke()
      }
      // 关闭一个路径
      // this.ctx.closePath()

      // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
      this.ctx.clip()
    },

  }
})