<template>
  <el-config-provider :locale="zhCn" :button="btnConfig">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const btnConfig = reactive({
  autoInsertSpace: true,
})
</script>

<style lang="scss">
* {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

// 自定义进度条颜色
#nprogress .bar {
  background: $primaryColor !important; //自定义颜色
}

body {
  margin: 0;
  box-sizing: border-box;
  background-color: $primaryBgColor;

  code {
    font-family: Consolas, SFMono-Regular, Liberation Mono, Menlo, monospace;
    font-size: .8rem;
    padding: .3em .7em;
    margin: 0;
    border-radius: 6px;
    background: $primaryAlphaColor;
    color: $fontPrimaryColor;
  }

  textarea {
    font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100vh;
    position: relative;
    font-family: Consolas, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .grayscale {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }

  .gray-color {
    color: #989a9c;
  }

  input::-webkit-input-placeholder {
    /*Chrome/Safari*/
    color: $placeHolderColor !important;
  }

  input::-moz-placeholder {
    /*Firefox*/
    color: $placeHolderColor !important;
  }

  input::-ms-input-placeholder {
    /*IE*/
    color: $placeHolderColor !important;
  }

  .no-select {
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  .btn-dangerous {
    color: $dangerColor !important;
  }

  .sp-btn-copy {
    margin-left: 8px;
    font-size: 1rem;
    cursor: pointer;
  }

  .sp-btn-copy:hover {
    color: $primaryColor;
  }

  .ph-opts {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .dw-fm-body {
    .fm-item-dl {
      margin-bottom: 24px;

      .ipt-fm {
        width: 100%;
      }
    }
  }
}
</style>
