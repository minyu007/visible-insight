<template>
  <div class="container">
    <Breadcrumb :items="['menu.result', 'menu.result.success']" />

    <div class="wrapper">

      <div>
        <a-space direction="vertical" size="large">
          <!--          <a-input-search :style="{width:'320px'}" placeholder="Please enter something" button-text="Search" search-button/>-->
          <a-input-search :style="{width:'520px'}" placeholder="Ticker/company name" search-button>
            <template #button-icon>
              <icon-search />
            </template>
            <template #button-default>
              Search
            </template>
          </a-input-search>
        </a-space>
      </div>

      <div style="margin-top: 30px">


        <div :style="{ marginTop: '20px' }">
          <a-radio-group>
            <template v-for="item in list" :key="item">
              <a-radio :value="item">
                <template #radio="{ checked }">
                  <a-space
                    align="start"
                    class="custom-radio-card"
                    :class="{ 'custom-radio-card-checked': checked }"
                  >
                    <div className="custom-radio-card-mask">
                      <div className="custom-radio-card-mask-dot" />
                    </div>
                    <div>
                      <div className="custom-radio-card-title">
                        {{ item }}
                      </div>
                      <a-typography-text type="secondary">

                      </a-typography-text>
                    </div>
                  </a-space>
                </template>
              </a-radio>
            </template>
          </a-radio-group>

        </div>
        <!--        rating note-->
        <!--        general note-->
        <!--        predetermined note-->

        <!--        monthly data update-->
        <!--        earnings result update-->
        <div style="display:flex;flex-direction: row">
          <a-space direction="vertical" size="large">
          <a-select :style="{width:'220px',marginTop: '20px'}" placeholder="Please select ...">
            <a-option>monthly data update</a-option>
            <a-option>earnings result update</a-option>
          </a-select>
          </a-space>
          <a-button @click="cl" style="width: 100px;margin-top: 20px;margin-left: 600px" type="primary">Crate</a-button>
          <a-button style="width: 100px;margin-top: 20px;margin-left: 20px" type="outline">Preview</a-button>

        </div>
        <p style="font-weight: bold;font-size: 17px;position: relative;top: 5px">KEY TAKEAWAY:</p>
        <textarea style="width: 100%;height: 100px"></textarea>
        <p style="font-weight: bold;font-size: 17px;position: relative;top: 5px">PM ACTION:</p>
        <textarea style="width: 100%"></textarea>
        <p style="font-size: 16px;font-weight: bold;">Analysis & Outlook:</p>
        <div v-if="act" style="width: 100%;height: 150px;border: 1px black solid;text-align: center">
          <a-spin :loading="loading" tip="This may take a while..." style="width: 400px;margin-top: 70px">
