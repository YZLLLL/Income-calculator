// 计算五险一金
export const getInsurance = (userInfo,rateForm) => {
  let {wages,level,name} = userInfo
  let {insurance,levelForm,minBase,maxBase} = rateForm
  let age=[],medical=[],unemployment=[],maternity=[],injury=[],house=[],base=0,insurancesTotal=[]
  if(wages<=minBase){
    base = minBase
  }else if(wages>=maxBase){
    base = maxBase
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
export  const getTax = (n,tax) => {
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

// 保留两位小数
export const roundNumber = (num,n=2) => {
  let str = num + ''
  if(str.indexOf('.')===-1){
    return num
  }else{
    return Number(num.toFixed(n))
  }
}