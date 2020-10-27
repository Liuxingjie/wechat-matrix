
import { createVote } from '../../../../api/vote.js'
const ComRequest = require('../../../../utils/util');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitForm:{
      optionList:[{},{}],
      isRepeatVote:2,
      isHideNum:2,
      selectList:[],
      title:'',
      introduce:'',
      startTime:'2021-05-20 05:20',
      endTime:'2021-05-20 05:20',
      voteNum:1
    },
    picker:[],
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let newData = ComRequest.formatTime(new Date());
    this.setData({
      [`submitForm.startTime`]: newData,
      [`submitForm.endTime`]:newData
    })
    this.initPicker()
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
  toCreate() {
    let params = {
      ...this.data.submitForm,
      createBy: app.globalData.wechat_id,
      type: 2,
    }
    let pramsKeys = ['title', 'introduce', 'startTime', 'endTime', 'isHideNum', 'isRepeatVote', 'voteNum', 'selectList']
    let reqRes = ComRequest.requireParam(params, pramsKeys)
    if (reqRes) {
      createVote(params).then(res => {
        wx.navigateTo({
          url: `/pages/my/myVote/index?isMyCreate=1&tabActive=0`,
        })
      })
    }
    // 
  },
  onPickerChange3: function (e) {
    console.log(e.detail);
    let key = e.currentTarget.dataset.key;
    this.setData({
      [`submitForm.${key}`]: e.detail.dateString
    })
  },
  //改变switch 公共方法
  changeSwitch(e) {
    let key = e.target.dataset.key,
      value = e.detail.value;
    this.setData({
      [`submitForm.${key}`]: value ? 1 : 2
    })
  },
  //改变input 公共方法
  changeInputValue(e) {
    let key = e.target.dataset.key;
    let value = e.detail.value;
    this.setData({
      [`submitForm.${key}`]: value
    })
  },
  //改变数据参数
  changeSelectValue(e) {
    let index = e.target.dataset.index;
    let value = e.detail.value;
    this.setData({
      [`submitForm.selectList[${index}]`]: value
    })
  },
  deleteList(e) {
    let index = e.currentTarget.dataset.index;
    this.data.submitForm.optionList.splice(index, 1)
    this.setData({
      ['submitForm.optionList']: this.data.submitForm.optionList
    })
  },
  addList() {
    this.data.submitForm.optionList.push({})
    this.setData({
      ['submitForm.optionList']: this.data.submitForm.optionList
    })
  },
  //修改时间
  DateChange(e) {
    let key = e.currentTarget.dataset.key
    this.setData({
      [`submitForm.${key}`]: e.detail.value
    })
  },

  //下拉选择项
  PickerChange(e) {
    let key = e.target.dataset.key,
      arrayName = e.target.dataset.array,
      index = e.detail.value;
    this.setData({
      [`submitForm.${key}`]: this.data[arrayName][index].value
    })
  },

  //初始化投票次数的数据源
  initPicker() {
    let arr = [];
    for (let i = 1; i <= 50; i++) {
      arr.push({
        label: i + '次',
        value: i
      })
    }
    this.setData({
      picker: arr
    })
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