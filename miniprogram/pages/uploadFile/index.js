const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: '',
    testList:[],
    fileIDList:[]
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
    //获取云端数据库的数据
      db.collection('xiaozhii').get({
        success:res=> {
          console.log(res.data)
          this.setData({
            //将从云端获取的数据放到testList中
            testList:res.data,
          })
          
        },
        fail: console.error
      })
  },

  uploadImg() {
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        wx.showLoading({
          title: '',
        });
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath:  'myImage/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res);
          this.setData({
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
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });
  },

  clearImgSrc() {
    for(var i = 0;i<this.data.testList.length;i++){
      var fileIDD=this.data.testList[i].fileID
        this.setData({
          [`fileIDList[${i}]`]:fileIDD
        })
        console.log(this.data.testList[i].fileID)
        console.log(this.data.fileIDList)
      }
    wx.cloud.deleteFile({
      fileList: this.data.fileIDList
    }).then(res => {
      // handle success
      console.log(res.fileList)
    }).catch(error => {
      // handle error
    })
    let db = wx.cloud.database() //设置数据库
    let userCollection = db.collection('xiaozhii') //单引号里为刚刚新建的集合名
    for(var i = 0;i<this.data.testList.length;i++){
     userCollection.where({//先查询
      delete:1
    }).remove().then(res => {
      console.log('删除成功')
	  this.setData({
		//数据库删除了，那也得将data里的值也删了，不然数据容易出错
		testList: []
	})
}).catch(err => {
	console.log('删除失败',err)//失败提示错误信息
})
  }}
});
