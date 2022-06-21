const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
const db = wx.cloud.database()

Page({
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'page/API/components/image/image'
    }
  },

  data: {
    sourceTypeIndex: 0,
    sourceType: ['拍照', '相册', '拍照或相册'],
    theme: 'light',
    imageList: [],
    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: ''
  },

  onLoad(options) {
    console.log(options)
    this.setData({
      envId: options.envId
    });
  },

  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
                // 将图片上传至云存储空间
                wx.cloud.uploadFile({
                  // 指定上传到的云路径
                  cloudPath:  'myImage/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",
                  // 指定要上传的文件的小程序临时文件路径
                  filePath: res.tempFilePaths[0],
                  config: {
                    env: that.data.envId
                  }
                }).then(res => {
                  console.log('上传成功', res);
                  that.setData({
                    haveGetImgSrc: true,
                    imgSrc: res.fileID
                  });
                  db.collection('xiaozhii').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      fileID: res.fileID,
                      delete:1
                    }
                  });
                  wx.hideLoading();
                }).catch((e) => {
                  console.log(e);
                  wx.hideLoading();
                });
      }
    })
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imageList: ''
    });
  },

  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  }
})
