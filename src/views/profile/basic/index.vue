<template>
  <div class="container">
    <Breadcrumb :items="['Fidelity BI', 'Analysis']" />
    <a-card class="general-card">
      <template #title><icon-font type="icon-zhexiantu" :size="24" /> Analysis </template>
      <a-space direction="vertical" :size="16" fill>
        <a-row class="list-row" :gutter="24">
          <a-col :span="24">
            <a-divider orientation="left">Filter</a-divider>
          </a-col>
        </a-row>
        <a-row class="list-row" :gutter="24">
          <a-col :span="24">
            <a-space>
              <a-input-search
                placeholder="Ticker or company name"
                :style="{ width: '290px' }"
                allow-clear
              />
              <a-select
                placeholder="Fund name"
                multiple
                :style="{ width: '390px' }"
                @change="(e) => selectFunds(e)"
              >
                <a-option
                  v-for="fund in fundList"
                  :key="fund"
                  >{{ fund }}</a-option
                >
              </a-select>
              <a-select
                placeholder="Analysts"
                multiple
                :style="{ width: '390px' }"
                @change="(e) => selectAnalysts(e)"
              >
                <a-option
                  v-for="analyst in analystList"
                  :key="analyst"
                  >{{ analyst }}</a-option
                >
              </a-select>
              
            </a-space>
          </a-col>
        </a-row>
        <!-- <a-row class="list-row" :gutter="24">
          <a-col :span="24">
              <a-steps :current="2">
                <a-step>Succeeded</a-step>
                <a-step>Processing</a-step>
                <a-step>Pending</a-step>
              </a-steps>
          </a-col>
        </a-row> -->
        <a-row class="list-row" :gutter="24">
          <a-col :span="24">
              <a-space>
                <div class="item todo">
                  <a-divider orientation="left">
                    <a-typography-text  type="primary">Company list</a-typography-text>
                  </a-divider>
                  <a-table 
                    :columns="columns" 
                    :data="data"  
                    :pagination="false"
                    :bordered="true"
                    :hoverable="true"
                    size="mini"
                    :virtual-list-props="{ height: 600 }"
                  >
                    <template #operation="{ record }">
                      <a-button
                        size="small"
                        type="text"
                        status="normal"
                        shape="circle"
                        @click="add(record)"
                        v-if="!record.isSelected"
                      > 
                        <icon-plus-circle-fill />
                      </a-button>
                      <a-button
                        size="small"
                        type="text"
                        status="success"
                        shape="circle"
                        v-if="record.isSelected"
                      > 
                        <icon-check-circle-fill />
                      </a-button>
                    </template>
                  </a-table>
                </div>
                <div class="item working">
                  <a-divider orientation="left">
                    <a-typography-text  type="warning">Indicators</a-typography-text>
                  </a-divider>
                  <a-checkbox-group :default-value="[]"  @change="handleChange">
                    <template v-for="indicator in indicatorList1" :key="indicator">
                      <a-checkbox :value="indicator" :style="{marginBottom: '8px'}">
                        <template #checkbox="{ checked }">
                          <a-space
                            align="start"
                            class="custom-checkbox-card"
                            :class="{ 'custom-checkbox-card-checked': checked }"
                          >
                            <div className="custom-checkbox-card-mask">
                              <div className="custom-checkbox-card-mask-dot" />
                            </div>
                            <div>
                              <div className="custom-checkbox-card-title">
                                {{ indicator }}
                              </div>
                            </div>
                          </a-space>
                        </template>
                      </a-checkbox>
                    </template>
                  </a-checkbox-group>
                  <a-divider orientation="left">
                    <a-typography-text type="warning">Macroeconomic Indicators</a-typography-text>
                  </a-divider>
                  <a-checkbox-group :default-value="[]"  @change="handleChange">
                    <template v-for="indicator in indicatorList2" :key="indicator">
                      <a-checkbox :value="indicator" :style="{marginBottom: '8px'}">
                        <template #checkbox="{ checked }">
                          <a-space
                            align="start"
                            class="custom-checkbox-card"
                            :class="{ 'custom-checkbox-card-checked': checked }"
                          >
                            <div className="custom-checkbox-card-mask">
                              <div className="custom-checkbox-card-mask-dot" />
                            </div>
                            <div>
                              <div className="custom-checkbox-card-title">
                                {{ indicator }}
                              </div>
                            </div>
                          </a-space>
                        </template>
                      </a-checkbox>
                    </template>
                  </a-checkbox-group>
                  <a-divider orientation="left">
                    <a-typography-text type="success">Chart</a-typography-text>
                  </a-divider>
                  <Chart height="350px" :option="chartOption" />
                </div>
                <!-- <div class="item done">
                 
                </div> -->
              </a-space>
          </a-col>
        </a-row>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Icon } from '@arco-design/web-vue';

  import useChartOption from '@/hooks/chart-option';


  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_3959654_asl72fm6sch.js',
  });

  const scrollbar = ref(true);
  const analystList = ['Zhang, Warren', 'Zhang, Johnson', 'Wang, Jeffrey', 'Tao, Yang', 'Shi, Sophie', 'Liu, Zhenwei', 'Liu, Frank', 'Li, Jackie', 'Bai, Sean'];
  const fundList = ['CSSIT', 'F/HGD', 'F/IBS', 'F/IOD', 'ETFCLD', 'ETTF', 'EUDT', 'F/232'];
  const tickerList = ['603288.SH','603027.SH','600298.SH','600305.SH', '002027.CH','002439.CH','002714.CH','002747.CH','002821.CH','300124.CH','300416.CH','300750.CH','300760.CH','600406.CH','600519.CH','600570.CH','600660.CH','600900.CH','601138.CH','601318.CH','601888.CH','603259.CH','603338.CH']
  const companyList = ['FOSHAN HAITIAN FLAVORING & FOOD CO LTD A','QIANHE CONDIMENT AND FOOD CO LTD A','ANGEL YEAST CO LTD A','JIANGSU HENGSHUN VGR IND CO A', 'FOCUS MEDIA INFORMATION TECHNOLOGY CO LTD A','BEIJING VENUSTECH INC A','MUYUAN FOODSTUFF CO LTD A','ESTUN AUTOMATION CO LTD A','ASYMCHEM LABORATORIES TIANJIN CO LTD A','SHENZHEN INOVANCE TECHNOLOGY CO LTD A','SUZHOU SUSHI TESTING GROUP CO LTD A','CONTEMPORARY AMPEREX TECHNOLOGY CO LTD A','SHENZHEN MINDRAY BIO-MEDICAL ELECTRONICS CO LTD A','NARI TECH DEVELOPMENT LTD CO A','KWEICHOW MOUTAI CO LTD A','HUNDSUN TECHNOLOGIES INC A','FUYAO GLASS INDUSTRY GROUP CO LTD A','CHINA YANGTZE POWER CO LTD A','FOXCONN INDUSTRIAL INTERNET CO LTD A','PING AN INSURANCE CO LTD A','CHINA TOURISM GROUP DUTY FREE CORP LTD A','WUXI APPTEC CO LTD A','ZHEJIANG DINGLI MACHINERY CO LTD A'];

  const rawData = [{
    key: 0,
    ticker: '603288.SH',
    companyName: 'FOSHAN HAITIAN FLAVORING & FOOD CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Johnson',
    fund:'CSSIT',
  },{
    key: 1,
    ticker: '603027.SH',
    companyName: 'QIANHE CONDIMENT AND FOOD CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Johnson',
    fund:'CSSIT',
  },{
    key: 2,
    ticker: '600298.SH',
    companyName: 'ANGEL YEAST CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Johnson',
    fund:'CSSIT',
  },{
    key: 3,
    ticker: '600305.SH',
    companyName: 'JIANGSU HENGSHUN VGR IND CO A',
    isSelected: false,
    analyst: 'Zhang, Johnson',
    fund:'CSSIT',
  },{
    key: 4,
    ticker: '002027.CH',
    companyName: 'FOCUS MEDIA INFORMATION TECHNOLOGY CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'CSSIT',
  },{
    key: 5,
    ticker: '002439.CH',
    companyName: 'BEIJING VENUSTECH INC A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'CSSIT',
  },{
    key: 6,
    ticker: '002714.CH',
    companyName: 'MUYUAN FOODSTUFF CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 7,
    ticker: '002747.CH',
    companyName: 'ESTUN AUTOMATION CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 8,
    ticker: '002821.CH',
    companyName: 'ASYMCHEM LABORATORIES TIANJIN CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 9,
    ticker: '300124.CH',
    companyName: 'SHENZHEN INOVANCE TECHNOLOGY CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 10,
    ticker: '300416.CH',
    companyName: 'SUZHOU SUSHI TESTING GROUP CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 11,
    ticker: '300750.CH',
    companyName: 'CONTEMPORARY AMPEREX TECHNOLOGY CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 12,
    ticker: '300760.CH',
    companyName: 'SHENZHEN MINDRAY BIO-MEDICAL ELECTRONICS CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 13,
    ticker: '600406.CH',
    companyName: 'NARI TECH DEVELOPMENT LTD CO A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 14,
    ticker: '600519.CH',
    companyName: 'KWEICHOW MOUTAI CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 15,
    ticker: '600570.CH',
    companyName: 'HUNDSUN TECHNOLOGIES INC A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  },{
    key: 16,
    ticker: '600660.CH',
    companyName: 'FUYAO GLASS INDUSTRY GROUP CO LTD A',
    isSelected: false,
    analyst: 'Zhang, Warren',
    fund: 'F/HGD',
  }]

  const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    });

  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      width: 120,
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      ellipsis: true,
    },{
      title: '',
      slotName: 'operation',
      dataIndex: 'operation',
      width: 60,
    }];
  
  const data = ref<any[]>([...rawData])

  const indicatorList1 = ['Revenue Growth', 'Gross Profit Margin', 'Finance Leverage', 'Tax Burden', 'Interest Burden', 'Asset Turnover', 'ROE', 'ROA']
  const indicatorList2 = ['GDP Growth', 'Interest Rates', 'Inflation Rate']
  const timeseries = ref<any[]>(['FY2012','FY2013','FY2014','FY2015','FY2016','FY2017','FY2018','FY2019','FY2020','FY2021','FY2022','FY2023','FY2024','FY2025'].map(v => parseInt(v.replace('FY', ''))));
  const revenueGrowth = {
    'FOSHAN HAITIAN FLAVORING & FOOD CO LTD A': ['16.1%','18.8%','16.8%','15.0%','10.3%','17.1%','16.8%','16.2%','15.1%','9.7%','2.4%','4.4%','7.4%','12.4%'].map(v => Math.floor(parseFloat(v.replace('%', ''))*100)/10000),
    'QIANHE CONDIMENT AND FOOD CO LTD A': ['9.3%','11.5%','6.2%','-4.2%','23.6%','23.0%','12.4%','27.2%','25.0%','13.7%','26.6%','24.6%','21.6%','16.6%'].map(v => Math.floor(parseFloat(v.replace('%', ''))*100)/10000),
    'ANGEL YEAST CO LTD A': ['8.3%','15.0%','17.1%','15.3%','15.4%','18.8%','15.8%','14.5%','16.7%','19.5%','20.3%','18.3%','15.3%','20.3%'].map(v => Math.floor(parseFloat(v.replace('%', ''))*100)/10000),
    'JIANGSU HENGSHUN VGR IND CO A':['12.7%','-3.1%','8.7%','8.1%','10.9%','6.5%','9.9%','7.5%','9.9%','-6.4%','13.0%','15.0%','12.0%','17.0%'].map(v => Math.floor(parseFloat(v.replace('%', ''))*100)/10000),
    'GDP': ['7.9%','7.8%','7.4%','7.0%','6.8%','6.9%','6.7%','6.0%','2.2%','8.4%','3.0%','4.5%','5.3%','6.0%'].map(v => Math.floor(parseFloat(v.replace('%', ''))*100)/10000)
  }

  const tickers =  ref<any[]>([])
  const chartData =  ref<any[]>([])
  const tickersRaw = ['FOSHAN HAITIAN FLAVORING & FOOD CO LTD A', 'QIANHE CONDIMENT AND FOOD CO LTD A', 'ANGEL YEAST CO LTD A', 'JIANGSU HENGSHUN VGR IND CO A']
  const _tickersRaw = ['FOSHAN HAITIAN FLAVORING & FOOD CO LTD A', 'QIANHE CONDIMENT AND FOOD CO LTD A', 'ANGEL YEAST CO LTD A', 'JIANGSU HENGSHUN VGR IND CO A', 'GDP']

  // const grossProfitMargin = {
  //   'timeline': ['FY2012','FY2013','FY2014','FY2015','FY2016','FY2017','FY2018','FY2019','FY2020','FY2021','FY2022','FY2023','FY2024','FY2025'],
  //   '603288.SH': ['37.3%','39.2%','40.4%','41.9%','43.9%','45.7%','46.5%','45.4%','42.2%','38.7%','35.7%','37.7%','40.7%','45.7%'],
  //   '603027.SH': ['29.5%','32.2%','32.5%','37.2%','41.0%','43.3%','45.7%','46.2%','43.8%','40.4%','36.6%','34.6%','31.6%','26.6%'],
  //   '600298.SH': ['30.5%','29.3%','29.3%','29.9%','32.6%','37.6%','36.3%','35.0%','34.0%','27.3%','24.8%','22.8%','19.8%','24.8%'],
  //   '600305.SH':['33.5%','38.5%','39.7%','39.7%','41.2%','40.6%','42.2%','45.3%','40.8%','37.6%','34.4%','36.4%','33.4%','38.4%'],
  //   'GDP': ['7.9%','7.8%','7.4%','7.0%','6.8%','6.9%','6.7%','6.0%','2.2%','8.4%','3.0%','4.5%','5.3%','6.0%'],
  // }
  

  const selectFunds = (payload) => {
    if(payload.includes('CSSIT')){
      data.value = rawData.filter(v => v.fund === 'CSSIT')
    }else{
      data.value = rawData
    }
  }

  const selectAnalysts = (payload) => {
    if(payload.includes('Zhang, Johnson')) {
      data.value = rawData.filter(v => v.analyst === 'Zhang, Johnson')
    }else{
      data.value = rawData
    }
  }

  const add = (record: any) => {
    const arr = [...data.value];
    const idx = arr.findIndex((v) => v.ticker === record.ticker);
    arr[idx].isSelected = true;
    data.value = arr;
  }

  const handleChange = (payload: any) => {
    if(payload.includes('Revenue Growth') && !payload.includes('GDP')) {
      tickers.value = tickersRaw
      chartData.value = tickersRaw.map(v => {
        return {
          name: v,
          type: 'line',
          stack: 'Total',
          showSymbol: false,
          smooth: true,
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          data: revenueGrowth[v]
        }
      })
    } else if(payload.includes('GDP Growth')) {
      tickers.value = _tickersRaw
      chartData.value = _tickersRaw.map(v => {

        return {
          name: v,
          type: 'line',
          stack: 'Total',
          showSymbol: false,
          smooth: true,
          symbolSize: 12,
          lineStyle: {
            type: v === 'GDP'? 'dashed': ''
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          data: revenueGrowth[v]
        }
      })
    }
  }

  const { chartOption } = useChartOption(() => {
    return {
      title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: tickers.value
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF',
        },
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#23ADFF',
          width: 2,
        },
      },
      data: timeseries.value
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#4E5969',
        formatter(value: number, idx: number) {
          return `${value*100}%`;
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF',
        },
      },
    },
    series: chartData.value
    };
  });
  
</script>

<script lang="ts">
  export default {
    name: 'Basic',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .steps {
    max-width: 548px;
    margin: 0 auto 10px;
  }
  .todo {
    width: 500px;
    height: 800px;
  }
  .working {
    width: 800px;
    height: 800px;
  }
  .done {
    width: 400px;
  }

  .custom-checkbox-card {
  padding: 10px 10px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 170px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 12px;
  font-weight: bold;
  // margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
