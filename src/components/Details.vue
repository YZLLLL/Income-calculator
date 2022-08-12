<template>
<div class="mask">
  <div class="container">
    <div class="item">
      <span class="props">姓名:</span>
      <input class="value update" type="text" v-model="name">
    </div>
    <div class="item">
      <span class="props">岗位工资:</span>
      <input class="value update" type="number" v-model="wages">
    </div>
    <div class="item">
      <span class="props">绩效评分:</span>
      <select class="value update" v-model="level">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
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
    <div>
      <div class="btn" @click="updateUser">保存</div>
      <div class="btn del-btn" @click="deleteUser">删除用户</div>
      <div class="btn cancel" @click="close">关闭</div>
    </div>
  </div>
</div>


</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props:{
    item:{
      type:Object
    }
  },
  setup(props,context){
    let name = ref(props.item.name)
    let wages = ref(props.item.wages)
    let level = ref(props.item.level)
    const updateUser = () => {
      context.emit('updateUser',{id:props.item.id,name,wages,level})
    }
    const deleteUser = () => {
      context.emit('deleteUser',props.item.id)
    }
    const close = () => {
      context.emit('closeDetails')
    }
    return {
      name,
      wages,
      level,
      updateUser,
      deleteUser,
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
        font-size: 18px;
        border: 1px solid rgba(0,0,0,0.1);
        outline-color: rgba(0,0,0,0.2);
        height: 30px;
        line-height: 30px;
        width: 220px;
        padding-left: 10px;
        border-radius: 5px;
        box-sizing: border-box;
        background-color: #eee;
        opacity: 0.5;
      }
      .update{
        opacity: 1;
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
        cursor:not-allowed;
        width: 100px;
        margin: 0 10px;
        background-color: #eee;
        line-height: 30px;
        border-radius: 5px;
        opacity: 0.5;
      }
    }
    .del-btn{
      margin-left: 40px;
      background-color: #f56c6c;
    }
  }
}
</style>