
const app = getApp()
import {toLogin} from '../../api/user'

Page({

  //页面的初始数据
  data: {

  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {},
  //生命周期函数--监听页面显示
  onShow: function () {},
  //生命周期函数--监听页面隐藏
  onHide: function () {},
  //生命周期函数--监听页面卸载
  onUnload: function () {},
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {},
  //页面上拉触底事件的处理函数
  onReachBottom: function () {},
  //用户点击右上角分享
  onShareAppMessage: function () {},
  //授权登录
  bindGetUserInfo (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var userInfo = e.detail.userInfo
      console.log(e.detail.userInfo)
      if(userInfo){    
        app.globalData.userInfo = userInfo      
        wx.setStorageSync('userInfo', userInfo)      
        wx.login({      
          success (res) {  
            console.log(res.code)
            if (res.code) {      
            //这个code就是我要的      
              toLogin({        
                sign:res.code, 
                name:userInfo.nickName     
              }).then(res=>{        
                if(res.code==200){        
                  wx.showToast({          
                  title:'登录成功',          
                  })              
                  wx.navigateBack({          
                    delta: 1          
                  })      
                }      
              })    
            } else {      
              console.log('登录失败！' + res.errMsg)      
            }    
          }    
        })  
      
      }else{    
        wx.showToast({      
        title: '取消将影响体验，请重新授权登录',      
        icon:'none'      
        })    
      }  
    }  
  },

})