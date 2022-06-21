Page({
  onShareAppMessage() {
    return {
      title: '小智接口能力展示',
      path: 'page/API/index'
    }
  },

  data: {
    list: [{
      id: 'device',
      name: '设备',
      open: false,
      pages: [{
        zh: '获取小智电量',
        url: 'get-battery-info/get-battery-info'
      }, {
        zh: '蓝牙控制小智',
        url: 'bluetooth/bluetooth'
      }]
    }, {
      id: 'network',
      name: '网络与云服务器',
      open: false,
      pages: [{
        zh: '发起一个请求',
        url: 'request/request'
      }, {
        zh: 'WebSocket',
        url: 'web-socket/web-socket'
      }]
    }, {
      id: 'media',
      name: '媒体',
      open: false,
      pages: [{
        zh: '拍摄图片',
        url: 'image/image'
      }, {
        zh: '录制视频',
        url: 'video/video'
      }]
    }, {
      id: 'location',
      name: '位置',
      open: false,
      pages: [{
        zh: '获取小智当前的位置',
        url: 'get-location/get-location'
      }, {
        zh: '使用原生地图查看位置',
        url: 'open-location/open-location'
      }, {
        zh: '使用原生地图选择位置',
        url: 'choose-location/choose-location'
      }]
    }
  ]
},
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },
  onShow() {
    this.leaveSetTabBarPage()
  },
  onHide() {
    this.leaveSetTabBarPage()
  },
  kindToggle(e) {
    const id = e.currentTarget.id;
    const
      list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: `page/API/components/${list[i].url}`
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  },
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true
    })
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false
    })
  },
})