// 根据id请求歌曲详情
const host ="http://127.0.0.1:3000"
const host1="https://sunhuayu.com:3001"
function requestMusicById(mid){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host+'/song/detail',
      data: {
        ids: mid
      },
      success: res => {
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 根据歌曲id请求歌曲url
function querySongUrlById(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/song/url',
      data: {
        id
      },
      success: res => {
        // console.log(res)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//获取歌单详情
function playListInfoRequest(id){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host + "/play/detail",
      data:{
        id
      },
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
//根据id请求歌曲歌词>>>>>>>>>>>>>>>>>>>>>>>>

function querylyricByMusicId(id){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + "/lyric",
      data: {
        id
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
} 
function downloadFileWithUrl(url){
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url,
      success(res) {
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
// 根据歌单id请求歌单详情
function queryMusicListDetailById(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/detail',
      data: { id },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
//收藏歌曲到默认列表(我喜欢的音乐)对歌单添加或删除歌曲
function addMusicToMyFavoriteList(id){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host +'/playlist/tracks',
      data:{
        op: "add",
        pid:"3179128778",
        tracks:id
      },
      header: {
        // 网易云音乐如果你们遇到需要登陆的接口，把本地的Cookie传递进入即可
        "Cookie": wx.getStorageSync("Cookie")
      },
      success(res){
        console.log("收藏成功")
        console.log(res.data)
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
//收藏歌单
function addMusiclistToCollection(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/subscribe',
      data: {
        t:"1",
        id:id
      },
      header: {
        // 网易云音乐如果你们遇到需要登陆的接口，把本地的Cookie传递进入即可
        "Cookie": wx.getStorageSync("Cookie")
      },
      success(res) {
        console.log("收藏歌单成功")
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 创建歌单
function addNewMusicList(name) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/create',
      data: {
        name:name
      },
      header: {
        // 网易云音乐如果你们遇到需要登陆的接口，把本地的Cookie传递进入即可
        "Cookie": wx.getStorageSync("Cookie")
      },
      success(res) {
        console.log("创建歌单成功")
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//删除歌单
function delNewMusicList(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/delete',
      data: {
        id: id
      },
      success(res) {
        console.log("删除歌单成功")
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}


module.exports ={
  requestMusicById,
  querySongUrlById,
  playListInfoRequest,
  querylyricByMusicId,
  downloadFileWithUrl,
  queryMusicListDetailById,

  addMusicToMyFavoriteList,
  addNewMusicList,
  delNewMusicList,
  addMusiclistToCollection
}