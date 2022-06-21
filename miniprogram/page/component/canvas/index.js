const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'canvas',
      path: 'page/component/canvas/index'
    }
  },
  data: {
    theme: 'light',
    canIUse: true,
  },
  data: {},

  onLoad: function () {
    this.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }
    this.x = -50
    this.y = 0
    this.z = 0
    this.k = 0.01


    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },

  init(res) {
    console.log(res)
    const width = res[0].width
    const height = res[0].height

    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    this._width=width
    this._height=height
    ctx.scale(dpr, dpr)

    const renderLoop = () => {
      this.render(canvas, ctx)
      canvas.requestAnimationFrame(renderLoop)
    }
    canvas.requestAnimationFrame(renderLoop)

    const img = canvas.createImage()
    ctx.translate(110,120)
    img.onload = () => {
      this._img = img
    }
    img.src = './car.png'
  },

  render(canvas, ctx) {
    ctx.clearRect(-100, -100, 600, 600)
    this.drawBall(ctx)
    this.drawCar(ctx)
    this.down1(ctx)
  },

  drawBall(ctx) {
    const p = this.position
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    function ball(x, y) {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#1aad19'
      ctx.strokeStyle = 'rgba(1,1,1,0)'
      ctx.fill()
      ctx.stroke()
    }

    ball(p.x, 150)
    ball(150, p.y)
    ball(300 - p.x, 150)
    ball(150, 300 - p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)
  },

  drawCar(ctx) {
        if (!this._img) return
        if (this.x > 20) {
          this.y=1
        }
        if (this.x < 0) {
          this.y=0
        }
        if(this.y==0){

          ctx.drawImage(this._img, this.x+=this.k, 0, 100, 50)
        }else{

          ctx.drawImage(this._img, this.x-=this.k, 0, 100, 50)
        }
        if (this.z == 1) {
          this.z=0
          ctx.rotate(0.02*Math.PI)
        }
        if (this.z == 2) {
          this.z=0
          ctx.rotate(-0.02*Math.PI)
        }
        ctx.restore()
  },

    
  upp(ctx){
    if (this.k < 0.3) {
      this.k+=0.02
    }
  },

  down(ctx){
    if (this.k > 0) {
      this.k-=0.02
    }
  },

  down1(ctx){
    if (this.k < 0) {
      ctx.drawImage(this._img, this.x-=0.2, 0, 100, 50)
      this.k+=0.004
    }
  },

  left(ctx){
    this.z=2
  },

  right(ctx){
    this.z=1
  }
})
