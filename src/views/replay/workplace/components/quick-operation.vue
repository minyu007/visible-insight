<template>
  <a-card
    class="general-card"
    :title="$t('workplace.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <!-- <template #extra>
      <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link>
    </template> -->
    <a-row :gutter="8">
      <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t(link.text) }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts" setup>
  const links = [
    { text: 'Authoring', icon: 'icon-file' },
    { text: 'Data Source', icon: 'icon-storage' },
    { text: 'Settings', icon: 'icon-settings' },
    { text: 'AMP', icon: 'icon-mobile' },
    { text: 'Fidelity BI', icon: 'icon-thunderbolt' },
  ];
</script>

<style scoped lang="less"></style>
