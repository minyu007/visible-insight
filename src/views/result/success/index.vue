<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.result.success']" />
    <div class="wrapper">
      <div class="header">
        <div class="eq">
          <p style="margin-left: 30px;color: white;font-size: 25px;font-weight: bold">Equity</p>
        </div>
        <p style="margin-left: 30px;margin-top: 70px;color: white;font-size: 16px">2 | TSENG,JONATHAN | 03 Nov 2023 | ESG: B(E:2.55,S:2.23,G:2.35)</p>
        <p style="margin-left: 30px;color: white;font-size: 16px">Owned / Allowed: 0.05%/0.99%</p>
        <p style="margin-left: 30px;color: white;font-size: 16px">Price / Mkt Caps:Usd 189.68 / USD 2,950,202m</p>
        <p style="position: absolute;top: 5px;right: 5%;font-weight: bold;color: white;font-size: 25px">APPLE INC(AAPL.US)</p>
        <p style="position: absolute;top: 27%;right: 5%;font-size: 16px;color:white;">Technology Hardware & Equipment | UNITED</p>
        <p style="position: absolute;top: 44%;right: 5%;font-size: 16px;color:white;">LI,JACKIE +8641139457059</p>
        <p style="position: absolute;top: 62%;right: 5%;font-size: 16px;color:white;">18 November 2023, 15:26(GMT+8)</p>
      </div>
      <div class="center">
        <p  @dblclick="dbc" style="position: relative;margin-left: 30px;font-size: 25px" :ref="el" class="t"></p>
        <input style="margin-left: 30px;position: absolute;top: 25px" v-model="t1" v-if="!b1" @keyup.enter="sub1">

        <div STYLE="background: aquamarine;width: 96%;position: relative">
          <p style="font-weight: bold;font-size: 17px;margin-left: 30px;position: relative;top: 5px">KEY TAKEAWAY:</p>
          <p :ref="el2" @dblclick="dbc1" style="position: relative;z-index: 10;left: 18%;top: -30px;font-size: 14px">ddd</p>
          <input style="position: relative;z-index: 10;left: 18%;top: -30px;" v-if="!b2" @keyup.enter="sub2" v-model="t2">
        </div>

        <div STYLE="background: aquamarine;width: 96%;position: relative">
          <p style="font-weight: bold;font-size: 17px;margin-left: 30px;position: relative;top: 5px">PM ACTION:</p>
          <p :ref="el3" @dblclick="dbc2" style="position: relative;z-index: 10;left: 18%;top: -30px;font-size: 14px">sss</p>
          <input style="position: relative;z-index: 10;left: 18%;top: -30px;" v-if="!b3" @keyup.enter="sub3" v-model="t3">
        </div>
        <p style="font-size: 16px;font-weight: bold;margin-left: 30px">Analysis & Outlook:</p>
        <div style="margin-left: 30px;height: 10px;width: 10px;border-left: brown 5px solid;border-top: white 5px solid;border-bottom: white 5px solid"></div> <p></p>
        <p :ref="el4" @dblclick="dbc3" style="position: relative;top: -28px;left: 60px;font-size: 14px">h</p>
        <input v-if="!b4" @keyup.enter="sub4" v-model="t4" style="position: relative;top: -52px;left: 60px;">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
let t1 = ref(''),b1=ref(true)
let t2 = ref(''),b2 = ref(true)
let t3 = ref(''),b3 = ref(true)
let t4 = ref(''),b4 = ref(true)
let p = ref<HTMLElement | null>(null)
let p1 = ref<HTMLElement | null>(null)
let p2 = ref<HTMLElement | null>(null)
let p3 = ref<HTMLElement | null>(null)
function el(e:HTMLElement){
  console.log(e)
  p.value=e
 // e.innerText='<Add Title here>'
}
function el2(e:HTMLElement){
  p1.value=e
}
function el3(e:HTMLElement){
  p2.value=e
}
function el4(e:HTMLElement){
  p3.value=e
}
onMounted(()=>{
  p.value.innerText='<Add Title here>'
  p1.value.innerText='<Add Key Takeaway here>'
  p2.value.innerText='<Add PM ation here>'
  p3.value.innerText='<Add bullet here>'
})
function dbc(e){
  b1.value=false
  p.value.style.top='-2000px'
}
function dbc1(e){
  b2.value=false
  p1.value.style.top="-2000px"
}
function dbc2(e){
  b3.value=false
  p2.value.style.top="-2000px"
}
function dbc3(e){
  b4.value=false
  p3.value.style.top='-2000px'
}
function sub1(e){
  let x=t1.value!=''?t1.value:'<Add Title here>'
  b1.value=true
  p.value.innerText=x
  p.value.style.top=''
}
function sub2(e){
  let x=t2.value!=''?t2.value:'<Add Key Takeaway here>'
  b2.value=true
  p1.value.innerText=x
  p1.value.style.top='-30px'
}
function sub3(e){
  let x=t3.value!=''?t3.value:'<Add PM ation here>'
  b3.value=true
  p2.value.innerText=x
  p2.value.style.top='-30px'
}
function sub4(e){
  let x=t4.value!=''?t4.value:'<Add bullet here>'
  b4.value=true
  p3.value.innerText=x
  p3.value.style.top='-30px'
}
</script>

<script lang="ts">
export default {
  name: "Success"
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
.eq{
  position: absolute;
  height: 30%;
  width: 30%;
  background: #f53f3f;
}
.wrapper {
  padding: 24px 150px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.result {
  margin: 150px 0 0 0;
}

.operation-wrap {
  margin-bottom: 40px;
  text-align: center;
}

.steps-wrapper {
  width: 100%;
  min-width: fit-content;
  margin-bottom: 150px;
  padding: 20px;
  background-color: rgb(var(--gray-1));
}
</style>

<style lang="less" scoped>
.container {
  height: 1000px;
  width: 100%;
}

.wrapper {
  padding: 24px 20px;
  height: 100%;
  position: relative;
}

.header {
  height: 200px;
  width: 96%;
  background: cornflowerblue;
  position: absolute;
  top: 20px;
}
.center{
  height: 600px;
  width: 100%;
  position: absolute;
  top: 220px;
}
</style>
