//app.js
import { toLogin }  from './api/user'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
        this.globalData.userInfo = userInfo
        this.globalData.wechat_id = wx.getStorageSync('wechat_id')
    }else{
      // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              debugger;
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              if(res.userInfo) wx.setStorageSync('userInfo',res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    }

    


    


     
  },
  globalData: {
    userInfo: null,
    wechat_id:'',
    userId:'',
    // url:'https://www.xiangmx.top'
    url:'http://localhost:3000'
  }
})