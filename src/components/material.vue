<template>
  <div>
  <div class="btn-group m-r-20" role="group"  aria-label="buttonGroup">
    <button class="btn btn-default"  aria-label="Left Align" @click="_getMaterial(butn, index)"
            v-for="(butn, index) in buttons" :class="{activeButn: butn.selected}">
      <i :class="butn.icon"></i>
      {{ butn.name }}
    </button>
  </div>

      <router-link to="/uploadfile" target="_blank">
        <button class="btn btn-default btn-sm"  aria-label="Left Align">
          <span class="fa fa-upload" aria-hidden="true"></span>
          上传文件
        </button>
      </router-link>
      <button class="btn btn-default btn-sm"  aria-label="Left Align" @click="webapge">
        <i class="fa fa-upload" aria-hidden="true"></i>
        网页素材上传
      </button>
      <webpage-creat v-on:webdata='webdata'></webpage-creat>

    <div class="btn-group" role="group"  aria-label="buttonGroup">
     <!--  <button class="btn btn-default btn-sm"  aria-label="Left Align" @click="downLoad">
        <i class="fa fa-download" aria-hidden="true"></i>
        下载
      </button> -->
      <button v-if='!activeItem && selectedItems.length' @click="del"
              class="btn btn-default btn-sm"  aria-label="Left Align">
        <i class="fa fa-remove" aria-hidden="true"></i>
        删除
      </button>
      <!-- <button class="btn btn-default btn-sm">重命名</button> -->
      <!-- <button class="btn btn-default btn-sm">移动到</button> -->
    </div>
    <div class="content m-t-30 p-15">
        <p v-if='!files.length' class="f-18 p-20 text-center req-default">
          此分类没有数据
        </p>
        <table v-if='files.length' class="table table-hover table-responsive table-condensed">
          <thead>
            <tr>
              <th>
                <span class="span-select" @click="selectAll">
                  <i :class="isselectAll ? 'fa fa-check-square' : 'fa fa-square-o'"></i>
                </span>
                <span class="file-name">
                  文件名
                </span>
                </th>
              <th>时长/网址</th>
              <th>大小</th>
              <th>修改日期</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{active: file.selected}" v-for="(file, index) in files" 
                @click="click_tr(file, index)">
              <td class="ellipsis" :title="file.name">
                <span class="span-select">
                  <i :class="file.selected ? 'fa fa-check-square' : 'fa fa-square-o'"
                     @click.stop='click_checkbox(file, index)'></i>
                </span>
                <span class="folder">
                  <i v-if='!file.type' class="fa fa-folder"></i>
                  <i v-if="file.type && file.type === 'video'" class="fa fa-file-video-o"></i>
                  <i v-if="file.type && file.type === 'audio'" class="fa fa-file-audio-o"></i>
                  <i v-if="file.type && file.type === 'image'" class="fa fa-file-image-o"></i>
                  <i v-if="file.type && file.type === 'link'" class="fa fa-link"></i>
                </span>
                <span class="file-name ellipsis">
                  {{ file.name }}
                </span>
                <span class="operate-menu">
                  <span @click='edit(file, index)' title="编辑">
                    <i class="fa fa-pencil"></i>
                  </span>
                  <span @click='del(file, index)' title="删除" 
                        v-if='activeItem && selectedItems.length === 1'>
                    <i class="fa fa-trash"></i>
                  </span>
                  <a :href="'web/element?name=' + file.name + 'name&path=' + file.path" download
                     v-if="file.type && file.type !== 'link'" title="下载">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </a>
                  <a :href="'http://' + file.path" target="blank" title="打开连接" 
                     v-if="file.type && file.type === 'link'">
                    <i class="fa fa-link" aria-hidden="true"></i>
                  </a>
                </span>
                <material-creat :editItem='editItem'></material-creat>
              </td>
              <td class="ellipsis" :title="file.duration" v-if="file.type && file.type !== 'link'">
                {{ file.type && file.type === 'image' ? '' : file.duration }}
              </td>
              <td class="ellipsis" :title="file.path" v-if="file.type && file.type === 'link'">
                {{ file.path }}
              </td>
              <td class="ellipsis" :title="file.size">
                {{ file.type && file.type === 'link' ? '' : file.size }}
                </td>
              <td class="ellipsis" :title="file.update_at">{{ file.update_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import materialCreat from './materialCreat.vue'
import webpageCreat from './webpageCreat.vue'

export default {
  components: {
    materialCreat, webpageCreat
  },
  data () {
    return {
      buttons: [
        {name: '全部', icon: ''},
        {name: '图片', icon: 'fa fa-image'},
        {name: '视频', icon: 'fa fa-video-camera'},
        {name: '音乐', icon: 'fa fa-music'},
        {name: '网页', icon: 'fa fa-link'}
      ],
      files: [],
      isselectAll: false,
      activeItem: null,
      editItem: {},
      selectedItems: []
    }
  },
  watch: {
    '$route': 'ajaxData'
  },
  beforeMount () {
  },
  mounted () {
    this._getMaterial(this.buttons[0], 0)
  },
  methods: {
    downLoad () {
      // console.log('down')
      // // let sequence = Promise.resolve()
      // let self = this
      // self.selectedItems.forEach(function (ele, index) {
      //   // sequence = sequence.then(() => {
      //   self._downLoad(ele.name, ele.path)
      //   // })
      // })
      if (this.selectedItems.length > 0) {
        let { name, path } = this.selectedItems.pop()
        console.log(name, path)
        this._downLoad(name, path)
        setTimeout(this.download, 3000)
      }
    },
    _downLoad (name, path) {
      // window.location.href = `web/element?name=${name}&path=${path}`

      var iframe = document.createElement('iframe')
      // if (!/*@cc_on!@*/0) { // 浏览器 不是IE的情况下
      iframe.onload = function () {
        console.log(iframe.readyState)
        // alert('已经加载完成！')
      }
      iframe.src = `web/element?name=${name}&path=${path}`
      // }
      // else {
      //   iframe.onreadystatechange = function () {
      //     if (iframe.readyState === 'complete') {
      //       alert('已经加载完成！')
      //     }
      //   }
      // }
      document.body.appendChild(iframe)
    },
    webdata (data) {
      this.files.push(data)
    },
    webapge () {
      window.$('#webpageCreat').modal('show')
    },
    ajaxData () {
      this._getMaterialQuery()
      this._getMaterial()
    },
    edit (item, index) {
      window.$('#directorycreat').modal('show')
      this.editItem = item
    },
    del (item, index) {
      let self = this
      let delId = null
      let arrId = []
      let ismany = self.activeItem && self.selectedItems.length === 1
      if (ismany) {
        delId = item.id
      } else {
        self.selectedItems.forEach(function (element, index) {
          arrId.push(element.id)
        })
        delId = arrId.join()
      }
      self.$reused.del(`/web/element/${delId}`, res => {
        if (ismany) {
          self.files.splice(index, 1)
        } else {
          self.selectedItems.forEach(function (ele, ind) {
            self.files.forEach(function (element, index) {
              if (ele.id === element.id) {
                self.files.splice(index, 1)
              }
            })
          })
        }
        self.selectedItems = []
        self.$reused._alertSuccess()
      })
    },
    save (item, index) {
    },
    _getMaterial (item, typeId) {
      let self = this
      self.isselectAll = false
      self.$reused._selected(item, self, 'activeBtn')
      if (!self.$route.query.id) {
        window.axios.get(`/web/element/${typeId}`).then(res => {
          self.files = res.data
        })
      }
    },
    _getMaterialQuery () {
      let self = this
      if (self.$route.query.id) {
        window.axios.get(`/web/element/${self.$route.query.id}`).then(res => {
          self.fileContent = res.data
        }, err => {
          console.log(err)
          self.$router.push({name: '/'})
        })
      }
    },
    selectAll () {
      let self = this
      self.files.forEach(function (element, index) {
        if (self.isselectAll) {
          Vue.set(element, 'selected', false)
        } else {
          Vue.set(element, 'selected', true)
        }
      })
      if (self.isselectAll) {
        self.selectedItems = []
      } else {
        self.$reused._copy(self.files, self.selectedItems)
      }
      self.isselectAll = !self.isselectAll
      // this.$checkReverse._selectAll(this, this.isselectAll)
    },
    click_tr (item, index) {
      let self = this
      self.selectedItems = []
      self.isselectAll = false
      self.files.forEach(function (element, index) {
        Vue.set(element, 'selected', false)
      })
      self.selectedItems.push(item)
      Vue.set(item, 'selected', true)
      self.$reused._selected(item, self, 'activeItem')
      self.isselectAll = false
      // self.$checkReverse._click_tr(self, self.isselectAll, self.files, item, 'activeItem')
    },
    click_checkbox (item, index) {
      let self = this
      if (item.selected) {
        Vue.set(item, 'selected', false)
        if (self.selectedItems.length) {
          self.selectedItems.forEach(function (element, index) {
            if (item.id === element.id) {
              self.selectedItems.splice(index, 1)
            }
          })
        }
        self.isselectAll = false
      } else {
        Vue.set(item, 'selected', true)
        self.selectedItems.push(item)
      }
      if (self.activeItem) {
        self.activeItem = null
      }
      self.isselectAll = self._isselected(self.files)
      // self.$checkReverse._click_checkbox(self.isselectAll, item, self.activeItem, self.files)
    },
    _isselected (arr) {
      return arr.every(function (item) {
        return item.selected
      })
    }
  }
}

</script>


<style lang='sass' scoped>
  $btn-bg: #3b8cff
  $btn-hover-bg: #4e97ff

  button.activeButn
    background: $btn-bg;
    border-color: $btn-bg;
    color: white;
    &:hover
      background: $btn-hover-bg;
      border-color: $btn-hover-bg;
      color: white;


  .table.table-hover.table-condensed > tbody > tr.active
    background-color: #f6faff;

  .content
    display: table;
    width: 100%;
    border: 1px solid #f2f6fd;
    >div 
      display: table-cell;
      vertical-align: top;
    .tree
      width: 300px;
    .material
      border: 1px solid #f2f6fd;

  .fade-enter-active, .fade-leave-active
    transition: opacity 0.3s

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ 
    opacity: 0

  .operate-menu
    display: inline-block;
    margin-left: 30px;
    span
      cursor: pointer;

  .file-name 
    display: inline-block;
    width: 60%;
</style>
