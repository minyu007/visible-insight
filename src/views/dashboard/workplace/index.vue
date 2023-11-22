<template>
  <div class="container">
    <div class="left-side">
      <!-- <div class="panel">
       
      </div> -->
      <a-row class="banner">
        <a-col :span="24">
          <a-input-search :data="data" size="large" :style="{width:'100%'}" placeholder="Ticker / Company name/ Fund name / Analyst name ..." search-button>
            <template #button-icon>
              <icon-search/>
            </template>
            <template #button-default>
              Search
            </template>
          </a-input-search>
        </a-col>
      </a-row>
      <div class="panel">
        <Banner />
        <DataPanel />
        <a-spin :loading="loading" style="width: 100%">
          <a-card
            class="general-card"
            :header-style="{ paddingBottom: 0 }"
            :body-style="{
              paddingTop: '20px',
            }"
            title="Monitor"
          >
            <template #extra>
              Latest Update: 2023-11-20
            </template>
            <a-table size="small" :pagination="false" :columns="columns" :data="tableData" v-model:expandedKeys="expandedKeys"  show-empty-tree />
          </a-card>
        </a-spin>
        <!-- <ContentChart /> -->
      </div>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <PopularContent />
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <CategoriesPercent />
        </a-grid-item>
      </a-grid>
    </div>
    <div class="right-side">
      <a-grid :cols="24" :row-gap="16">
        <a-grid-item :span="24">
          <div class="panel moduler-wrap">
            <QuickOperation />
            <RecentlyVisited />
          </div>
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Carousel />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Announcement />
        </a-grid-item>
        <!-- <a-grid-item class="panel" :span="24">
          <Docs />
        </a-grid-item> -->
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import Banner from './components/banner.vue';
  import DataPanel from './components/data-panel.vue';
  import ContentChart from './components/content-chart.vue';
  import PopularContent from './components/popular-content.vue';
  import CategoriesPercent from './components/categories-percent.vue';
  import RecentlyVisited from './components/recently-visited.vue';
  import QuickOperation from './components/quick-operation.vue';
  import Announcement from './components/announcement.vue';
  import Carousel from './components/carousel.vue';
  import Docs from './components/docs.vue';

  const data =  ['Beijing', 'Shanghai', 'Chengdu', 'WuHan']

  const expandedKeys = ref([]);
  const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    checkStrictly: true
  });
  const columns = [
    {
      title: 'Sector',
      dataIndex: 'sector',
      width: 400,
    },
    {
      title: 'Market Cap US $m',
      dataIndex: 'marketCap',
    },
    {
      title: 'Active Rated Mkt Cap $m',
      dataIndex: 'activeRatedMktCap',
    },
    {
      title: 'FIL Holdings US $m',
      dataIndex: 'filHoldings',
    },
    {
      title: 'Issuers Assigned',
      dataIndex: 'issuersAssigned',
    },
    {
      title: 'Active Ratings Count',
      dataIndex: 'activeRatingsCount',
    },
    {
      title: 'FIL Active Rating',
      dataIndex: 'filActiveRating',
    },
    {
      title: 'FIL ESG Rating',
      dataIndex: 'filESGRating',
    },
    // {
    //   title: 'Holdings %',
    //   dataIndex: 'holdings',
    // },
  ];

  const tableData = [{
    key: 0,
    sector:'Beverages',
    marketCap: '560,705',
    activeRatedMktCap: '560,705',
    filHoldings: '551',
    issuersAssigned: '9',
    activeRatingsCount: '0',
    holdings: '0.10%',
    children: [{
      key: 11,
      sector:'BUDWEISER BREWING CO APAC LTD',
      marketCap: '27,040',
      activeRatedMktCap: '27,040',
      filHoldings: '0',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.00%',
      filActiveRating:'NR',
      filESGRating: 'A',
    },{
      key: 12,
      sector:'CHINA FOOD LTD',
      marketCap: '1,062',
      activeRatedMktCap: '1,062',
      filHoldings: '44',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '4.13%',
      filActiveRating:'NR',
      filESGRating: 'B',
    },{
      key: 13,
      sector:'CHINA RESOURCES BEER (HOLDINGS) CO LTD',
      marketCap: '16,560',
      activeRatedMktCap: '16,560',
      filHoldings: '100',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.61%',
      filActiveRating:'NR',
      filESGRating: 'B',
    },{
      key: 14,
      sector:'CHONGQING BREWERY CO LTD A',
      marketCap: '5,008',
      activeRatedMktCap: '5,008',
      filHoldings: '0',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.00%',
      filActiveRating:'NR',
      filESGRating: 'NR',
    },{
      key: 15,
      sector:'KWEICHOW MOUTAI CO LTD A',
      marketCap: '306,999',
      activeRatedMktCap: '306,999',
      filHoldings: '351',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.11%',
      filActiveRating:'NR',
      filESGRating: 'C',
    },{
      key: 16,
      sector:'LUZHOU LAOJIAO CO LTD A',
      marketCap: '42,631',
      activeRatedMktCap: '42,631',
      filHoldings: '0',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.00%',
      filActiveRating:'NR',
      filESGRating: 'C',
    },{
      key: 17,
      sector:'NONGFU SPRING CO LTD H',
      marketCap: '65,916',
      activeRatedMktCap: '65,916',
      filHoldings: '49',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.07%',
      filActiveRating:'NR',
      filESGRating: 'B',
    },{
      key: 18,
      sector:'TSINGTAO BREWERY CO LTD A',
      marketCap: '12,308',
      activeRatedMktCap: '12,308',
      filHoldings: '0',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.07%',
      filActiveRating:'NR',
      filESGRating: 'B',
    },{
      key: 19,
      sector:'TSINGTAO BREWERY CO LTD H',
      marketCap: '12,387',
      activeRatedMktCap: '12,387',
      filHoldings: '3',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.02%',
      filActiveRating:'NR',
      filESGRating: 'B',
    },{
      key: 20,
      sector:'WULIANGYE YIBIN CO LTD A',
      marketCap: '83,102',
      activeRatedMktCap: '83,102',
      filHoldings: '4',
      issuersAssigned: '1',
      activeRatingsCount: '0',
      holdings: '0.00%',
      filActiveRating:'NR',
      filESGRating: 'C',
    }],
  },{
    key: 1,
    sector:'Building Products',
    marketCap: '5,172',
    activeRatedMktCap: '5,172',
    filHoldings: '0',
    issuersAssigned: '1',
    activeRatingsCount: '0',
    holdings: '0.00%',
    children: [],
  },{
    key: 2,
    sector:'Diversified Consumer Services',
    marketCap: '17,672',
    activeRatedMktCap: '11,607',
    filHoldings: '57',
    issuersAssigned: '2',
    activeRatingsCount: '0',
    holdings: '0.32%',
    children: [],
  },{
    key: 3,
    sector:'Food Products',
    marketCap: '36,861',
    activeRatedMktCap: '36,861',
    filHoldings: '918',
    issuersAssigned: '2',
    activeRatingsCount: '0',
    holdings: '2.49%',
    children: [],
  },{
    key: 4,
    sector:'Hotels, Restaurants & Leisure',
    marketCap: '33,314',
    activeRatedMktCap: '18,983',
    filHoldings: '192',
    issuersAssigned: '5',
    activeRatingsCount: '0',
    holdings: '0.59%',
    children: [],
  },{
    key: 5,
    sector:'Specialty Retail',
    marketCap: '4,402',
    activeRatedMktCap: '0',
    filHoldings: '0',
    issuersAssigned: '1',
    activeRatingsCount: '0',
    holdings: '0.00%',
    children: [],
  },{
    key: 6,
    sector:'Textiles, Apparel & Luxury Goods',
    marketCap: '68,813',
    activeRatedMktCap: '55,014',
    filHoldings: '862',
    issuersAssigned: '8',
    activeRatingsCount: '0',
    holdings: '1.25%',
    children: [],
  }]
</script>

<script lang="ts">
  export default {
    name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
  }

  .left-side {
    flex: 1;
    overflow: auto;
  }

  .right-side {
    width: 280px;
    margin-left: 16px;
  }

  .panel {
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
  }
  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }
  .moduler-wrap {
    border-radius: 4px;
    background-color: var(--color-bg-2);
    :deep(.text) {
      font-size: 12px;
      text-align: center;
      color: rgb(var(--gray-8));
    }

    :deep(.wrapper) {
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;

      &:last-child {
        .text {
          margin-bottom: 0;
        }
      }
      &:hover {
        .icon {
          color: rgb(var(--arcoblue-6));
          background-color: #e8f3ff;
        }
        .text {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    :deep(.icon) {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      color: rgb(var(--dark-gray-1));
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      background-color: rgb(var(--gray-1));
      border-radius: 4px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }
</style>
