<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      All Data Source
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
      <a-col
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
      >
        <div class="card-wrap empty-wrap">
          <a-card :bordered="false" hoverable>
            <a-result :status="null" :title="$t('cardList.content.action')">
              <template #icon>
                <icon-plus style="font-size: 26px" @click='handleClick'/>
              </template>
              Connect to hundreds of sources
            </a-result>
          </a-card>
        </div>
      </a-col>
      <a-col
        class="list-col"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
      >
        <div class="card-wrap">
          <a-card :bordered="false" hoverable>
            <template #actions>
              <a-button type="primary" @click='handleClick'>
                Connect
              </a-button>
              <a-button type="outline">
                Edit
              </a-button>
            </template>
            <template #cover>
              <div class="arco-card-cover-1">
                <img
                  :style="{ width: '60%' }"
                  alt="Wind"
                  :src="WindLogo"
                />
              </div>
            </template>
            <a-card-meta title="Wind" description=" Wind is a leading provider of financial information services in China">
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  
                  <icon-font type="icon-jifenduihuan" :size="24" />
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </a-col>

      <a-col
        class="list-col"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
      >
        <div class="card-wrap">
          <a-card :bordered="false" hoverable>
            <template #actions>
              <a-button type="primary">
                Connect
              </a-button>
              <a-button type="outline">
                Edit
              </a-button>
            </template>
            <template #cover>
              <div class="arco-card-cover-1">
                <img
                  :style="{ width: '60%' }"
                  alt="bloomberg"
                  :src="BBGLogo"
                />
              </div>
            </template>
            <a-card-meta title="Bloomberg" description="Bloomberg Professional service (the Terminal) is the most powerful">
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <!-- <a-avatar :size="24" :style="{ marginRight: '8px' }">
                    A
                  </a-avatar> -->
                  <icon-font type="icon-jifenduihuan" :size="24" />
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </a-col>

      <a-col
        class="list-col"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
      >
        <div class="card-wrap">
          <a-card :bordered="false" hoverable>
            <template #actions>
              <a-button type="primary">
                Connect
              </a-button>
              <a-button type="outline">
                Edit
              </a-button>
            </template>
            <template #cover>
              <div class="arco-card-cover-1">
                <img
                  :style="{ width: '54%' }"
                  alt="Eikon"
                  :src="EikonLogo"
                />
              </div>
            </template>
            <a-card-meta title="Eikon" description="Refinitiv Eikon Connecting You To News, Data, Analytics & More.">
              <template #avatar>
                <div
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
                >
                  <!-- <a-avatar :size="24" :style="{ marginRight: '8px' }">
                    A
                  </a-avatar> -->
                  <icon-font type="icon-jifenduihuan" :size="24" />
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </a-col>
    </a-row>
    <a-modal width="60%" okText="Go to Modelling" cancelText="cancel"    v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" :on-before-ok="handleBeforeOk" unmountOnClose>
      <template #title>
        Data Sources
      </template>
      <a-row class="list-row" :gutter="24">
        <a-col
          class="list-col"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
          :xxl="8"
        >
          <div class="card-wrap">
            <a-card hoverable>
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }"
              >
                <span
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129'}"
                >
                  <img :style="{ width: '35%' }" alt="Wind" :src="WindLogo" />
                </span>
                <a-button type="text" :loading="isConnecting" @click="doConnect">{{ !showItem?'Connect': 'Connected' }}
                  <template #icon>
                    <icon-check v-if="showItem"/>
                    <icon-plus v-if="!showItem"/>
                  </template>
                </a-button>
                <!-- <a-spin v-if="isConnecting">
                  <template #icon>
                    <icon-sync />
                  </template>
                </a-spin> -->
              </div>
            </a-card>
          </div>
        </a-col>
        <!-- <a-col
          class="list-col"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
          :xxl="8"
        >
          <div class="card-wrap">
            <a-card hoverable>
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }"
              >
                <span
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129'}"
                >
                  <img :style="{ width: '12%' }" alt="CSV" :src="CSVLogo" />
                </span>
                <a-button type="text">Connect</a-button>
              </div>
            </a-card>
          </div>
        </a-col>
        <a-col
          class="list-col"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
          :xxl="8"
        >
          <div class="card-wrap">
            <a-card hoverable>
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }"
              >
                <span
                  :style="{ display: 'flex', alignItems: 'center', color: '#1D2129'}"
                >
                  <img :style="{ width: '38%' }" alt="Discovery" :src="FILLogo" />
                </span>
                <a-button type="text">Connect</a-button>
              </div>
            </a-card>
          </div>
        </a-col> -->
      </a-row>
      <a-row class="list-row" :gutter="24" v-if="showItem">
        <a-col
          class="list-col"
          :span="24"
        >
        <a-divider orientation="left">
          <a-typography-text>Ticker</a-typography-text>
        </a-divider>
        <div  :style="{ marginTop: '20px' }">
          <a-input-search :style="{width:'320px'}" placeholder="Input a ticker" search-button default-value="603288.SH">
          <template #button-icon>
              <icon-search/>
            </template>
            <template #button-default>
              Search
            </template>
          </a-input-search>
        </div>
        <a-divider orientation="left">
          <a-typography-text>Date Range</a-typography-text>
        </a-divider>
        <div  :style="{ marginTop: '20px' }">
              <a-range-picker
          @change="onChange"
          @select="onSelect"
          v-model="rangeValue"
          style="width: 254px; marginBottom: 20px;"
        />
        </div>
        <a-divider orientation="left">
          <a-typography-text>Select Reports</a-typography-text>
        </a-divider>
        <div :style="{ marginTop: '20px' }">
            <a-checkbox-group :default-value="[1]">
              <template v-for="item in items" :key="item">
                <a-checkbox :value="item">
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
                        {{ item }}
                        </div>
                      </div>
                    </a-space>
                  </template>
                </a-checkbox>
              </template>
            </a-checkbox-group>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { queryInspectionList, ServiceRecord } from '@/api/list';
  import useRequest from '@/hooks/request';
  import CardWrap from './card-wrap.vue';
  import WindLogo from '@/assets/images/wind.png'
  import BBGLogo from '@/assets/images/bbg.png'
  import EikonLogo from '@/assets/images/eikon.png'
  import FILLogo from '@/assets/images/fil.png'
  import CSVLogo from '@/assets/images/csv.png'
  import { Icon } from '@arco-design/web-vue';

  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_3959654_asl72fm6sch.js',
  });

  const defaultValue: ServiceRecord[] = new Array(3).fill({});
  const { loading, response: renderData } = useRequest<ServiceRecord[]>(
    queryInspectionList,
    defaultValue
  );

  const visible = ref(false);

  const isConnecting = ref(false);
  const showItem = ref(false)
  const isGoing = ref(false)

  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    isGoing.value = true;
    return false
  };
  const handleCancel = () => {
    visible.value = false;
  }

  const doConnect = () => {
    isConnecting.value = true
    const timer = setTimeout(() => {
      isConnecting.value = false
      showItem.value = true
      clearTimeout(timer)
    }, 1200)
  }

  const handleBeforeOk = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return true;
  };

  const onSelect  = (dateString, date) =>{
    console.log('onSelect', dateString, date);
  }
  const onChange  = (dateString, date) =>{
    console.log('onChange: ', dateString, date);
  }

  const rangeValue = [new Date('2018-01-01').getTime(), Date.now()]

  const items = ['Balance Sheet','Income Statement','Cash flow']
