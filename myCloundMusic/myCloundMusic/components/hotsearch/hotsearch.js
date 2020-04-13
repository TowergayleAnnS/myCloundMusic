// components/hotsearch/hotsearch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotarr:{
      type:Array,
      value:[]
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
    playHotMucic(e){
      console.log(e.currentTarget.dataset.hotitem)
    }
  }
})
