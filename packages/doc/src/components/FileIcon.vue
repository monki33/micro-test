<script setup>
import { includes } from 'lodash-es'
const props = defineProps({
  fileType: {
    type: String,
    default: '',
  },
  size: {
    type: String,
  },
})
const iconWord = new URL('../assets/images/icon-word.png', import.meta.url).href
const iconExcel = new URL('../assets/images/icon-excel.png', import.meta.url).href
const iconPpt = new URL('../assets/images/icon-ppt.png', import.meta.url).href
const iconPdf = new URL('../assets/images/icon-pdf.png', import.meta.url).href
const iconTxt = new URL('../assets/images/icon-txt.png', import.meta.url).href
const iconImage = new URL('../assets/images/icon-img.png', import.meta.url).href
const iconAudio = new URL('../assets/images/icon-audio.png', import.meta.url).href
const iconVideo = new URL('../assets/images/icon-video.png', import.meta.url).href
const iconZip = new URL('../assets/images/icon-zip.png', import.meta.url).href
const iconFolder = new URL('../assets/images/icon-folder.png', import.meta.url).href
const iconFile = new URL('../assets/images/icon-file.png', import.meta.url).href
const currentIcon = computed(() => {
  if (includes(['doc', 'docx', 'docm', 'dotx', 'dot'], props.fileType))
    return iconWord
  else if (includes(['xls', 'xlsx', 'xlsb', 'xlsm', 'xlst', 'csv'], props.fileType))
    return iconExcel
  else if (includes(['ppt', 'pptx', 'pps', 'ppsx', 'ppa', 'ppam', 'pot', 'potx', 'thmx'], props.fileType))
    return iconPpt
  else if (includes(['pdf'], props.fileType))
    return iconPdf
  else if (includes(['txt', 'rtf'], props.fileType))
    return iconTxt
  else if (includes(['zip', 'rar', '7z', 'cab', 'iso', 'jar', 'ace', 'tar', 'gz', 'arj', 'lzh', 'bz2', 'z'], props.fileType))
    return iconZip
  else if (includes(['bmp', 'eps', 'gif', 'heic', 'icns', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'ttf', 'webp', 'base64'], props.fileType))
    return iconImage
  else if (includes(['aac', 'flac', 'm4a', 'mp3', 'ogg', 'wav'], props.fileType))
    return iconAudio
  else if (includes(['m4v', 'mp4', 'webm', 'mpg', 'mov', 'avi', 'wmv'], props.fileType))
    return iconVideo
  else if (includes(['folder'], props.fileType))
    return iconFolder
  else return iconFile
})
</script>

<template>
  <div class="file-icon" :class="size ? `size-${size}` : ''">
    <img :src="currentIcon" alt="文件图标">
  </div>
</template>

<style lang="scss" scoped>
.file-icon{
  width: 40px;
  height: 40px;
  &.size-md{
    width: 64px;
    height: 64px;
  }
  &.size-sm{
    width: 32px;
    height: 32px;
  }
  &.size-xs{
    width: 20px;
    height: 20px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
