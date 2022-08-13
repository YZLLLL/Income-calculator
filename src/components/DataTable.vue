<template>
  <div class="center flex td">
    <span class="span">姓名</span>
    <span class="span">岗位工资</span>
    <span class="span">绩效工资</span>
    <span class="span">五险一金 (个人)</span>
    <span class="span">五险一金 (单位)</span>
    <span class="span">税前收入</span>
    <span class="span">扣税</span>
    <span class="span">税后收入</span>
    <span class="span">操作</span>
  </div>
  <template v-if="userList.length">
    <div class="center flex" v-for="item in userList" :key="item.id">
      <span class="span">{{item.name}}</span>
      <span class="span">{{roundNumber(item.wages)}}</span>
      <span class="span">{{roundNumber(item.meritPay)}}</span>
      <span class="span">{{roundNumber(item.insurancesTotal[1])}}</span>
      <span class="span">{{roundNumber(item.insurancesTotal[0])}}</span>
      <span class="span">{{roundNumber(item.preTax)}}</span>
      <span class="span">{{roundNumber(item.taxCount)}}</span>
      <span class="span">{{roundNumber(item.realIncome)}}</span>
      <span class="span">
        <div @click="onShowDetailsClick(item)" class="btn">查看详情</div>
      </span>
    </div>
  </template>
  <div class="center flex none" v-else>
    暂时没有数据，请添加用户~
  </div>
<div>

</div>
</template>

<script>
import {roundNumber} from '@/utils/calculate.js'
export default {
  props:{
    userList:{
      type:Object
    }
  },
  setup(props,context){
    const onShowDetailsClick = item => {
      context.emit('showDetails',item)
    }

    return {
      roundNumber,
      onShowDetailsClick
    }
  }
}
</script>

<style lang="less" scoped>
.span{
  display: inline-block;
  width: 140px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid rgb(228,228,228);
}
.td{
  margin-top: 20px;
 .span{
    background-color: rgb(248,248,248);
  }
}
.none{
  width: 1260px;
  margin: 0 auto;
  height: 200px;
  box-sizing: border-box;
  border: 1px solid rgb(228,228,228);
  border-top:none ;
}
</style>
