import { createVote } from '../../../../api/vote.js'
const ComRequest = require('../../../../utils/util');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitForm:{
      optionList:[{},{}],
      isRepeatVote:2,
      isHideNum:2,
      selectList:[],
      title:'',
      introduce:'',
      startTime:'2021-05-20 05:20',
      endTime:'2021-05-20 05:20'
    },
  },
  toCreate(){
    let params = {
      ...this.data.submitForm,
      createBy:app.globalData.wechat_id,
      type:3,
      voteNum:1
    }
    let pramsKeys = ['title','introduce','startTime','endTime','selectList']
    let reqRes = ComRequest.requireParam(params,pramsKeys)
    if(reqRes){
      createVote(params).then(res=>{
        wx.navigateTo({
          url: `/pages/my/myVote/index?type=${type}`,
        }) 
      })
    }
    // 
  },
   //改变数据参数
   changeSelectValue(e){
    let index = e.target.dataset.index;
    let value = e.detail.value;
    this.setData({
      [`submitForm.selectList[${index}]`]:value
    })
  },
 //改变input 公共方法
 changeInputValue(e){
    let key = e.target.dataset.key;
    let value = e.detail.value;
    this.setData({
      [`submitForm.${key}`]:value
    })
  },
  onPickerChange3: function (e) {
    console.log(e.detail);
    this.setData({
      endedTime: e.detail.dateString
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