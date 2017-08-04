<template>
  <form enctype="multipart/form-data">
    <div class="p-l-30 p-r-30 ">
      <p class="f-30 p-b-20 text-center">
        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
        上传文件
      </p>
      <input id="file-zh" name="file-zh" type="file" multiple>
    </div>
  </form>

</template>

<script>
  export default {
    mounted () {
      window.$('#file-zh').fileinput({
        language: 'zh',
        uploadUrl: '/web/element',
        allowedFileExtensions: ['jpg', 'png', 'gif', 'mp4', 'mp3'],
        overwriteInitial: false,
        maxFileSize: 10000000000000000000000000000000,
        maxFilesNum: 10,
        // allowedFileTypes: ['image', 'video', 'audio'],
        slugCallback: function (filename) {
          return filename.replace('(', '_').replace(']', '_')
        }
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
