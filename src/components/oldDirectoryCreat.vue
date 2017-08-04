<template>
<!-- Modal -->
<div class="modal fade" id="directorycreat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     data-keyboard=false data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">新建文件夹{{ model }}</h4>
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
                         placeholder="请输入用户名称" v-model="formData.name"/>
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
  import Vue from 'vue'

  export default {
    props: ['model'],
    data () {
      return {
        formData: {}
      }
    },
    methods: {
      changeType (addObj) {
        // if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild(addObj)
        this.treeOpen = true
        // }
      },
      addChild (addObj) {
        this.model.children.push(addObj)
      },
      save () {
        let self = this
        window.axios.post('web/directory', self.formData).then(res => {
          if (!(self.model.children && self.model.children.length)) {
            self.changeType(res.data)
          } else {
            self.addChild(res.data)
          }
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