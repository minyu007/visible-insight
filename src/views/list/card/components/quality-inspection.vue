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
              <a-button type="primary">
                Delete
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
                Delete
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
                Delete
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
    <a-modal width="60%" okText="Connect" cancelText="cancel"  v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" draggable>
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
                  <img :style="{ width: '15%' }" alt="Wind" :src="WindLogo" />
                </span>
                <a-link>Connect</a-link>
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
                  <img :style="{ width: '12%' }" alt="CSV" :src="CSVLogo" />
                </span>
                <a-link>Connect</a-link>
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
                  <img :style="{ width: '22%' }" alt="Discovery" :src="FILLogo" />
                </span>
                <a-link>Connect</a-link>
              </div>
            </a-card>
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

  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  }
</script>

<style scoped lang="less">
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
