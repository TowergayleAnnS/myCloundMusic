// pages/playing/playing.js
const app = getApp()
const bus= require("../../utils/event-bus.js")
import lyric from "../../utils/handleLyric.js"
import handleCurrentLyric from "../../utils/handleCurrentLyric.js"
import { addMusicToMyFavoriteList } from "../../utils/requset.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    play:'../../images/暂停.png',
    pause:'../../images/播放.png',
    playMode:null,
    isCollect:false,
    randomMode: "../../images/列表播放.png",
    playModeArr:[
      { "image": "../../images/列表播放.png" },
      { "image": "../../images/单曲循环.png" },
      { "image": "../../images/随机播放.png" }
    ],
    currentImageIndex:0,
    value: 10,
    isCover:true,
    isPlaying:true,
    currentPlayData:null,
    musicInfo:{},
    lyricInfo:[],
    isPause:false,
    // 是否暂停
    duration:0,
    currentTime:0,
    lyricLine:0
   
  },
  changePlayMode(){
    if (this.data.currentImageIndex==0){
      // console.log(0, this.data.playMode)
    
      app.setPlayMode("single")
      this.setData({
        playMode:"single",
        currentImageIndex: this.data.currentImageIndex+1
      })
      console.log(0, app.playMode)
      
    } else if (this.data.currentImageIndex == 1){
      // console.log(1, this.data.playMode)
      
      this.setData({
        playMode: "random",
        currentImageIndex: this.data.currentImageIndex + 1
      })
      app.setPlayMode("random")
      console.log(1, app.playMode)
    } else if (this.data.currentImageIndex == 2){
      // console.log(3, this.data.playMode)
      this.setData({
        playMode: "loop",
        currentImageIndex: 0
      })
      app.setPlayMode("loop")
      console.log(2, app.playMode)
    }
  },
  collectTap(){
    console.log(this.data.musicInfo.id)
    addMusicToMyFavoriteList(this.data.musicInfo.id)
  },
  
  playbtn(){
    // console.log("111")
    app.player.play();
    // if (app.player.src) {
    //   app.player.play();
    // } else {
    //   app.playMusicByID(this.data.musicInfo.id);
    // }
  },
  pausebtn(){
    // console.log("2222")
    app.player.pause()
  },
  showLyric(){
    if(this.data.isCover){
      this.setData({
        isCover:false
      })
    }else{
      this.setData({
        isCover: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    app.globalData.isPlaying = true
    this.setData({
      isPlaying: app.globalData.isPlaying,
      isCollect:app.isCollect
    })
    this.refreshMusicInfo()
    this.setData({
      lyricInfo: lyric(app.currentPlayMusic.lrcurl)
    })
    console.log(this.data.lyricInfo)

    this.setData({
      isPause: app.player.paused
    })
    
    bus.on("canplay", this.onCanplay);
    bus.on("pause", this.onPause);
    bus.on("play", this.onPlay);
    bus.on("timeUpdate", this.onTimeUpdate);
    bus.on("ended", this.onEnded);

  },
  onPause(){
    this.setData({
      isPause: true
    })
  },
  onPlay() {
    this.setData({
      isPause: false
    })
  },
  onEnded() {

    this.setData({
      isPaused: true
    });
    app.onNext();
  },
  onCanplay() {
    this.refreshMusicInfo();
    // this.setData({
    //   duration: app.player.duration
    // })
  },
  sliderchange(e) {
    app.player.seek(e.detail.value)
    wx.nextTick(()=>{
      this.setData({
        currentTime: e.detail.value
      })
    })
   
    
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e.detail.scrollTop)
    console.log(e.detail.scrollHeight)

  },
  downTap(){
    console.log(111)
    app.downLoadCurrentMusic()
  },

  
  onTimeUpdate() {
    this.refreshMusicInfo();
    this.setData({
      currentTime: app.player.currentTime
    })
    // console.log(this.data.currentTime)
    // console.log(this.data.lyricInfo)
    let present = this.data.lyricInfo
    let time=this.data.currentTime
    let line=this.data.lyricLine
    for (let i = present.length - 1; i >= 0; i--) {
      if (present[i].time <= time) {
        if (line != i) {
          this.setData({
            lyricLine: i
          });
        }
        break;
      }
    }
    // console.log(this.data.playMode)
    // console.log(this.data.lyricLine)
    // console.log(present[line])

  },
  

  //从全局对象app中获取当前播放音乐的信息
  refreshMusicInfo(){
    this.setData({
      musicInfo: app.currentPlayMusic,
      duration: app.player.duration,
      playMode: app.playMode,
      isCollect: app.isCollect,
      lyricInfo: lyric(app.currentPlayMusic.lrcurl)
    })
    
  },
  nextBtnTapped() {
    app.onNext();
  },

  prevBtnTapped() {
    app.onPrev();
  },
  loopTapped() {
    // app.playMode = "loop";
    app.setPlayMode("loop");
    this.setData({
      playMode: "loop"
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
    bus.off("canplay", this.onCanplay);
    bus.off("pause", this.onPause);
    bus.off("play", this.onPlay);
    bus.on("timeUpdate", this.onTimeUpdate);
    bus.off("ended", this.onEnded.bind(this))
  },

  

 

 
})