<!--            <a-card title="Arco Card">-->
<!--             -->
<!--            </a-card>-->
          </a-spin>
        </div>
        <div v-if="!act" style="width: 100%;border: 1px black solid">
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;border-radius: 10px;margin-top: 20px;margin-left: 10px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Property sales</p><p style="font-size: 14px;color: black;font-weight: bold">:-8.1% YoY in Oct,increased from -13.6% YoY in Sep.GFA sold -11.0% YoY in Oct,slighty decreased from -10.1% YoY in Sep.</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;background: black;margin-top: 20px;margin-left: 50px;margin-right: 10px"></div><p style="color:black;;font-size: 14px;font-weight: bold">Residential property(home)sales:-8.9% YoY in Oct,increased from -14.2% YoY in Sep.GFA sold -12.0% YoY in Oct,slighty decreased from -11.6% YoY in Sep.</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;border-radius: 10px;margin-top: 20px;margin-left: 10px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">New starts</p><p style="font-size: 14px;color: black;font-weight: bold">:-21.1% in Oct,decreased from -14.6% in Sep.</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;border-radius: 10px;margin-top: 20px;margin-left: 10px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">New completions</p><p style="font-size: 14px;color: black;font-weight: bold">:13.3% YoY in Oct,decreased from -13.6% YoY in Sep.</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;border-radius: 10px;margin-top: 20px;margin-left: 10px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Property FAI</p><p style="font-size: 14px;color: black;font-weight: bold">:-11.3% YoY in Oct,flatted from -11.3% YoY in Sep.</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;border-radius: 10px;margin-top: 20px;margin-left: 10px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Home price</p><p style="font-size: 14px;color: black;font-weight: bold">:In Oct,among the 70 cities,primary home price increased MoM in 11 cities(vs in 15 Sep),secondary home increased MoM in cities(vs 4 in Sep).</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;background: black;margin-top: 20px;margin-left: 50px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Tier-1 cities</p><p style="font-size: 14px;color: black;font-weight: bold">:primary/secondary home price decreased by -0.3%/-0.8% MoM,decreased from 0.00%/0.2% in Sep</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;background: black;margin-top: 20px;margin-left: 50px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Tier-2 cities</p><p style="font-size: 14px;color: black;font-weight: bold">:primary/secondary home price decreased by -0.2%/-0.5% MoM,decreased from 0.3%/0.5% in Sep</p></div>
          <div style="display: flex;flex-direction: row"><div style="height: 5px;width: 5px;border: 1px black solid;background: black;margin-top: 20px;margin-left: 50px;margin-right: 10px"></div><p style="color:red;font-size: 14px;font-weight: bold">Tier-3 cities</p><p style="font-size: 14px;color: black;font-weight: bold">:primary/secondary home price decreased by -0.5%/-0.6% MoM,decreased from 0.3%/0.5% in Sep</p></div>

        </div>


      </div>
      <!--      <div class="header">-->
      <!--        <div class="eq">-->
      <!--          <p style="margin-left: 30px;color: white;font-size: 25px;font-weight: bold">Equity</p>-->
      <!--        </div>-->
      <!--        <p style="margin-left: 30px;margin-top: 70px;color: white;font-size: 16px">2 | TSENG,JONATHAN | 03 Nov 2023 | ESG: B(E:2.55,S:2.23,G:2.35)</p>-->
      <!--        <p style="margin-left: 30px;color: white;font-size: 16px">Owned / Allowed: 0.05%/0.99%</p>-->
      <!--        <p style="margin-left: 30px;color: white;font-size: 16px">Price / Mkt Caps:Usd 189.68 / USD 2,950,202m</p>-->
      <!--        <p style="position: absolute;top: 5px;right: 5%;font-weight: bold;color: white;font-size: 25px">APPLE INC(AAPL.US)</p>-->
      <!--        <p style="position: absolute;top: 27%;right: 5%;font-size: 16px;color:white;">Technology Hardware & Equipment | UNITED</p>-->
      <!--        <p style="position: absolute;top: 44%;right: 5%;font-size: 16px;color:white;">LI,JACKIE +8641139457059</p>-->
      <!--        <p style="position: absolute;top: 62%;right: 5%;font-size: 16px;color:white;">18 November 2023, 15:26(GMT+8)</p>-->
      <!--      </div>-->
      <!--      <div class="center">-->
      <!--        <p  @click="dbc" style="position: relative;margin-left: 30px;font-size: 25px" :ref="el" class="t"></p>-->
      <!--        <textarea style="margin-left: 30px;position: absolute;top: 25px;width: 80%" v-model="t1" v-if="!b1" @keyup.ctrl.enter="sub1"></textarea>-->

      <!--        <div STYLE="background: aquamarine;width: 96%;position: relative">-->
      <!--          <p style="font-weight: bold;font-size: 17px;margin-left: 30px;position: relative;top: 5px">KEY TAKEAWAY:</p>-->
      <!--          <p :ref="el2" @dblclick="dbc1" style="position: relative;z-index: 10;left: 18%;top: -30px;font-size: 14px">ddd</p>-->
      <!--          <input style="position: relative;z-index: 10;left: 18%;top: -30px;" v-if="!b2" @keyup.enter="sub2" v-model="t2">-->
      <!--        </div>-->

      <!--        <div STYLE="background: aquamarine;width: 96%;position: relative">-->
      <!--          <p style="font-weight: bold;font-size: 17px;margin-left: 30px;position: relative;top: 5px">PM ACTION:</p>-->
      <!--          <p :ref="el3" @dblclick="dbc2" style="position: relative;z-index: 10;left: 18%;top: -30px;font-size: 14px">sss</p>-->
      <!--          <input style="position: relative;z-index: 10;left: 18%;top: -30px;" v-if="!b3" @keyup.enter="sub3" v-model="t3">-->
      <!--        </div>-->
      <!--        <p style="font-size: 16px;font-weight: bold;margin-left: 30px">Analysis & Outlook:</p>-->
      <!--        <div style="margin-left: 30px;height: 10px;width: 10px;border-left: brown 5px solid;border-top: white 5px solid;border-bottom: white 5px solid"></div> <p></p>-->
      <!--        <p :ref="el4" @dblclick="dbc3" style="position: relative;top: -28px;left: 60px;font-size: 14px">h</p>-->
      <!--        <input v-if="!b4" @keyup.enter="sub4" v-model="t4" style="position: relative;top: -52px;left: 60px;">-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
