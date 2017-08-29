<template>
  <div class="uploadTemplate">
    <table class="table table-hover table-responsive table-condensed">
      <thead>
        <tr>
          <th>
            文件(夹)名
          </th>
          <th>大小</th>
          <th>上传进度</th>
          <!-- <th>上传目录</th> -->
          <!-- <th>状态</th>
          <th>操作</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in showUploadFiles">
          <td class="ellipsis">
            <span class="folder"><i class="fa fa-file-image-o"></i></span>
            <span class="file-name ellipsis">
              {{ file.name }}
            </span>
          </td>
          <td class="ellipsis">
            <span>
              {{ file.size }}
            </span>
          </td>
          <td class="ellipsis">
            <span>
              <span>{{ file.progress }}</span>
              <span v-if="file.progress !== '100.0%'">({{ file.uploadSpeed }})</span>
            </span>
          </td>
          <!-- <td class="ellipsis">
            <span>
              我的文件夹
            </span>
          </td>
          <td class="ellipsis">
            <span>
              <span class="fa fa-check-circle"></span>
              <span v-if='false'>10.00%(1000kb/s)</span>
              <span v-if='false'>已取消</span>
              <span v-if='false'>已暂停</span>
            </span>
          </td>
          <td class="ellipsis">
            <span>
              <span class="fa fa-play"></span>
              <span class="fa fa-pause" v-if='false'></span>
              <span class="fa fa-close"></span>
            </span>
            <span>
              <span class="fa fa-repeat" v-if='false'></span>
            </span>
          </td> -->
        </tr>
      </tbody>
    </table>
    <input type="file" multiple class="fileBatchUpload" @change="selectFiles">
  </div>
</template>

<script>
  import Vue from 'vue'
  import FileUploader from '../../static/js/fileupload.js'
  import Utils from '../../static/js/utils.js'

  export default {
    props: ['fileBatchs'],
    watch: {
      'fileBatchs' () {
        let self = this
        self.$emit('isClickUploadBtn', false)
        window.$('input.fileBatchUpload').click()
      }
    },
    data () {
      return {
        allUploadFiles: [],
        selectedFiles: [],
        showUploadFiles: []
      }
    },
    methods: {
      selectFiles (e) {
        let files = e.target.files
        console.log(files)
        this.selectedFiles = []
        this.showUploadFiles = []
        if (files.length) {
          for (let key in files) {
            if (!isNaN(Number(key))) {
              this.selectedFiles.push(files[key])
              let uploadFile = {}
              uploadFile.name = files[key].name
              uploadFile.size = Utils.formatFileSize(files[key].size)
              this.showUploadFiles.push(uploadFile)
            }
          }
          this._uploadFile(this.selectedFiles)
        }
      },
      _uploadFile (files) {
        let _files = this.showUploadFiles
        let self = this

        let uploader = new FileUploader()
        uploader.upload(files)
        uploader.on('progress', (progress, index) => {
          Vue.set(_files[index], 'progress', progress)
        })
        .on('uploadSpeed', (uploadSpeed, index) => {
          Vue.set(_files[index], 'uploadSpeed', uploadSpeed)
        })
        .on('fileuploaded', (fileuploaded, index) => {
          self.$emit('fileuploaded', fileuploaded)
        })
      }
    }
  }
</script>
<style lang='sass' scoped>
  table.table 
    thead
      tr
        padding: 0 10px;
        th
          color: #424e67;
        th:nth-child(1)
          padding-left: 15px;
          width: 45%!important;
        th:nth-child(2)
          width: 13%!important;
        th:nth-child(3)
          width: 15%!important;
        th:nth-child(4)
          width: 19%!important;
        th:nth-child(5)
          padding-right: 15px;
          width: 10%!important;
    tbody
      tr
        td:nth-child(1)
          padding-left: 15px;
        td:nth-child(5)
          padding-right: 15px;
          span
            span
              display: inline-block;
              margin-right: 10px;
              cursor: pointer;

  .uploadTemplate
    font-size: 12px;
    color: #424e67;
    overflow: auto;
    height: 90%;
  .file-name
    width: 100%;
  .fa-check-circle
    color: #5dd993;
    font-size: 16px;

  input.fileBatchUpload
    visibility: hidden;
</style>