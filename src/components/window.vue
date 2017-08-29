<template>
    <!-- <transition name="contract"> -->
  <div class="uploadDialog"
      :class='{displayNone: isclose, displayBlock: !isclose, contractHeight: isContract}'>
    <div class="dialog-header">
      <h3>
        <span class="dialog-header-title ellipsis">
        <em class="select-text">上传列表</em>
          </span>
      </h3>
      <div class="dialog-control">
        <span class="fa fa-close" @click="isclose = true" title='关闭窗口'>
        </span>
        <span class="fa fa-minus" title='缩小窗口' @click="contractWindow">
        </span>
      </div>
    </div>
      <upload-dialog :fileBatchs='fileBatchs'
                     v-on:fileuploaded='fileuploaded'
                     v-on:uploadProgress='fileProgress'
                     v-on:isClickUploadBtn='isClickUploadBtn'>
      </upload-dialog>
  </div>
    <!-- </transition> -->
</template>

<script>
  import uploadDialog from './uploadDialog.vue'

  export default {
    props: ['fileBatchs'],
    components: {
      uploadDialog
    },
    data () {
      return {
        uploadProgress: '',
        isclose: true,
        isContract: false,
        isshowUploadTemplate: true
      }
    },
    methods: {
      fileuploaded (data) {
        this.$emit('fileuploaded', data)
      },
      fileProgress (data) {
        this.uploadProgress = data
      },
      isClickUploadBtn (data) {
        this.isclose = data
      },
      contractWindow () {
        this.isContract = !this.isContract
        // this.isshowUploadTemplate = !this.isshowUploadTemplate
      }
    }
  }
</script>

<style lang='sass' scoped> 
  .dialog-header h3
    height: 44px;
    line-height: 44px;
    color: #424e67;
    position: relative;
    display: block;
    text-indent: 1em;
    font-size: 14px;
    font-weight: 700;
    .dialog-header-title
      display: block;
      margin-right: 50px;
      .select-text
        -webkit-user-select: initial;
        -khtml-user-select: initial;
        -moz-user-select: initial;
        -ms-user-select: initial;
        -o-user-select: initial;
        user-select: initial;
        font-style: normal;
        cursor: text;

  .dialog-control
    top: 13px;
    right: 12px;
    position: absolute;
    height: 20px;
    span
      display: inline-block;
      font-size: 16px;
      color: #607194;
      line-height: 20px;
      text-align: center;
      margin: 0 6px;
      cursor: pointer;
      float: right;


  .displayNone
    display: none;

  .displayBlock
    display: block;
  .uploadDialog
    width: 635px;
    height: 430px;

  .contractHeight
    height: 50px!important;

  .contract-enter-active
  .contract-leave-active
    transition-property: bottom;
    transition-duration: 2s;
    transition-timing-function: linear;
  .contract-enter
  .contract-leave-to
    bottom: 50px;
</style>

