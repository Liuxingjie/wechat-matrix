// components/bottomBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[
        { title: '首页', name: 'home', url: '/pages/home/home', imgUrl: '/images/home.png', activeUrl:'/images/home-active.png'},
        { title: '发起投票', url: '/pages/index/index',isCenter:true,imgUrl:'/images/center.png'},
        {title:'个人中心',name:'my',url:'/pages/my/my',imgUrl:'/images/my.png',activeUrl:'/images/my-active.png'},
      ]
    },
    active:{
      type:String,
      value:'home'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    test:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(tapData){
      let data = tapData.currentTarget.dataset.item;
      wx.redirectTo({
        url: data.url
      })
    }
  }
})
