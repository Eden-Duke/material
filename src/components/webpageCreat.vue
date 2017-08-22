<template>
<!-- Modal -->
<div class="modal fade" id="webpageCreat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     data-keyboard=false data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title" id="myModalLabel">填写网页链接</h3>
      </div>
      <div class="modal-body">
        
        <div class="row">
          <div class="col-xs-12">
            <div class="row m-b-20">
              <div class="col-xs-3 text-right">
                <label for="filename">
                  网页名称
                </label>
              </div>
              <div class="col-xs-7">
                <div class="fg-line">
                  <input type="text" id="filename" class="form-control" 
                         placeholder="请输入网页名称" v-model="formData.name"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-3 text-right">
                <label for="fileurl">
                  网址
                </label>
              </div>
              <div class="col-xs-7">
                <div class="fg-line">
                  <input type="text" id="fileurl" class="form-control" 
                         placeholder="请输入网址" v-model="formData.path"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">取消</button>
        <button type="button" class="btn btn-default" @click="save">确定</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        formData: {}
      }
    },
    methods: {
      save () {
        let self = this
        window.axios.post(`/web/element/saveurl`, self.formData).then(res => {
          self.$emit('webdata', res.data)
          self.close()
        })
      },
      close () {
        this.formData = {}
        window.$('#webpageCreat').modal('hide')
      }
    }
  }
</script>
<style lang='sass' scpoed>
  h3
    font-weight: 700;

  label
    font-weight: 400;
</style>

