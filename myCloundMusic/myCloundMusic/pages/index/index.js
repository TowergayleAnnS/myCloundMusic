//index.js
//获取应用实例
const app = getApp()
const host = "http://127.0.0.1:3000"
//真机调试端口
const host1 = "https://sunhuayu.com:3001"

Page({
  data: {
   suggestList:null,
   everyDayMusic:null,
    everyDaySong:null,
    currentPlayData:null,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  playfunc(e){
    // console.log(e.currentTarget)
    this.setData({
      currentPlayData: e.currentTarget.dataset
    })
    app.playfunc(e.currentTarget.dataset)
    app.playMusicById(e.currentTarget.dataset.index.id)

    
  },
  //歌单详情页
  gotoListDetail(e){
    // console.log(e.currentTarget.dataset.index)
    this.properties.listDetailId = e.currentTarget.dataset.index
    wx.navigateTo({
      url:`../listdetail/listdetail?id=${this.properties.listDetailId}`
      // url: `../chat/chat?id=${this.properties.person}`,
    })
  },
  
  //事件处理函数
  
  onLoad: function () {
    wx.request({
      url: host+'/personalized',
      success:res=>{
        // console.log(res.data.result)
        this.setData({
          suggestList: res.data.result.slice(0, 9),
          listDetailId: res.data.result.id
        })
      }
    }),
    wx.request({
      url: host+'/banner',
      success:res1=>{
        // console.log(res1.data.banners)
        this.setData({
          background: res1.data.banners
        })
      }
    })
    wx.request({
      url: host+'/recommend/resource',
      header:{
        "Cookie": wx.getStorageSync("Cookie")
      },
      success: res2 => {
        // console.log(res2.data)
        this.setData({
          everyDayMusic: res2.data.recommend.slice(0,8)
        })
      }
    })
    wx.request({
      url: host+'/recommend/songs',
      header: {
        "Cookie": wx.getStorageSync("Cookie")
      },
      success: res3 => {
        // console.log(res3.data)
        this.setData({
          everyDaySong: res3.data.recommend.slice(0, 9)
        })
      }
    })
    
  },

  
})
