<template>
  <div class="mask">
    <div class="container">
      <div class="info-item">
        <span class="title">姓名：</span>
        <input class="text" v-model="userInfo.name" type="text">
        </div>
      <div class="info-item">
        <span class="title">岗位工资：</span>
        <input class="text" v-model="userInfo.wages" type="number">
        </div>
      <div class="info-item">
        <span class="title">绩效：</span>
        <select class="level" v-model="userInfo.level">
          <option value="">请选择绩效评分</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div>
        <div :class="['btn',isDisabled ? 'disable' : '']" @click="onBtnClick">添加</div>
        <div class="btn cancel" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
  setup(props,context){
    const userInfo = reactive({
      name:'',
      wages:'',
      level:''
    })
    const isDisabled = computed(()=>{
      return userInfo.name.trim()==''||userInfo.wages==''||userInfo.level.trim()==''
    })
    const onBtnClick = () => {
      context.emit('getUser',userInfo)
    }
    const close = () => {
      context.emit('close')
    }
    return {
      userInfo,
      isDisabled,
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
    width: 480px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    .info-item{
      width: 360px;
      margin: 20px 0;
      .text{
        font-size: 18px;
        box-sizing: border-box;
        height: 40px;
        padding: 0 12px;
        border-radius: 2px;
        border: 1px solid rgba(0,0,0,0.1);
        outline-color: rgba(0,0,0,0.2);
      }
      .level{
        width: 200px;
        height: 28px;
        font-size: 18px;
        padding: 0 2px;
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid rgba(0,0,0,0.1);
        outline-color: rgba(0,0,0,0.2);
      }
    }
  }
}
.title{
  display: inline-block;
  width: 100px;
}
</style>>