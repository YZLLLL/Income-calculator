<template>
  <div class="mask">
    <div class="container">
      <div class="cards">
        <span @click="handleActive('insurance')" :class="['btn','card',flag.insurance ? 'card-active' : '']">五险一金设置</span>
        <span @click="handleActive('tax')" :class="['btn','card',flag.tax ? 'card-active' : '']">个人所得税设置</span>
        <span @click="handleActive('levelForm')" :class="['btn','card',flag.levelForm ? 'card-active' : '']">绩效工资标准设置</span>
      </div>
      <div class="form" v-show="flag.insurance">
        <div class="insurance-item">
          <span class="title">项目</span><span class="title">个人缴纳比例(%)</span><span class="title">单位缴纳比例(%)</span>
        </div>
        <div class="insurance-item" v-for="item in insurance" :key="item[2]">
          <span class="title">{{item[2]}}:</span>
          <input type="number" class="amount" v-model="item[1]" />
          <input type="number" class="amount" v-model="item[0]" />
        </div>
      </div>
      <div class="form" v-show="flag.tax">
        <div class="insurance-item">
          <span class="i-title title">应纳税收入</span><span class="i-rate title">税率(%)</span>
        </div>
        <div class="insurance-item" v-for="item in tax" :key="item.title">
          <span class="i-title title">{{item.title}}:</span>
          <input type="number" class="i-rate amount" v-model="item.rate" />
        </div>
      </div>
      <div class="form" v-show="flag.levelForm">
        <div class="insurance-item">
          <span class="l-title title">绩效评分</span><span class="l-rate title">绩效工资</span>
        </div>
        <div class="insurance-item" v-for="(value,key) in levelForm" :key="key">
          <span class="l-title title">{{key}}</span>
          <input type="number" class="l-rate amount" v-model="value[0]" />
          <span>{{`+ 岗位工资 *`}}</span>
          <input type="number" class="l-rate amount" v-model="value[1]" />%
        </div>
      </div>
      <div>
        <div class="btn setBtn" @click="onBtnClick">保存所有</div>
        <div class="btn cancel" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props:{
    rateForm:{
      type:Object
    }
  },
  setup(props,context){
    const flag = reactive({
      insurance:true,
      tax:false,
      levelForm:false
    })
    const handleActive = key => {
      flag.insurance = false
      flag.tax = false
      flag.levelForm = false
      flag[key] = true
    }
    const insurance = reactive(props.rateForm.insurance)
    const tax = reactive(props.rateForm.tax)
    const levelForm = reactive(props.rateForm.levelForm)
    const onBtnClick = () => {
      context.emit('modifySetting',{insurance,tax,levelForm})
    }
    const close = () => {
      context.emit('closeSetting')
    }
    return {
      flag,
      handleActive,
      insurance,
      tax,
      levelForm,
      onBtnClick,
      close
    }
  }
}
</script>

<style lang="less" scoped>
.mask{
    font-size: 18px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.1);
  .container{
    width: 600px;
    height: 480px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    .card{
      width: 160px;
      border-radius: 0;
      background-color: #eee;
      color: #000;
    }
    .card-active{
      color: #fff;
      background-color: #e6a23c;
    }
    .form{
      width: 480px;
      height: 324px;
      font-size: 18px;
      .insurance-item{
        margin: 10px 0;
      }
      .title{
        display: inline-block;
        width: 140px;
        margin: 0 10px;
      }
      .amount{
        width: 120px;
        margin: 0 10px;
        font-size: 18px;
        box-sizing: border-box;
        height: 30px;
        padding: 0 12px;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.1);
        outline-color: rgba(0,0,0,0.2);
      }
      .i-title{
        width: 260px;
      }
      .i-rate{
        margin-left: 70px;
        width: 100px;
      }
      .l-title{
        width: 80px;
        text-align: center;
      }
      .l-rate{
        width: 100px;
      }
    }
    .setBtn{
      width: 120px;
    }
  }
}
</style>