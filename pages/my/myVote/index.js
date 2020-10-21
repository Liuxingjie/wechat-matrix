// pages/my/myVote/index.js

import { queryVoteList } from '../../../api/vote'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    tabList:['文字投票','二选一'],
    TabCur: 0,
    pageIndex:1,
    finished:false,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      pageIndex:1,
      finished:false
    })
    this.getData(1)
  },

  getData(pageIndex=1,pageSize=10){
    let params = {
      pageIndex:pageIndex,
      pageSize:pageSize,
      type: this.data.TabCur == 0 ? 2 : 3,
      userId: app.globalData.wechat_id
    }
    queryVoteList(params).then(res=>{
        console.log(res)
        if(res.length<pageSize){
          this.setData({
            finished:true
          })
        }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //如果完成就返回
    if(this.data.finished){
      return ;
    }
    let pageIndex = this.data.pageIndex + 1
    this.setData({
      pageIndex:pageIndex
    })
    this.getData(pageIndex)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(1)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})