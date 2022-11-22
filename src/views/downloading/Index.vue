<template>
  <div class="dv-downloading-container">
    <div class="dv-media-item" @click="test">
      <div class="dv-item-title">
        <span class="sp-name">阿斯蒂芬是大法官.mp4</span>
        <span class="sp-speed">12MB/s</span>
      </div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="70"/>
    </div>
  </div>
</template>

<script setup>
// https://www.jianshu.com/p/b3397fd711d2
import {http} from '@tauri-apps/api'
import {toast} from '@/toast'

const url = 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8'
import { writeTextFile, writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
// Write a binary file to the `$APPDATA/avatar.png` path
// await writeBinaryFile({ path: 'avatar.png', contents: new Uint8Array([]) }, { dir: BaseDirectory.Document });
const test = () => {
  http.fetch(url, {
    method: 'GET',
    // *** 注意：get请求的参数值必须为字符串，不然tauri会报错，这是tauri框架的要求；可以自己手动进行字符串强制转换 ***
    query: {},
    // responseType: 2 // Text
    responseType: 3 // Binary
  }).then(res => {
    const data = String.fromCharCode.apply(null, new Uint8Array(res.data))
    toast.success(data)
    // writeTextFile({ path: 'test.m3u8', contents: res.data }, { dir: BaseDirectory.Document })
    writeBinaryFile({ path: 'test-binary.m3u8', contents: res.data }, { dir: BaseDirectory.Document })
  }).catch(err => {
    toast.error(err)
  })
}
</script>

<style scoped lang="scss">
.dv-downloading-container {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .dv-media-item {
    padding: 8px;

    .dv-item-title {
      margin-bottom: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .dv-media-item:hover {
    cursor: pointer;
    border-radius: 4px;
    box-shadow: $primaryShadowDark;
  }
}
</style>
