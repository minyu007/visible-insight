<template>
  <div class="container">
    <Breadcrumb :items="['Models', 'Model-Edit']" />
    <a-layout-content>
      <iframe src="http://127.0.0.1:10101/?target=https://my.causal.app/" style="border: none" width="100%" height="900px"></iframe>
    </a-layout-content>
  </div>
</template>

<script lang="ts" setup>
// window.chrome.webRequest.onHeadersReceived.addListener(function (info) {
//     for (let i = headers.length - 1; i >= 0; i--) {
//       let header = headers[i].name.toLowerCase()
//       if (header == 'x-frame-options' || header == 'frame-options') {
//         headers.splice(i, 1)
//       }
//     }
//     return { responseHeaders: headers }
//   }, {
//     urls: ['*://*.causal.com/*'],
//     types: ['main_frame', 'sub_frame']
//   },['blocking', 'responseHeaders'])
</script>

<script lang="ts">
  export default {
    name: '403',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    height: calc(100% - 40px);
    :deep(.content) {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      background-color: var(--color-bg-1);
      border-radius: 4px;
    }
  }
</style>
