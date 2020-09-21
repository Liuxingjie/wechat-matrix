let app = getApp();
const qs = require('./qs.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getToken = () => {
  if (app.globalData.token) {
    return new Promise((resolve) => {
      resolve(app.globalData.token)
    })
  } else {
    return new Promise((resolve) => {
      app.getTokenCallback = res => {
        resolve(res.data.data.token)
      }
    })
  }
}

const getUserInfo = () => {
  var myInfo = wx.getStorageSync('uInfo');
  if (myInfo.userInfo) {
    return new Promise((resolve, reject) => {
      resolve(myInfo)
    })
  } else {
    return new Promise((resolve, reject) => {
      app.userInfoReadyCallback = res => {
        resolve(res)
      }
    })
  }
}

var postRequest = (options, res) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${app.globalData.url}${options.url}`,
      method: 'POST',
      data: options.data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${res}`
      },
      success: res => {
        if (res.data.state) {
          if (typeof options.success == "function") {
            options.success(res);
          }
        } else {
          if (typeof options.fail == "function") {
            options.fail(res);
          }
          let userInfo = wx.getStorageSync('uInfo');
          if (res.data.code == -1000) {
            wx.removeStorageSync('loginToken');
            wx.removeStorageSync('tokenInfo');
            if (userInfo) {
              wx.showToast({
                title: '微信授权已过期，请重新授权',
                icon: 'none',
                duration: 2000
              })
              wx.setStorageSync("myandcar", 'true');
              if (app.globalData.isLogin==1){
                wx.removeStorageSync('uInfo');
                setTimeout(() => {
                  wx.redirectTo({
                    url: '/pages/login-guide/login-guide'
                  })
                  app.globalData.isLogin = 0;
                }, 2000)
                return
              }
            } else {
              wx.showToast({
                title: '请先授权',
                icon: 'none',
                duration: 2000
              })
              wx.setStorageSync("myandcar", 'true');
            }
            wx.removeStorageSync('uInfo');
            if (!app.globalData.loginState) {
              app.globalData.loginState = 1
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/login-guide/login-guide'
                })
              }, 2000)
            }


          } else if (res.data.code == -1100) {
            if (userInfo) {
              wx.showToast({
                title: '请登录',
                icon: 'none',
                duration: 1500
              })
              if (!app.globalData.loginState) {
                app.globalData.loginState = 1
                wx.setStorageSync("isLogin", 'true');
                setTimeout(() => {
                  wx.navigateTo({
                    url: '/pages/login-first/login-first'
                  })
                }, 500)
              }
            } else {
              wx.setStorageSync("myandcar", 'true');
              wx.showToast({
                title: '请授权登录',
                icon: 'none',
                duration: 1500
              })
              if (!app.globalData.loginState) {
                app.globalData.loginState = 1
                wx.removeStorageSync('uInfo');
                setTimeout(() => {
                  wx.navigateTo({
                    url: '/pages/login-guide/login-guide'
                  })
                }, 1500)
              }
            }

          } else {
            options.success(res);
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }

        }

      },
      fail: err => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  })
}


