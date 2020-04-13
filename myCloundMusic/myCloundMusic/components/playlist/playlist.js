// components/playlist/playlist.js
const app = getApp()
const bus = require("../../utils/event-bus.js");
import { queryMusicListDetailById} from "../../utils/requset.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPause: true,
    musicInfo: {},
    currentIndex: -1,
    musicList: null,
    arrays:null
  },


  /**
   * 组件的方法列表
   */
  methods: {
    playMusicDlistSong(e){

      // console.log(e.currentTarget.dataset.index)
      // console.log(e.currentTarget.dataset.songitem.id)
      app.playMusicById(e.currentTarget.dataset.songitem.id)
      if (app.currentPlayList && app.currentPlayList.id == this.data.musicList.id) {
        this.setData({
          currentIndex: app.currentPlayListIndex
        });
      } else {
        app.setCurrentPlayList(this.data.musicInfo);
      }
      this.setData({
        currentIndex: e.target.dataset.index
      })

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
    }
  },
  
  ready() {
    this.refreshMusicInfoFromApp();
    this.onCanplay = this.onCanplay.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);

    bus.on("canplay", this.onCanplay);
    bus.on("pause", this.onPause);
    bus.on("play", this.onPlay);
    this.setData({
      isPause: app.player.paused,
      arrays: this.properties.arr.tracks
    });
   
  },

  detached() {
    bus.off("canplay", this.onCanplay);
    bus.off("pause", this.onPause);
    bus.off("play", this.onPlay);
  }
})