let val = ref('update '),loading = ref(false)
let cheaked = ref(true);
let act = ref(true);
let list = reactive(["Rating note", "General note", "Predetermined note"]);
function cl(){
  loading.value=true;
  setTimeout(function(){act.value = false},1000)
}
function sle(v){
  val.value=v
}

//
// let t1 = ref(''),b1=ref(true)
// let t2 = ref(''),b2 = ref(true)
// let t3 = ref(''),b3 = ref(true)
// let t4 = ref(''),b4 = ref(true)
// let p = ref<HTMLElement | null>(null)
// let p1 = ref<HTMLElement | null>(null)
// let p2 = ref<HTMLElement | null>(null)
// let p3 = ref<HTMLElement | null>(null)
// function el(e:HTMLElement){
//   console.log(e)
//   p.value=e
//  // e.innerText='<Add Title here>'
// }
// function el2(e:HTMLElement){
//   p1.value=e
// }
// function el3(e:HTMLElement){
//   p2.value=e
// }
// function el4(e:HTMLElement){
//   p3.value=e
// }
// onMounted(()=>{
//   p.value.innerText='<Add Title here>'
//   p1.value.innerText='<Add Key Takeaway here>'
//   p2.value.innerText='<Add PM ation here>'
//   p3.value.innerText='<Add bullet here>'
// })
// function dbc(e){
//   b1.value=false
//   p.value.style.top='-2000px'
// }
// function dbc1(e){
//   b2.value=false
//   p1.value.style.top="-2000px"
// }
// function dbc2(e){
//   b3.value=false
//   p2.value.style.top="-2000px"
// }
// function dbc3(e){
//   b4.value=false
//   p3.value.style.top='-2000px'
// }
// function sub1(e){
//   let x=t1.value!=''?t1.value:'<Add Title here>'
//   b1.value=true
//   p.value.innerText=x
//   p.value.style.top=''
// }
// function sub2(e){
//   let x=t2.value!=''?t2.value:'<Add Key Takeaway here>'
//   b2.value=true
//   p1.value.innerText=x
//   p1.value.style.top='-30px'
// }
// function sub3(e){
//   let x=t3.value!=''?t3.value:'<Add PM ation here>'
//   b3.value=true
//   p2.value.innerText=x
//   p2.value.style.top='-30px'
// }
// function sub4(e){
//   let x=t4.value!=''?t4.value:'<Add bullet here>'
//   b4.value=true
//   p3.value.innerText=x
//   p3.value.style.top='-30px'
// }
</script>

<script lang="ts">
export default {
  name: "Success"
};
</script>

<style scoped lang="less">
.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}


.container {
  padding: 0 20px 20px 20px;
}

.eq {
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

.center {
  height: 600px;
  width: 100%;
  position: absolute;
  top: 220px;
}
</style>
