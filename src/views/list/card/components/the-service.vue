<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      Internal
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
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
                  alt="Discovery"
                  :src="FILLogo"
                />
              </div>
            </template>
            <a-card-meta title="Discovery" description="Internal database">
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
                  alt="Insight"
                  :src="FILLogo"
                />
              </div>
            </template>
            <a-card-meta title="Insight" description="Internal database">
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
  </div>
</template>

<script lang="ts" setup>
  import { queryTheServiceList, ServiceRecord } from '@/api/list';
  import useRequest from '@/hooks/request';
  import CardWrap from './card-wrap.vue';
  import FILLogo from '@/assets/images/fil.png'
  import { Icon } from '@arco-design/web-vue';

  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_3959654_ylocvli63ak.js',
  });


  const defaultValue: ServiceRecord[] = new Array(4).fill({});
  const { loading, response: renderData } = useRequest<ServiceRecord[]>(
    queryTheServiceList,
    defaultValue
  );
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
