// pages/voteDetail/index.js
import { getVoteDetail,startVote } from '../../../api/vote.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteId:null,
    totalData:{},
    selectIndex:null,
    activePart:{},
  },
  getDetail(id){
    getVoteDetail({voteId:id}).then(res=>{
      this.setData({
        totalData:res
      })
    })
  },

  //点击 投票
  toDecideVote(){
    if(this.data.selectIndex===null){
      return wx.showToast({
        title: '请选择投票选项',
        icon:'none'
      })
    }
    console.log(app,'-=-=-')
    let params = {
      createBy: app.globalData.wechat_id,
      partId: this.data.activePart.partId,
      voteId: this.data.activePart.voteId
    }
    startVote(params).then(res=>{
      if(res){
        return wx.showToast({
          title: '投票成功',
          icon: 'success'
        })
      }
    })
  },
  //切换投票选项
  changeSelect(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      selectIndex: index,
      activePart: this.data.totalData.partList[index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let voteId =options.voteId
    if(voteId){
      this.setData({
        voteId: voteId
      })
      if (voteId) {
        this.getDetail(voteId)
      }
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

  }
})