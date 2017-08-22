<template>
  <form enctype="multipart/form-data">
    <div class="p-l-30 p-r-30 ">
      <p class="f-30 p-b-20 text-center">
        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
        上传文件
      </p>
      <input id="fileBatchUpload" name="fileBatchUpload" type="file" multiple>
    </div>
  </form>
</template>

<script>
  import md5 from '../../static/js/md5.js'

  export default {
    mounted () {
      let _md5 = []
      // let i = 0
      window.$('#fileBatchUpload').fileinput({
        language: 'zh',
        uploadUrl: '/web/element',
        allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg', 'mov', 'avi', 'mkv', 'mp4', 'mp3'],
        overwriteInitial: false,
        maxFileSize: 10000000000000,
        maxFilesNum: 10,
        // allowedFileTypes: ['image', 'video', 'audio'],
        slugCallback: (filename) => {
          // console.log(filename)
          return filename.replace('(', '_').replace(']', '_')
        },
        uploadExtraData: (previewId, index) => {
          var obj = { 'md5': _md5[index] }
          return obj
        }
      })
      .on('filebatchselected', (event, files) => {
        files.forEach(async (file, index) => {
          let md5Str = await md5(file)
          _md5[index] = md5Str
        })
      })
      .on('filepreupload', function (event, data, previewId, index) {
        console.log('1')
      })
      .on('filebatchuploadsuccess', function (event, data, previewId, index) {
        window.$('#fileBatchUpload').fileinput('clear')
      })
    }
  }
</script>
<style lang='sass' scoped>
  p
    color: #70abff;
    .fa-cloud-upload
      font-size: 40px;
      vertical-align: middle;
</style>
