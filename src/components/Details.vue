<template>
<div class="mask">
  <div class="container">
    <div class="item">
      <span class="props">姓名:</span>
      <span class="value">{{item.name}}</span>
    </div>
    <div class="item">
      <span class="props">岗位工资:</span>
      <span class="value">{{item.wages}}</span>
    </div>
    <div class="item">
      <span class="props">绩效评分:</span>
      <span class="value">{{item.level}}</span>
    </div>
    <div class="item">
      <span class="props">绩效工资:</span>
      <span class="value">{{item.meritPay}}</span>
    </div>
    <div class="insurance">
      <div class="h6">五险一金详情</div>
      <div class="insurance-item"><span class="title"></span><span class="title">个人</span><span class="title">单位</span></div>
      <div class="insurance-item"><span class="title">养老保险:</span><span class="amount">{{item.age[1]}}</span><span class="amount">{{item.age[0]}}</span></div>
      <div class="insurance-item"><span class="title">医疗保险:</span><span class="amount">{{item.medical[1]}}</span><span class="amount">{{item.medical[0]}}</span></div>
      <div class="insurance-item"><span class="title">失业保险:</span><span class="amount">{{item.unemployment[1]}}</span><span class="amount">{{item.unemployment[0]}}</span></div>
      <div class="insurance-item"><span class="title">生育保险:</span><span class="amount">{{item.maternity[1]}}</span><span class="amount">{{item.maternity[0]}}</span></div>
      <div class="insurance-item"><span class="title">工伤保险:</span><span class="amount">{{item.injury[1]}}</span><span class="amount">{{item.injury[0]}}</span></div>
      <div class="insurance-item"><span class="title">住房公积金:</span><span class="amount">{{item.house[1]}}</span><span class="amount">{{item.house[0]}}</span></div>
      <div class="insurance-item"><span class="title">总计:</span><span class="amount">{{item.insurancesTotal[1]}}</span><span class="amount">{{item.insurancesTotal[0]}}</span></div>
    </div>
    <div class="item">
      <span class="props">税前收入:</span>
      <span class="value">{{item.preTax}}</span>
    </div>
    <div class="item">
      <span class="props">扣税:</span>
      <span class="value">{{item.taxCount}}</span>
    </div>
    <div class="item">
      <span class="props">税后收入:</span>
      <span class="value">{{item.realIncome}}</span>
    </div>
    <div class="btn" @click="close">关闭</div>
  </div>
</div>


</template>

<script>
export default {
  props:{
    item:{
      type:Object
    }
  },
  setup(props,context){
    const close = () => {
      context.emit('closeDetails')
    }
    return {
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
    width: 580px;
    height: 820px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    .item{
      width: 360px;
      margin: 10px 0;
      .props{
        display: inline-block;
        width: 100px;
        margin-right: 30px;
      }
      .value{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 220px;
        padding-left: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        background-color: #eee;
      }
    }
    .insurance{
      width: 360px;
      text-align: center;
      .h6{
        font-weight: 550;
        text-align: center;
      }
      .insurance-item{
        margin: 10px 0;
      }
      .title{
        display: inline-block;
        width: 100px;
        margin: 0 10px;
      }
      .amount{
        display: inline-block;
        width: 100px;
        margin: 0 10px;
        background-color: #eee;
        line-height: 30px;
        border-radius: 5px;
      }
    }
    .btn{
        width: 80px;
        line-height: 40px;
        text-align: center;
        margin-top: 10px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        background-color: #f56c6c;
    }
  }
}
</style>