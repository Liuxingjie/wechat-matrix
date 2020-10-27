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
    listData:[],
    isMyCreate:false, //是否自己创建
  },
// 跳转到详情或者管理界面
  toDetail(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/vote/voteManage/index',
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      pageIndex:1,
      finished:false,
      listData:[],
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.getData(true)
  },

  getData(bool){
    if(bool){
      this.setData({
        pageSize:1,
        listData:[]
      })
    }
    let params = {
      pageIndex:this.data.pageIndex,
      pageSize:10,
      type: this.data.TabCur == 0 ? 2 : 3,
      userId: app.globalData.wechat_id,
      isMyCreate:this.data.isMyCreate
    }
    queryVoteList(params).then(res=>{
      res.length && res.map(val=>{
        
      })
      let newArr = this.data.listData.concat(res)
      this.setData({
        listData:newArr
      })
        if(res.length<10){
          this.setData({
            finished:true,
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
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isMyCreate = options.isMyCreate ||true;
    let tabActive = options.active || 0;
    this.setData({
      isMyCreate:isMyCreate,
      TabCur:tabActive
    })
    this.getData()
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