</script>

<style scoped lang="less">
.arco-checkbox{
  margin-bottom: 10px
}
.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 240px;
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
.arco-card-cover-1{
  text-align: center;
  padding-top: 10px;
}
  .card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    &:hover {
      transform: translateY(-4px);
    }
    :deep(.arco-card-meta-description) {
      color: rgb(var(--gray-6));
      .arco-descriptions-item-label-inline {
        font-weight: normal;
        font-size: 12px;
        color: rgb(var(--gray-6));
      }
      .arco-descriptions-item-value-inline {
        color: rgb(var(--gray-8));
      }
    }
  }
  .empty-wrap {
    height: 200px;
    border-radius: 4px;
    :deep(.arco-card) {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      .arco-result-title {
        color: rgb(var(--gray-6));
      }
    }
  }
  .card-wrap {
    height: 100%;
    transition: all 0.3s;
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    &:hover {
      transform: translateY(-4px);
      // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    }
    :deep(.arco-card) {
      height: 100%;
      border-radius: 4px;
      .arco-card-body {
        height: 100%;
        .arco-space {
          width: 100%;
          height: 100%;
          .arco-space-item {
            height: 100%;
            &:last-child {
              flex: 1;
            }
            .arco-card-meta {
              height: 100%;
              display: flex;
              flex-flow: column;
              .arco-card-meta-content {
                flex: 1;
                .arco-card-meta-description {
                  margin-top: 8px;
                  color: rgb(var(--gray-6));
                  line-height: 20px;
                  font-size: 12px;
                }
              }
              .arco-card-meta-footer {
                margin-top: 0;
              }
            }
          }
        }
      }
    }
    :deep(.arco-card-meta-title) {
      display: flex;
      align-items: center;

      // To prevent the shaking
      line-height: 28px;
    }
    :deep(.arco-skeleton-line) {
      &:last-child {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
</style>
