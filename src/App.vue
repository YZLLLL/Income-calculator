<template>
  <h1 style="text-align:center">收入计算器</h1>
  <div class="flex center">
    <div class="btn add-btn" @click="flag.user=true">添加用户</div>
    <div class="btn modify-btn" @click="flag.setting=true">修改设置</div>
  </div>
  <UserInfo v-if="flag.user" @getUser="getUser" @close="close" />
  <Setting v-if="flag.setting" :rateForm="rateForm" @closeSetting='closeSetting' @modifySetting='modifySetting' />
  <DataTable :userList='userList' @showDetails='showDetails' />
  <Details v-if="flag.details" :item="info.details" @closeDetails='closeDetails' />
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Setting from '@/components/Setting.vue'
import DataTable from '@/components/DataTable.vue'
import Details from '@/components/Details.vue'
import { reactive } from '@vue/reactivity'
import {nanoid} from 'nanoid'
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
    // 五险一金、个人所得税
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
      // tax:[3,10,20,25,30,35,45],
      tax:[{title:'不超过1500元的',rate:3},
      {title:'超过1500元⾄4500元的部分',rate:10},
      {title:'超过4500元⾄9000元的部分',rate:20},
      {title:'超过9000元⾄35000元的部分',rate:25},
      {title:'超过35000元⾄55000元的部分',rate:30},
      {title:'超过55000元⾄80000元的部分',rate:35},
      {title:'超过80000元的部分',rate:45}],
      levelForm:{
        A:[5000,20],
        B:[700,10],
        C:[100,5],
        D:[0,0]
      }
    })
    // 添加用户
    const getUser = userInfo => {
      userList.push(calculate(userInfo,rateForm))
      flag.user = false
    }
    // 关闭useInfo组件
    const close = () => {
      flag.user = false   
    }
    // 保存setting
    const modifySetting = ({insurance,tax,levelForm}) => {
      rateForm.insurance = insurance
      rateForm.tax = tax
      rateForm.levelForm = levelForm
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
        id:nanoid(),
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

    // 计算五险一金
    const getInsurance = (userInfo,rateForm) => {
      let {wages,level,name} = userInfo
      let {insurance,levelForm} = rateForm
      let age=[],medical=[],unemployment=[],maternity=[],injury=[],house=[],base=0,insurancesTotal=[]
      if(wages<=3022){
        base = 3022
      }else if(wages>=15108){
        base = 15108
      }else{
        base = wages
      }
      age[0] = base*insurance.age[0]/100
      age[1] = base*insurance.age[1]/100
      age[2] = age[0] + age[1]
      medical[0] = base*insurance.medical[0]/100
      medical[1] = base*insurance.medical[1]/100
      medical[2] = medical[0] + medical[1]
      unemployment[0] = base*insurance.unemployment[0]/100
      unemployment[1] = base*insurance.unemployment[1]/100
      unemployment[2] = unemployment[0] + unemployment[1]
      maternity[0] = base*insurance.maternity[0]/100
      maternity[1] = base*insurance.maternity[1]/100
      maternity[2] = maternity[0] + maternity[1]
      injury[0] = base*insurance.injury[0]/100
      injury[1] = base*insurance.injury[1]/100
      injury[2] = injury[0] + injury[1]
      house[0] = base*insurance.house[0]/100
      house[1] = base*insurance.house[1]/100
      house[2] = house[0] + house[1]
      insurancesTotal[0] = age[0] + medical[0] + unemployment[0] + maternity[0] + injury[0] + house[0]
      insurancesTotal[1] = age[1] + medical[1] + unemployment[1] + maternity[1] + injury[1] + house[1]
      // 绩效工资
      let meritPay = levelForm[level][0] + levelForm[level][1]*wages/100
      // 税前收入
      let preTax = wages + meritPay - insurancesTotal[1]
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
        preTax
      }
    }



    // 计算个人所得税
    /**
     * params {n} 税前收入-3500
     * params {tax} 个人所得税率表
     */
    const getTax = (n,tax) => {
      let res = 0
      let arr = []
      arr[0] = 0
      arr[1] = 1500*tax[0].rate/100 + arr[0]
      arr[2] = 3000*tax[1].rate/100 + arr[1]
      arr[3] = 4500*tax[2].rate/100 + arr[2]
      arr[4] = 26000*tax[3].rate/100 + arr[3]
      arr[5] = 20000*tax[4].rate/100 + arr[4]
      arr[6] = 25000*tax[5].rate/100 + arr[5]
      if(n>80000){
        res +=  (n-80000)*tax[6].rate/100 + arr[6]
      }
      if(n>55000&&n<=80000){
        res +=  (n-55000)*tax[5].rate/100 + arr[5]
      }
      if(n>35000&&n<=55000){
        res += (n-35000)*tax[4].rate/100 + arr[4]
      }
      if(n>9000&&n<=35000){
        res += (n-9000)*tax[3].rate/100 + arr[3]
      }
      if(n>4500&&n<=9000){
        res += (n-4500)*tax[2].rate/100 + arr[2]
      }
      if(n>1500&&n<=4500){
        res += (n-1500)*tax[1].rate/100 + arr[1]
      }
      if(n<=1500){
        res += n*tax[0].rate/100 + arr[0]
      }
      return res
    }

    // 展示工资详情
    const info = reactive({
      details:{},
    })
    const showDetails = i => {
      info.details = i
      flag.details = true
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
      closeDetails
    }
  }
}
</script>

<style lang="less">
.btn{
  display: inline-block;
  width: 80px;
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