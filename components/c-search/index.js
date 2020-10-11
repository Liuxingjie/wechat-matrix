// components/c-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    input(e){
      this.setData({
        inputValue:e.detail.value
      })
    },
    search(){
      this.triggerEvent('change', this.data.inputValue)
    }
  }
})
