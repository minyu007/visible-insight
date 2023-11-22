<template>
  <div class="container">
    <Breadcrumb :items="['Data', 'Data Source']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card">
          <template #title><icon-font type="icon-zuzhiheguanlitubiao-" :size="24" /> Data Source </template>
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" :title="$t('cardList.tab.title.all')">
                  <QualityInspection />
                  <TheService />
                  <RulesPreset />
                </a-tab-pane>
                <a-tab-pane key="2" title="Internal">
                  <TheService />
                </a-tab-pane>
                <a-tab-pane key="3" title="External">
                  <QualityInspection />
                </a-tab-pane>
                <a-tab-pane key="4" title="Spreadsheets">
                  <RulesPreset />
                </a-tab-pane>
                
              </a-tabs>
            </a-col>
            <a-input-search
              :placeholder="$t('cardList.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import QualityInspection from './components/quality-inspection.vue';
  import TheService from './components/the-service.vue';
  import RulesPreset from './components/rules-preset.vue';
  import { Icon } from '@arco-design/web-vue';

  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_3959654_asl72fm6sch.js',
  });
</script>

<script lang="ts">
  export default {
    name: 'Card',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    :deep(.arco-list-content) {
      overflow-x: hidden;
    }

    :deep(.arco-card-meta-title) {
      font-size: 14px;
    }
  }
  :deep(.arco-list-col) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  :deep(.arco-list-item) {
    width: 33%;
  }

  :deep(.block-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
  :deep(.list-wrap) {
    // min-height: 140px;
    .list-row {
      align-items: stretch;
      .list-col {
        margin-bottom: 16px;
      }
    }
    :deep(.arco-space) {
      width: 100%;
      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>
