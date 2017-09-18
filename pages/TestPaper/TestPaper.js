// Tests API 操作
const Tests = require('../../libraries/Tests.js');
const app = getApp();

var inputContent = {};
// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: [],
    loading: true,
    PaperData: [],
    img:'',
    activityId: ''
  },

  onLoad (params) {
    console.log('onLoad')
    var that = this
    // 加载https://api.douban.com/v2/movie/in_theaters对应的数据
    wx.request({
      // url 请求的地址
      url: app.globalData.API_URL + 'openTest',
      // 发送给服务端的数据
      data: { activityId: params.id , testerId:2, testerName:1},
      header: { 'content-type': 'application/json' ,'accessId':'qb6rIzUn1uOIyc068md0T9TUUJ5LsoGusVkYwFOlYh8='},
      success: function (res) {
        console.log(res.data)
        // 想要显示到页面上的数据必须是data上出现的
        that.setData({PaperData: res.data, activityId: params.id})
      }
    })
  },
  bindRadio: function(e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  primary: function(e) {
    console.log(inputContent);
  },
  formSubmit: function(e) {
    console.log(inputContent);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var ojson = {testerId: 2,
                 activityId: data.activityId,
                 questionnaireId: 4,
                 deltaElapsedTime: 4.6,
                 finishQuestionnaire: false,
                 finishTest: false};

    for(let i in e.detail.value){
      if(e.detail.value[i] != "")
        ojson[i] = e.detail.value[i];
    }
    console.log('准备提交数据数据为：', ojson)

    wx.request({
      method: 'POST',
      // url 请求的地址
      url: app.globalData.API_URL + 'saveTest',
      // 发送给服务端的数据
      data: JSON.stringify(ojson),
      header: { 'content-type': 'application/json' ,'accessId':'qb6rIzUn1uOIyc068md0T9TUUJ5LsoGusVkYwFOlYh8='},
      success: function (res) {
        console.log(res)
      }
    })    
  },
  onReady () {
    //wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  }
})
