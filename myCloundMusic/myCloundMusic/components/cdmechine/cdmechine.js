// components/cdmechine/cdmechine.js
const app = getApp()
const bus = require("../../utils/event-bus.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    cdData:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    isplayStatus: app.globalData.isPlaying,
    isPause:true,
    musicInfo: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refreshMusicInfoFromApp() {
      this.setData({
        musicInfo: app.currentPlayMusic
      });
      // console.log(this.data.musicInfo)
    },
    //播放歌曲页
    goToPlayPage(e) {
      console.log(e)
      wx.navigateTo({
        url: '../playing/playing',
      })
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
    onTimeUpdate() {

    }
    
  },
  ready(){
    this.refreshMusicInfoFromApp();
    this.onCanplay = this.onCanplay.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);

    bus.on("canplay", this.onCanplay);
    bus.on("pause", this.onPause);
    bus.on("play", this.onPlay);
    bus.on("timeUpdate", this.onTimeUpdate);

    this.setData({
      isPause: app.player.paused
    });
  },

  detached() {
    bus.off("canplay", this.onCanplay);
    bus.off("pause", this.onPause);
    bus.off("play", this.onPlay);
    bus.on("timeUpdate", this.onTimeUpdate);

  }


})
