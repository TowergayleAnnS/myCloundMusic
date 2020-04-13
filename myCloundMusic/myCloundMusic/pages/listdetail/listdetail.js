// pages/listdetail/listdetail.js
const app = getApp()
const bus = require("../../utils/event-bus.js");
import { queryMusicListDetailById, addMusiclistToCollection} from "../../utils/requset.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDetailData:null,
    listH_Data:null,
    musicList:null,
    currentIndex: -1,
    isPaused: true,
    show1:false,
    musicListsongsObj:null
  },
  addMusicListToMyCollection(){
    console.log(this.data.musicList.id)
    addMusiclistToCollection(this.data.musicList.id)
  },
  showMoreSelect(e){
    console.log("更多选择")
    console.log(e.currentTarget.dataset.items)

    this.setData({ 
      show1: true ,
      musicListsongsObj: e.currentTarget.dataset.items
    });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    queryMusicListDetailById(options.id)
      .then(data => {
        console.log(data.playlist);
        this.setData({
          musicList: data.playlist
        });


        wx.setNavigationBarTitle({
          title: data.playlist.name,
        });
        // console.log(app.currentPlayList.id);
        // console.log(this.data.musicList.id);

        if (app.currentPlayList && app.currentPlayList.id == this.data.musicList.id) {
          this.setData({
            currentIndex: app.currentPlayListIndex
          });
        }
      });
    wx.setNavigationBarTitle({
      title: "歌单"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  playMusicDlistSong(e){
    console.log(e.currentTarget.dataset.index)
    if (app.currentPlayList && app.currentPlayList.id == this.data.musicList.id) {
      this.setData({
        currentIndex: app.currentPlayListIndex
      });
    } else {
      app.setCurrentPlayList(this.data.musicList);
    }
    app.playMusicInListWithIndex(e.currentTarget.dataset.index);

    // console.log(m);
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },

 
})