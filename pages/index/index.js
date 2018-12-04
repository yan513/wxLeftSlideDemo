Page({

  /**
   * 页面的初始数据
   */
  data: {
    delIndex:-1,//左滑删除索引
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i=1; i<=10; i++) {
      this.data.items.push("这是第" + i +"条数据！！！")
    }
    this.setData({
      items:this.data.items
    })
  },

  touchStart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      delIndex: -1
    })
  },

  touchMove: function (e) {
    var that = this,
    index = e.currentTarget.dataset.index,//当前索引
    delIndex = that.data.delIndex,
    startX = that.data.startX,//开始X坐标
    startY = that.data.startY,//开始Y坐标
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
    //获取滑动角度
    angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;
    if (touchMoveX > startX) {//右滑 
      delIndex = -1;
    } else {
      delIndex = index;
    } 
    that.setData({
      delIndex: delIndex
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
    _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件

  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  }
})