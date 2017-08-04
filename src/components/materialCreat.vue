<template>
<!-- Modal -->
<div class="modal fade" id="directorycreat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     data-keyboard=false data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">新建文件夹</h4>
      </div>
      <div class="modal-body">
        
        <div class="row">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-3 text-right">
                <label for="filename">
                  文件名称
                </label>
              </div>
              <div class="col-xs-7">
                <div class="fg-line">
                  <input type="text" id="filename" class="form-control" 
                         placeholder="请输入用户名称" v-model="editItem.name"/>
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
  // import Vue from 'vue'

  export default {
    props: ['editItem'],
    data () {
      return {
      }
    },
    methods: {
      save () {
        let self = this
        window.axios.put(`web/element/${self.editItem.id}`, self.editItem).then(res => {
          self.close()
        })
      },
      close () {
        window.$('#directorycreat').modal('hide')
      }
    }
  }
</script>
<style></style>

