<template>
  <div class="container">
    <Breadcrumb :items="['Replay']" />
    <a-card class="general-card" title="Replay Monitor">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="tickerOrCompanyName"
                  label="Ticker / Name"
                >
                  <a-input
                    v-model="formModel.tickerOrCompanyName"
                    placeholder="Ticker or Company Name"
                    @press-enter = 'searchByName()'
                    @blur = 'searchByName()'
                    allow-clear
                    @clear = 'searchByName()'
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="sectorType"
                  label="Sector"
                >
                  <a-select
                    v-model="formModel.sectorType"
                    :options="sectorTypeOptions"
                    placeholder="Sector"
                    @change = 'searchBySector()'
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="range"
                  label="Range"
                >
                  <a-range-picker
                    v-model="formModel.range"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-divider orientation="left">Quick filter</a-divider>
      <a-row :gutter="24" justify="end">
        <a-col :span="4">
          Category:
          <!-- <a-typography-text>Type: </a-typography-text> -->
          <a-radio-group default-value="0" type="button" v-model='category1'  @change='onCategoryChange'>
            <a-badge :count="allCount" :max-count="999"><a-radio value="0" default-checked>All</a-radio></a-badge>
            <a-badge :count="goodCount"><a-radio value="good"><a-typography-text type="danger">Good</a-typography-text></a-radio></a-badge>
            <a-badge :count="badCount" :max-count="999"><a-radio value="bad"><a-typography-text type="success">Bad</a-typography-text></a-radio></a-badge>
            <!-- <a-radio value="0">All</a-radio>
            <a-radio value="bad"><a-typography-text type="success">Bad</a-typography-text></a-radio>
            <a-radio value="good"><a-typography-text type="danger">Good</a-typography-text></a-radio> -->
          </a-radio-group>
          
        </a-col>
        <a-col :span="4">
          Sort:
          <a-radio-group default-value="0" type="button"  v-model='sorter' @change='onSortChange'>
            <a-radio value="0"><icon-arrow-down /></a-radio>
            <a-radio value="1"><icon-arrow-up /></a-radio>
          </a-radio-group>
        </a-col>
        <a-col :span="4">
        </a-col>
        <a-col :span="4">
        </a-col>
        <a-col :span="4">
        </a-col>
        <a-col :span="4">
          Layout:
          <a-radio-group default-value="4" type="button" @change='onColumnChange'>
            <a-radio value="4">6</a-radio>
            <a-radio value="6">4</a-radio>
            <a-radio value="8">3</a-radio>
            <a-radio value="12">2</a-radio>
          </a-radio-group>
          <!-- <a-slider :default-value="4" @change="onSliderChange" :style="{ width: '200px' }" :min="4" :max="10" :step='2' :marks="marks" /> -->
        </a-col>
      </a-row>
      <a-divider />
      <div class="panel">
        <a-spin :loading="loading" style="width: 100%">
            <template #extra>
              Latest Update: 2023-11-20
            </template>
            <a-row :gutter="24">
                <template v-for="(v, idx) in arr" :key="`idx-${v.index}`">
                  <a-col :span="columns">
                      <LineChart :timer='timer' :name='v.name' :data='v.data' :category='v.category' :vid='idx'/>
                  </a-col>
                </template>
            </a-row>
        </a-spin>
      </div>
      
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import * as echarts from 'echarts';

  import {
    getReplayData,
  } from '@/api/replay';
  import useLoading from '@/hooks/loading';
  import LineChart from './components/line-chart.vue';


  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      tickerOrCompanyName: '',
      sectorType: '',
      range: [],
    };
  };
  const columns = ref<any>(4);
  const formModel = ref(generateFormModel());

  const search = () => {};
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const sectorTypeOptions = ref<any[]>([]);
  const arr = ref<any[]>([]);
  const _arr = ref<any[]>([]);
  const filteredArr = ref<any[]>([]);
  
  const timer = ref<any[]>([]);

  const sorter = ref<any>('0');
  const category1 = ref<any>('0');

  const allCount = ref<any>('0');
  const goodCount = ref<any>('0');
  const badCount = ref<any>('0');

  const fetchData = async (params: any) => {
    setLoading(true);
    // let a_number = getToken();
    // a_number = a_number.toLowerCase();
    const data = await getReplayData({ ...params });
    const { tickers } = data.data;
    const arr2 = tickers.sector.map((v, i) => ({
      label: v,
      value: v
    }))
    arr2.unshift({
      label: 'all',
      value: 0
    })
    sectorTypeOptions.value = arr2;
    
    arr.value = tickers.arr;
    timer.value = tickers.timer;
    _arr.value = [...tickers.arr];
    filteredArr.value = [...tickers.arr];
    allCount.value =  tickers.arr.length;
    goodCount.value = tickers.arr.filter(v => v.category == 'good').length
    badCount.value = tickers.arr.filter(v => v.category == 'bad').length
    setLoading(false);
  };

  const onColumnChange = (v) => {
    if(columns.value !=v){
      if(v == 10){
        columns.value = 12;
        return ;
      }
      columns.value = v;
    }
  }

  fetchData({});

  const searchByName = () => {
    const list = [..._arr.value];
    if(formModel.value.tickerOrCompanyName){
      arr.value = list.filter(v => v.name.indexOf(formModel.value.tickerOrCompanyName)!=-1 );
    } else {
      arr.value = list;
    }
    // formModel.value.sectorType = ''
    sorter.value = '0';
    category1.value = '0';
    allCount.value =  arr.value.length;
    goodCount.value = arr.value.filter(v => v.category == 'good').length;
    badCount.value = arr.value.filter(v => v.category == 'bad').length;
    filteredArr.value = [...arr.value]
  }

  const searchBySector = () => {
    const list = [..._arr.value];


    // formModel.value.tickerOrCompanyName = ''
    if(formModel.value.sectorType){
      arr.value = list.filter(v => v.sector == formModel.value.sectorType);
    } else {
      arr.value = list;
    }
    sorter.value = '0';
    category1.value = '0';
    allCount.value =  arr.value.length;
    goodCount.value = arr.value.filter(v => v.category == 'good').length;
    badCount.value = arr.value.filter(v => v.category == 'bad').length;
    filteredArr.value = [...arr.value];
  }

  const onCategoryChange = (vv) => {
    const list = [...filteredArr.value];
    if(vv != 0){
      arr.value = list.filter(v => v.category == vv);
    } else {
      arr.value = list;
    }
    sorter.value = '0';
  }

  const onSortChange = (vv) => {
    // console.log(vv)
    const list = [...arr.value];
    if(vv == '0'){
      arr.value = list.sort((v1, v2) => v1.index - v2.index);
    } else {
      arr.value = list.sort((v1, v2) => v2.index - v1.index);
    }
  }
</script>

<script lang="ts">
  export default {
    name: 'Replay', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
 .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
