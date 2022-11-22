<template>
  <div class="dv-index-container">
    <el-container>
      <el-aside>
        <img class="img-logo" src="/src/assets/vue.svg" alt="logo"/>

        <el-menu class="mnu-main no-select"
                 background-color="transparent"
                 :default-active="checked"
                 :collapse-transition="true"
                 @select="handleMenuChecked">
          <template v-for="menu in menuTree" :key="menu.code">
            <template v-if="!!menu.children && menu.children.length > 0">
              <el-sub-menu :index="menu.code">
                <template #title>
                  <icon :name="menu.icon"/>
                  <span>{{ menu.name }}</span>
                </template>

                <template v-for="sub in menu.children" :key="sub.code">
                  <template v-if="!!sub.children && sub.children.length > 0">
                    <el-sub-menu :index="sub.code">
                      <template #title>
                        <icon :name="sub.icon"/>
                        <span>{{ sub.name }}</span>
                      </template>

                      <template v-for="item in sub.children" :key="sub.code">
                        <template v-if="item.hasChildren">
                          <el-sub-menu :index="item.code">
                            <template #title>
                              <icon :name="item.icon"/>
                              <span>{{ item.name }}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :key="child.name" :index="child.code">{{ child.name }}</el-menu-item>
                          </el-sub-menu>
                        </template>
                        <template v-else>
                          <el-menu-item :index="item.code">
                            <icon :name="item.icon"/>
                            <template #title>{{ item.name }}</template>
                          </el-menu-item>
                        </template>
                      </template>

                    </el-sub-menu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="sub.code">
                      <icon :name="sub.icon"/>
                      <template #title>{{ sub.name }}</template>
                    </el-menu-item>
                  </template>
                </template>

              </el-sub-menu>
            </template>
            <template v-else>
              <el-menu-item :index="menu.code">
                <icon :name="menu.icon"/>
                <template #title>{{ menu.name }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div v-if="checked === 'downloading'" class="dv-ops-panel dv-ops-downloading">
            <el-button plain :icon="Plus"/>
          </div>
          <div v-if="checked === 'finished'" class="dv-ops-panel dv-ops-downloading">已完成的操作</div>
          <div v-if="checked === 'settings'" class="dv-ops-panel dv-ops-downloading">设置的操作</div>
        </el-header>

        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {Plus} from '@element-plus/icons-vue'
import {$ref} from 'vue/macros'

const router = useRouter()
let checked = $ref('downloading')

const menuTree = [
  {
    code: 'downloading',
    name: '正在下载',
    icon: 'Download',
  },
  {
    code: 'finished',
    name: '下载完成',
    icon: 'KnifeFork',
  },
  {
    code: 'settings',
    name: '设 置',
    icon: 'Setting',
  },
]

const handleMenuChecked = (key, keyPath, item, routerResult) => {
  if (key === checked) {
    return
  }
  checked = key

  // 根据 key 查找路由
  const rt = router.getRoutes().find(val => val.meta.menuName === key)
  if (rt) {
    router.push(rt)
  }
}

const checkToCurrentRoute = () => {
  const rt = useRoute()
  checked = rt.meta.menuName
}

onBeforeMount(() => {
  removeLoading()
  checkToCurrentRoute()
})
onBeforeUpdate(checkToCurrentRoute)

const removeLoading = () => {
  const animCubeGrid = document.querySelectorAll('.sk-cube-grid')
  console.log(animCubeGrid)
  if (animCubeGrid && animCubeGrid.length > 0) {
    setTimeout(() => animCubeGrid.forEach(it => document.body.removeChild(it)), 200)
  }
}
</script>

<style scoped lang="scss">
.dv-index-container {
  height: 100%;
  background: $primaryBgColor;

  .el-container {
    height: 100vh;

    .el-aside {
      color: white;
      text-align: center;
      background: $primaryColorDark;
      box-shadow: $primaryShadowDark;
      width: fit-content;
      position: relative;

      .img-logo {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 24px;
        left: 48%;
        transform: translateX(-50%);
      }

      .mnu-main {
        margin-top: 160px;
      }

      .el-menu {
        border-right: none;
        background-color: $primaryColorDark !important;

        .i-icon-menu {
          font-size: 1rem;
          margin-right: 12px;
        }

        .el-sub-menu__title, .el-menu-item {
          font-size: .8rem;
        }

        .el-menu-item * {
          vertical-align: 0;
          color: white;
        }

        .el-menu-item, .el-sub-menu__title {
          text-align: left;
          color: white;
        }

        .el-menu-item:hover, .el-sub-menu__title:hover {
          background-color: $blackAlphaColor;
        }

        .el-menu-item.is-active {
          background: $primaryColor !important;
        }

        .el-sub-menu .el-menu-item {
          font-size: .6rem;
          padding-left: 56px !important;
        }
      }

      .el-menu:not(.el-menu--collapse) {
        width: 200px;
      }
    }

    .el-header {
      height: 80px;
      padding: 0 16px;
      color: $fontPrimaryColor;
      box-shadow: $primaryShadowDark;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .el-main {
      padding: 0;
      display: flex;
    }
  }
}
</style>
