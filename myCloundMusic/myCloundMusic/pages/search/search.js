// pages/search/search.js
const app=getApp()
const bus = require("../../utils/event-bus.js")
var timer=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchMusic:[],
    hotWords:[],
    timer:null,
    isPause: true,
    musicInfo: {},
    
  },
  playResultMusic(e){
    console.log(e.currentTarget.dataset.musicitems.id)
    app.playMusicById(e.currentTarget.dataset.musicitems.id)
  },
  refreshMusicInfoFromApp() {
    this.setData({
      musicInfo: app.currentPlayMusic
    });
    console.log(this.data.musicInfo)
  },
  onCanplay() {
    // console.log(this);
    this.refreshMusicInfoFromApp();
  },
  onPause() {
    this.setData({
      isPause: true
    });
  },

  onPlay() {
    this.setData({
      isPause: false
    });
  },
 
 
  onChange(e) {
    console.log(e.detail)
    
    this.setData({
      value: e.detail
    });
    if (e.detail == '') {
      return
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      wx.request({
        url: 'http://127.0.0.1:3000/search',
        data: {
          keywords: e.detail
        },
        success: res => {
          console.log(res)
          this.setData({
            searchMusic: res.data.result.songs
          })
        }
      })
      timer = null
    }, 500)
  },
  
  

  onClick(e) {
    console.log(this.data.value);
    if (this.data.value==""){
      console.log("空")
      return
    }
    wx.request({
      url: 'http://127.0.0.1:3000/search',
      data:{
        keywords: this.data.value
      },
      success:res=>{
        console.log(res)
        this.setData({
          searchMusic: res.data.result.songs
        })
      }
    })
    
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:3000/search/hot',
      success: res => {
        console.log(res)
        this.setData({
          hotWords: res.data.result.hots
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ready() {
    this.refreshMusicInfoFromApp();
    this.onCanplay = this.onCanplay.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);

    bus.on("canplay", this.onCanplay);
    bus.on("pause", this.onPause);
    bus.on("play", this.onPlay);
    this.setData({
      isPause: app.player.paused
    });
  },

  detached() {
    bus.off("canplay", this.onCanplay);
    bus.off("pause", this.onPause);
    bus.off("play", this.onPlay);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})