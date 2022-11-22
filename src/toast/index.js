import {ElMessage, ElMessageBox} from 'element-plus'

let toastInstance = null

export const toast = {
  success: msg => {
    if (toastInstance) {
      toastInstance.close()
    }
    toastInstance = ElMessage.success({
      message: msg,
    })
  },
  warning: msg => {
    if (toastInstance) {
      toastInstance.close()
    }
    toastInstance = ElMessage.warning({
      message: msg,
    })
  },
  error: msg => {
    if (toastInstance) {
      toastInstance.close()
    }
    toastInstance = ElMessage.error({
      message: msg,
    })
  },
  nextOrBack: (isChainMode, router, thenCallback) => {
    if (isChainMode) {
      ElMessageBox.confirm('保存成功', {
        type: 'success',
        confirmButtonText: '继续添加',
        cancelButtonText: '返回列表',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
      }).then(() => {
        // 继续
        thenCallback()
      }).catch(() => {
        // 返回列表页
        router.back()
      })
    } else {
      // 编辑模式，直接返回列表页
      toast.success('保存成功')
      router.back()
    }
  },
}
