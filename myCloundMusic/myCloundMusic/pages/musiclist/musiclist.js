// pages/musiclist/musiclist.js
const app = getApp()
import { addNewMusicList } from "../../utils/requset.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    mycreatedList:[],
    myclloction:[],
    show: false,
    checked: true,
    addMusicListName:null

  },
  showPopup() {
    this.setData({
      show:true
    })
  },
  selectChange(e) {
    console.log(e)
    this.setData({
      checked: e.detail
    });
  },
  onClose() {
    
    this.setData({
      show: false
    })
  },
  songsName(e){
    // console.log(e)
  },
  getName(e){
    console.log(e.detail.value)
    this.setData({
      addMusicListName: e.detail.value
    })
  },
  commitAddEvent(){
    if (this.data.addMusicListName!=null){
      console.log("2222")
      addNewMusicList(this.data.addMusicListName)
    }
  },
  gotoDetail(e){
    console.log(e.currentTarget)
    console.log(e.currentTarget.dataset.item.id)
    wx.navigateTo({
      url: `../listdetail/listdetail?id=`+e.currentTarget.dataset.item.id
      // data:{
      //   id: e.currentTarget.dataset.item.id
      // }
      // url: `../chat/chat?id=${this.properties.person}`,
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:3000/user/playlist',
      data: {
        "uid": wx.getStorageSync("uid").userId
      },
      success: res => {
        console.log(res)
        this.setData({
          mycreatedList: res.data.playlist.slice(0,27),
          myclloction: res.data.playlist.slice(27, 30)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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