const header = {
  "Content-Type": "application/x-www-form-urlencoded"
};
const setParams = (url, param = {}, opt = {}) => {
  let curParams = {
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept":"application/json",
    }
  };
  curParams.header = {
    ...header,
    ...curParams.header,
    ...opt.header,
  };
  // get请求和post请求数据区分
  if (opt.method === "get") {
    curParams = {
      ...curParams,
      data: param,
      method: opt.method,
    };
  } else {
    if (opt.pageSize || opt.pageIndex) {
      curParams.data = {
        'condition': data,
        pageIndex: opt.pageIndex,
        pageSize: opt.pageSize,
      }
    } else {
      curParams.method = opt.method || 'post'
      curParams.data = {
        ...param,
      };
    }
  }
  //需要qs 转换
  if (opt.qs){
    curParams.data = qs.stringify(curParams.data)
  }
  // 请求参数
  return {
    method: "post",
    url: `${app.globalData.url}${url}`,
    ...curParams
  };
};
const fetch = (url, param = {}, opt = {})=>{
  return new Promise((resolve,reject)=>{
    const opts = setParams(url, param, opt);
    if (!opt.noLoading){
      wx.showLoading({
        title: '数据加载中',
      })
    }
    wx.request({
      ...opts,
      success: res => {
        // 通过状态来控制
        if (res.statusCode == 200 && (res.data.status==200||res.data.code==200) ){
          wx.hideLoading()
          resolve(res.data.data || res.data);
        }else{
          wx.hideLoading()
          if(res.data.success===false){
            wx.showToast({
              title: res.data.msg || res.msg,
              icon: 'none'
            });
            return reject(res.data)
          } else if (!res.data.state){
            if (opt.needToast){
              return wx.showToast({
                title: res.data.msg || res.msg,
                icon: 'none'
              });
            }
           
          }
        }
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })

  })
}




var getRequest = (options, res) => {
  wx.request({
    url: `${app.globalData.url}${options.url}`,
    method: 'GET',
    data: options.data,
    header: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${res}`
    },
    success: res => {
      if (res.data.state) {
        if (typeof options.success == "function") {
          options.success(res);
        }
      } else {
        if (typeof options.fail == "function") {
          options.fail(res);
        }
        let userInfo = wx.getStorageSync('uInfo');
        if (res.data.code == -1000) {
          wx.removeStorageSync('loginToken');
          wx.removeStorageSync('tokenInfo');

          if (userInfo) {
            wx.showToast({
              title: '微信授权已过期，请重新授权',
              icon: 'none',
              duration: 2000
            })
            wx.setStorageSync("myandcar", 'true');
            if (app.globalData.isLogin == 1) {
              wx.removeStorageSync('uInfo');
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/login-guide/login-guide'
                })
                app.globalData.isLogin = 0;
              }, 2000)
              return
            }
          } else {
            wx.showToast({
              title: '请先授权',
              icon: 'none',
              duration: 2000
            })
            wx.setStorageSync("myandcar", 'true');
          }
          wx.removeStorageSync('uInfo');
          if (!app.globalData.loginState) {
            app.globalData.loginState = 1
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/login-guide/login-guide'
              })
            }, 2000)
          }
        } else if (res.data.code == -1100) {
          if (userInfo) {
            wx.showToast({
              title: '请登录',
              icon: 'none',
              duration: 2000
            })

            if (!app.globalData.loginState) {
              app.globalData.loginState = 1
              wx.setStorageSync("isLogin", 'true');
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/login-first/login-first'
                })
              }, 500)
            }

          } else {
            wx.setStorageSync("myandcar", 'true');
            wx.showToast({
              title: '请授权登录',
              icon: 'none',
              duration: 1500
            })
            if (!app.globalData.loginState) {
              app.globalData.loginState = 1
              wx.removeStorageSync('uInfo');
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/login-guide/login-guide'
                })
              }, 1500)
            }
          }

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          options.success(res);
        }
      }
    },
    fail:err => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    }
  })
}

const wxget = (options) => {
  let res = wx.getStorageSync('tokenInfo')
  if (res) {
    getRequest(options, res)
  } else {
    app.getToken().then((res) => {
      getRequest(options, res)
    })
  }
}

const isCanSubmit = (data) => {
  for (let key in data) {
    if (!data[key]) {
      return false
    }
  }
  return true;
}
//手机号验证
const verifyMobile = (data) => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (data == '' || data == undefined || data == null) {
    return ''
  } else {
    if ((!reg.test(data)) && data != '') {
      return '请输入正确的电话号码';
    } else {
      return ''
    }
  }
}
// 邮箱验证
const verifyEmail=(data)=>{
  const reg = /^\w+@[a-z0-9]+\.[a-z]+$/i;/*邮箱不区分大小写*/
  if (data == '' || data == undefined || data == null) {
    return ''
  } else {
    if ((!reg.test(data)) && data != '') {
      return '请输入正确的邮箱';
    } else {
      return ''
    }
  }
}

//验证是否已经登录
const is_login=(url)=> {
  fetch('/home/get_login', {}, {method: 'get'}).then(res=>{
    console.log(res);
  })


  //判断用户是否有缓存，有缓存就不需要登录
  // let haveCookie = wx.getStorageSync('cookies_mobile')
  // if (!haveCookie) { //有缓存 直接跳首页
  //   wx.switchTab({
  //     url: 'pages/login/login',
  //   })
  // }
}
// 时间值相减
const formatDateTime = (inputTime)=>{
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}


//根据数据改变底部导航链接以及头部搜索名称
const getRecommonUrl = (param)=>{
  return new Promise((resolve, reject) => {
    wx.request({
      method: "get",
      url: `${app.globalData.url}/home/index/checkRecommen`,
      data:param
     ,
      success: res => {
        resolve(res)
      },
      fail: err => {
        wx.hideLoading();
      }
    })
  })
}
const getShopInfo = (param)=>{
  return new Promise((resolve, reject) => {
    wx.request({
      method: "get",
      url: `${app.globalData.url}/home/wap/shopInfo`,
      data: param
      ,
      success: res => {
        resolve(res)
      },
      fail: err => {
        wx.hideLoading();
      }
    })
  })
}
//转换地址
const getParamsUrl= (url, item)=> {
  if (!url) {
    return ''
  }
  if (url.indexOf('twoPageIndex') > -1) {
    let result = url.match(/twoPageIndex(\S*)/)[1];
    return `/pages/twoPage/twoPage${result}`;
  } else if (url.indexOf('goods') > -1) {
    let result = url.match(/goods(\S*)/)[1];
    return `/pages/detail-page/detail-page${result}`;
  } else if (url.indexOf('seckillList') > -1) {  //秒杀
    let result = url.match(/seckillList(\S*)/)[1];
    return `/pages/seckill-page/seckill${result}`;
  } else if (url.indexOf('recommend') > -1) {  //推荐
    let result = url.match(/recommend(\S*)/)[1];
    return `/pages/recommend/index${result}`;
  } else if (url.indexOf('coupon') > -1) {  //推荐
    let result = url.match(/coupon(\S*)/)[1];
    return `/pages/coupon/coupon${result}`;
  } else if (url.indexOf('presellList') > -1) {  //推荐
    let result = url.match(/presellList(\S*)/)[1];
    return `/pages/presell-page/presell-page${result}`;
  }
}
const changeBottomAndTop= (params)=>{
  return new Promise((resolve,reject)=>{
    Promise.all([getShopInfo(params), getRecommonUrl(params)]).then(res=>{
      let isSetCategory = res[0].data.data.isSetCategory || false;
      let url = getParamsUrl(res[1].data.data.url) || '';
      app.globalData.shopDetail.name= res[0].data.data.name;
      app.globalData.shopDetail.shop_id=res[0].data.data.id;
      app.globalData.shopId = res[0].data.data.id;
      if (isSetCategory) {
        let tabs = [
          { name: '首页', active: 0, activeName: 'home', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/index.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/index-1.png", linkUrl: "/pages/comPage/comPage" },
          { name: '分类', active: 1, activeName: 'classify', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/classify.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/classify-1.png", linkUrl: "/pages/classify/classify" },
          { name: '推荐', active: 2, activeName: 'suggest', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/recommend.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/recommend-1.png", linkUrl: url },
          { name: '购物车', active: 3, activeName: 'cart', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/shopping-cart.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/shopping-cart-1.png", linkUrl: "/pages/cart/cart" },
          { name: '我的', active: 4, activeName: 'my', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/My.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/My-1.png", linkUrl: "/pages/user/user" }
        ]
        app.updateUserInfo('bottomBar', tabs)
      } else {
        let tabs = [
          { name: '首页', active: 0, activeName: 'home', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/index.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/index-1.png", linkUrl: "/pages/comPage/comPage" },
          { name: '推荐', active: 1, activeName: 'suggest', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/recommend.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/recommend-1.png", linkUrl: url },
          { name: '购物车', active: 2, activeName: 'cart', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/shopping-cart.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/shopping-cart-1.png", linkUrl: "/pages/cart/cart" },
          { name: '我的', active: 3, activeName: 'my', iconPath: "//m.3000p.net/home/style/imgs/newH5/index/My.png", activePath: "//m.3000p.net/home/style/imgs/newH5/index/My-1.png", linkUrl: "/pages/user/user" }
        ]
        app.updateUserInfo('bottomBar', tabs)
      }
      resolve({all:true})
    })
  })
}
 
module.exports = {
  formatTime: formatTime,
  getToken,
  getUserInfo,
  wxget,
  isCanSubmit,
  verifyMobile,
  verifyEmail,
  fetch,
  is_login,
  formatDateTime,
  changeBottomAndTop,
  getParamsUrl
}