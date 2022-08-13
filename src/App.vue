<template>
  <h1 style="text-align:center">收入计算器</h1>
  <div class="flex center">
    <div class="btn add-btn" @click="flag.user=true">添加用户</div>
    <div class="btn modify-btn" @click="flag.setting=true">修改设置</div>
  </div>
  <UserInfo v-if="flag.user" @getUser="getUser" @close="close" />
  <Setting v-if="flag.setting" :rateForm="rateForm" @closeSetting='closeSetting' @modifySetting='modifySetting' />
  <DataTable :userList='userList' @showDetails='showDetails' />
  <Details v-if="flag.details" :item="info.details" @updateUser='updateUser' @deleteUser='deleteUser' @closeDetails='closeDetails' />
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Setting from '@/components/Setting.vue'
import DataTable from '@/components/DataTable.vue'
import Details from '@/components/Details.vue'
import { reactive } from '@vue/reactivity'
import {nanoid} from 'nanoid'
import {getInsurance,getTax} from '@/utils/calculate.js'
export default {
  components:{UserInfo,Setting,DataTable,Details},
  setup(){
    // 遮罩控制器
    const flag = reactive({
      user:false,
      details:false,
      setting:false
    })
    // 用户列表
    const userList = reactive([])
    // 五险一金、个人所得税 表
    const rateForm = reactive({
      insurance:{
        // [公司，个人，title]
        age:[21,8,'养⽼保险'],
        medical:[11,2,'医疗保险'],
        unemployment:[1.5,0.5,'失业保险'],
        maternity:[1,0,'⽣育保险'],
        injury:[0.5,0,'⼯伤保险'],
        house:[7,7,'住房公积金']
      },
      tax:[{title:'不超过1500元的',rate:3},
      {title:'超过1500元⾄4500元的部分',rate:10},
      {title:'超过4500元⾄9000元的部分',rate:20},
      {title:'超过9000元⾄35000元的部分',rate:25},
      {title:'超过35000元⾄55000元的部分',rate:30},
      {title:'超过55000元⾄80000元的部分',rate:35},
      {title:'超过80000元的部分',rate:45}],
      minBase:3022,
      maxBase:15108,
      levelForm:{
        A:[5000,20],
        B:[700,10],
        C:[100,5],
        D:[0,0]
      }
    })
    // 添加用户
    const getUser = userInfo => {
      userList.push({id:nanoid(),...calculate(userInfo,rateForm)})
      flag.user = false
    }
    // 关闭useInfo组件
    const close = () => {
      flag.user = false   
    }
    // 保存setting
    const modifySetting = ({insurance,tax,levelForm,minBase,maxBase}) => {
      rateForm.insurance = insurance
      rateForm.tax = tax
      rateForm.levelForm = levelForm
      rateForm.minBase = minBase
      rateForm.maxBase = maxBase
      userList.forEach((v,i) =>{
        userList[i] = calculate(v,rateForm)
      })
      flag.setting = false
    }
    // 取消保存setting
    const closeSetting = () => {
      flag.setting = false
    }
    // 计算五险一金、个人所得税
    const calculate = (userInfo,rateForm) => {
      let {
        name,
        wages,
        level,
        meritPay,
        age,
        medical,
        unemployment,
        maternity,
        injury,
        house,
        insurancesTotal,
        preTax
      } = getInsurance(userInfo,rateForm)
      let {tax} = rateForm
      // 扣税
      let taxCount = getTax(preTax-3500,tax)
      // 真实收入
      let realIncome = preTax - taxCount
      return {
        name,
        wages,
        level,
        meritPay,
        age,
        medical,
        unemployment,
        maternity,
        injury,
        house,
        insurancesTotal,
        preTax,
        taxCount,
        realIncome,
      }
    }

    // 展示工资详情
    const info = reactive({
      details:{},
    })
    const showDetails = i => {
      info.details = i
      flag.details = true
    }
    // 更新用户消息
    const updateUser = ({id,name,wages,level}) => {
        userList.forEach(v=>{
        if(v.id==id){
          let user = calculate({name:name.value,wages:wages.value,level:level.value},rateForm)
          v = Object.assign(v,user)
        }
      })
      
      flag.details = false
    }
    // 删除用户
    const deleteUser = id => {
      userList.forEach((v,i)=>{
        if(v.id==id){
          userList.splice(i,1)
        }
      })
      flag.details = false
    }
    // 关闭工资详情
    const closeDetails = () => {
      flag.details = false
    }
    return {
      flag,
      userList,
      rateForm,
      info,
      getUser,
      close,
      modifySetting,
      closeSetting,
      showDetails,
      updateUser,
      deleteUser,
      closeDetails
    }
  }
}
</script>

<style lang="less">
.btn{
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: rgb(64, 158, 255);
}
.add-btn{
  background-color: #67c23a;
}
.modify-btn{
  margin-left: 100px;
  background-color: #f56c6c;
}
.cancel{
  margin-left: 40px;
  color: #606266;
  border: 1px solid rgb(220,223,230);
  background-color: #fff;
}
.disable{
  color: #eee;
  cursor:not-allowed;
  background-color: rgba(0, 0, 0, 0.5);
}

.flex{
  display: flex;
}
.center{
  justify-content: center;
  align-items: center;
}
</style>