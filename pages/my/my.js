
//获取应用实例
const app = getApp()
import {pageTo} from '../../utils/util'
import { toLogin }  from '../../api/user.js'
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isBack:false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //去我的投票
  toMyVoteList(e){
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/my/myVote/index?type=${type}`,
    }) 
  },
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.errMsg =="getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      //验证用户是否存在于数据库
      wx.login({
        success: codeObj => {
          debugger;
         if(codeObj.code){
           let params = {
              nickName:e.detail.userInfo.nickName,
              sign:codeObj.code,
              avatar:e.detail.userInfo.avatarUrl,
              gender:e.detail.userInfo.gender,
              city:e.detail.userInfo.city,
              country:e.detail.userInfo.country,
              province:e.detail.userInfo.province,
              type:'tp',
              createBy:'admin'
           }
          toLogin(params).then(res=>{
            if(res){
              app.globalData.wechat_id = res.wechat_id
              wx.setStorageSync('userInfo', app.globalData.userInfo)
              wx.setStorageSync('wechat_id', res.id)
            }
            if(this.data.isBack){
              wx.navigateBack({
                delta: 2
              })
            }
          })
         }
        }
      })
    }else{
      wx.showToast({
        title: '获取异常',
        icon: 'none',
        duration: 2000
      })
    }
  },
  pageTo(e){
    pageTo(e.currentTarget.dataset.url,{
      a:1,
      b:2,
      c:3
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})
