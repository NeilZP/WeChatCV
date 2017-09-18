// Tests API 操作
const Tests = require('../../libraries/Tests.js');
const app = getApp();

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: [],
    loading: true,
    TestPages: []
  },

  onLoad (params) {
    console.log('onLoad')
    var that = this
    // 加载https://api.douban.com/v2/movie/in_theaters对应的数据
    wx.request({
      // url 请求的地址
      url: app.globalData.API_URL + 'getProducts',
      // 发送给服务端的数据
      // data: { 'accessId':'qb6rIzUn1uOIyc068md0T9TUUJ5LsoGusVkYwFOlYh8='},
      header: { 'content-type': 'application/json' ,'accessId':'qb6rIzUn1uOIyc068md0T9TUUJ5LsoGusVkYwFOlYh8='},
      success: function (res) {
        console.log(res.data)
        // 想要显示到页面上的数据必须是data上出现的
        that.setData({TestPages: res.data})
      }
    })
  },

  onReady () {
    //wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  }
})
