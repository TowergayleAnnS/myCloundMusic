// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    password:null,
    userData:{},
    cookieData:[]

  },
  phoneInput(e){
    // console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  passwInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  loginClick(){
    // console.log(this.data.phone, this.data.password)
    wx.login({
      success:(res)=>{
        wx.request({
          method: "POST",
          url: 'http://127.0.0.1:3000/login/cellphone',
          data:{
            phone:this.data.phone,
            password:this.data.password
          },
          // swx17303815251
          // 17303815251
          
          success:res=>{
            console.log(res)
            wx.setStorageSync("Cookie", res.header["Set-Cookie"]);
            wx.setStorageSync("uid", res.data.profile);
            wx.switchTab({
              url: '/pages/user/user'
            })
          }
          
        })
        

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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