

/*
*接受参数
***btnName  按钮名称
***class    样式 primary主色   white 白色 带border
*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:'测试'
    },
    className:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toClick(){
      this.triggerEvent('bindtap')
    }
  }
})
