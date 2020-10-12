// pages/createVote/createVote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitForm:{
      optionList:[{},{}],
      startDate:'2018-02-13',
      endDate:'2018-02-13',
    },
  },
  //改变input 公共方法
  changeInputValue(e){
    let key = e.target.dataset.key;
    let value = e.detail.value;
    this.setData({
      [`submitForm.${key}`]:value
    })
  },
  deleteList(e){
    let index = e.currentTarget.dataset.index;
    this.data.submitForm.optionList.splice(index,1)
    this.setData({
      ['submitForm.optionList']:this.data.submitForm.optionList
    })
  },
  addList(){
    this.data.submitForm.optionList.push({})
    this.setData({
      ['submitForm.optionList']:this.data.submitForm.optionList
    })
  },
  //修改时间
  DateChange(e){
    let key = e.currentTarget.dataset.key
    this.setData({
      [`submitForm.${key}`]: e.detail.value
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