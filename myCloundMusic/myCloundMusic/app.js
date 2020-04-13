//app.js

import {
  requestMusicById,
  querySongUrlById,
  playListInfoRequest,
  querylyricByMusicId,
  downloadFileWithUrl,
  
} from "/utils/requset.js"



App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    isPlaying:false,
    currentPlayingId:null,
    currentPlayData:null
  },
  playfunc(v) {
    // console.log("这是app里的播放方法")
    // console.log(v)
    this.globalData.currentPlayData=v
    // console.log(this.globalData.currentPlayData)
  },
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>
  currentPlaylist:null,
  currentPlaylistIndex:-1,
  playMode: "loop",


  setPlayMode(mode) {
    this.playMode = mode;
    if (mode == "random") {
      this.resetRandomList();
    } 
  },
  
  
  // 更改播放列表
  setCurrentPlayList(pl) {
    this.currentPlayList = pl;
    this.currentPlayListIndex = -1;
  },

  // 根据索引播放当前歌单中的某首歌
  playMusicInListWithIndex(index) {
    this.currentPlayListIndex = index;
    let m = this.currentPlayList.tracks[index];
    console.log(m)
    this.playMusicById(m.id);
  },
  
  // 单曲循环>>>>>
  single(){
    this.playMusicInListWithIndex(this.currentPlayListIndex);
  },
  // 重置随机列表
  resetRandomList() {
    this.randomPlayList = [];
    for (let i = 0; i < this.currentPlayList.tracks.length; i++) {
      this.randomPlayList.push(i);
    }
    //深复制一份数据
    // this.randomPlayList = JSON.parse(JSON.stringify(this.currentPlaylist))
  },
  randomPlayIndex:-1,
  // 随机播放一首
  playRandom() {
    if (this.randomPlayList.length <= 0) {
      this.resetRandomList();
    }
    let rndIndex = Math.floor(Math.random() * this.randomPlayList.length);
    let n = this.randomPlayList[rndIndex];
    this.randomPlayList.splice(rndIndex, 1);
    this.playMusicInListWithIndex(n);
  },
  // 播放当前音乐
  playCurrentMusic() {
    this.player.src = this.currentMusic.url;
    this.player.title = this.currentMusic.name;
    this.player.epname = this.currentMusic.alname;
    this.player.singer = this.currentMusic.artists;
    this.player.coverImgUrl = this.currentMusic.pic;
  },
  // 播放下一首
  playNext() {
    if (this.currentPlayListIndex >= this.currentPlayList.tracks.length - 1) {
      this.playMusicInListWithIndex(0);
    } else {
      this.playMusicInListWithIndex(this.currentPlayListIndex + 1);
    }
  },
  // 播放上一首
  playPrev() {
    if (this.currentPlayListIndex <= 0) {
      this.playMusicInListWithIndex(this.currentPlayList.tracks.length - 1);
    } else {
      this.playMusicInListWithIndex(this.currentPlayListIndex - 1);
    }
  },
  // 向后切歌
  onNext() {
    switch (this.playMode) {
      case "loop":
        if (this.currentPlayList) {
          this.playNext();
        }
        break;
      case "random":
        if (this.currentPlayList) {
          this.playRandom();
        }
        break;
      case "single":
        if (this.currentPlaylist) {
          this.single()
        }
        break;
    }
  },
  // 向前切歌
  onPrev() {
    switch (this.playMode) {
      case "loop":
        if (this.currentPlayList) {
          this.playPrev();
        }
        break;
      case "random":
        if (this.currentPlayList) {
          this.playRandom();
        }
        break;
      case "single":
        if (this.currentPlaylist) {
          this.single()
        }
        break;
    }
  },











  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  playMusicById (mid){
    this.currentPlayMusic.id=mid

    Promise.all([
      querySongUrlById(mid),
      requestMusicById(mid),
      querylyricByMusicId(mid)
      ])
   
    .then(resArr=>{
      // console.log(resArr[2].lrc.lyric)
      
      this.currentPlayMusic.name = resArr[1].songs[0].name
      this.currentPlayMusic.pic = resArr[1].songs[0].al.picUrl
      this.currentPlayMusic.alname=resArr[1].songs[0].al.name
      this.currentPlayMusic.lrcurl=resArr[2].lrc.lyric
      this.currentPlayMusic.artists=resArr[1].songs[0].ar.reduce((prev,el,i)=>{
        return prev + el.name +(i+ resArr[1].songs[0].ar.length - 1 ?"":",")
      },"")
      this.currentPlayMusic.url=resArr[0].data[0].url;
      this.playCurrentMusic()
    })
  },
  //当前播放的音乐信息
  currentPlayMusic:{
    name: "",
    pic: "",
    url: "",
    id: "",
    lrcurl: "",
    alname: "",
    artists: ""
  },
  // 1/背景音频管理器对象
  player:wx.getBackgroundAudioManager(),
  
  // 播放当前音乐
  playCurrentMusic(){
    this.player.src = this.currentPlayMusic.url
    this.player.title = this.currentPlayMusic.name
    this.player.epname = this.currentPlayMusic.alname
    this.player.singer = this.currentPlayMusic.artists
    this.player.coverImgUrl = this.currentPlayMusic.pic
    this.player.lrcurl = this.currentPlayMusic.lrcurl
  },


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 // 收藏歌曲
  isCollect: false,

  setCollectionStatus(status) {
    if (status){
      this.isCollect=true
    }else{
      this.isCollect=false
    }
  }


})







































// downLoadCurrentMusic() {
//   console.log(this.currentPlayMusic.url)
//   downloadFileWithUrl(this.currentPlayMusic.url)
//     .then(res => {
//       console.log(res.filePath)
//       // console.log(res)
//       wx.saveFile({
//         tempFilePath: res.tempFilePath,
//         success: fres => {
//           console.log(fres.savedFilePath)
//           let localMusic = wx.getStorageSync("localMusic") || [];
//           localMusic.push({
//             path: fres.savedFilePath,
//             ...this.currentPlayMusic
//           });
//           wx.setStorageSync("localMusic", localMusic)

//           wx.showToast({
//             title: '下载完毕',
//           })
//         }
//       })
//     })
//     .catch(err => {
//       wx.showToast({
//         title: '下载失败',
//         icon: "none"
//       })
//     })

// },