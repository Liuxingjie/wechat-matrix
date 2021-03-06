Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    isLogin:false,
    selectIdx:1,
  },
  onSelectVote(e){
    let type = e.currentTarget.dataset.type;
    this.setData({
      selectIdx:type
    })
  },
  toCreateVote(e){
    let url = '';
    let type = this.data.selectIdx;
    if (type==1){//文字投票
      url = "/pages/vote/createVote/textVote/index"
    }else{
      url = "/pages/vote/createVote/selectOne/index"
    }
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!this.data.isLogin){
      this.setData({
        modalName:"loginModal"
      })
    }
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

  },
  hideModal: function () {
    this.setData({
      hideModal:"loginModal"
    })
  }
})