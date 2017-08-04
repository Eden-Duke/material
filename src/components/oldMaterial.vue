<template>
  <div id="one">
    <button class="btn btn-default btn-sm"  aria-label="Left Align">
      <span class="fa fa-upload" aria-hidden="true"></span>
      上传
    </button>
    <button class="btn btn-default btn-sm"  aria-label="Left Align">
      <i class="fa fa-plus-square" aria-hidden="true"></i>
      新建文件夹
    </button>

    <div class="btn-group" role="group"  aria-label="buttonGroup">
      <button class="btn btn-default btn-sm"  aria-label="Left Align">
        <i class="fa fa-download" aria-hidden="true"></i>
        下载
      </button>
     <!--  <button class="btn btn-default btn-sm"  aria-label="Left Align">
        <i class="fa fa-remove" aria-hidden="true"></i>
        删除
      </button> -->
      <!-- <button class="btn btn-default btn-sm">重命名</button> -->
      <!-- <button class="btn btn-default btn-sm">移动到</button> -->
    </div>
    <!-- <div class="float clearfix"> -->
    <div class="content m-t-30">
      <div class="tree">
        <ul id="demo">
          <item
            class="item"
            :model="treeData">
          </item>
        </ul>
      </div>
      <div class="p-10 material">
       <!--  <table class="table table-hover table-responsive table-condensed">
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
              <th>大小</th>
              <th>修改日期</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{active: file.selected}" v-for="(file, index) in filesTr" 
                @click="click_tr(file, index)">
              <td>
                <span class="span-select">
                  <i :class="file.selected ? 'fa fa-check-square' : 'fa fa-square-o'"
                     @click.stop='click_checkbox(file, index)'></i>
                </span>
                <span class="folder">
                  <i v-if='!file.type' class="fa fa-folder"></i>
                  <i v-if="file.type && file.type === 'video'"class="fa fa-file-video-o"></i>
                  <i v-if="file.type && file.type === 'audio'"class="fa fa-file-audio-o"></i>
                  <i v-if="file.type && file.type === 'image'"class="fa fa-file-image-o"></i>
                </span>
                <span class="file-name" @click.stop="click_name(file, index)">
                  {{ file.name }}
                </span>
              </td>
              <td>{{ file.size }}</td>
              <td>{{ file.create_at }}</td>
            </tr>
          </tbody>
        </table> -->
        <div v-for="file in filesTr">
          <div><p class="f-18" @click="file.type = !file.type ">{{ file.name }}</p></div>
          <transition name="fade">
            <div v-if='file.type'>
              <div v-for="material in file.content">
                {{ material.name }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import Item from './materialFolder.vue'

export default {
  components: {
    'item': Item
  },
  data () {
    return {
      files: [],
      filesTr: [
        {
          type: 'video',
          name: '视频',
          content: [
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'}
          ]
        },
        {
          type: 'image',
          name: '图片',
          content: [
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'}
          ]
        },
        {
          type: 'audio',
          name: '音乐',
          content: [
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'},
            {name: '这里是content，你知道么，这里是content，你知道么'}
          ]
        }
      ],
      isselectAll: false,
      activeItem: null,
      treeData: {
        'name': '所有素材',
        'children': []
      },
      fileContent: null,
      video: true,
      image: true,
      audio: true
    }
  },
  watch: {
    '$route': 'ajaxData'
  },
  beforeMount () {
    this._getMaterialQuery()
  },
  mounted () {
    this._getMaterial()
    let self = this
    window.axios.get('web/directory').then(res => {
      self.treeData.children = res.data
    })
  },
  methods: {
    ajaxData () {
      this._getMaterialQuery()
      this._getMaterial()
    },
    _getMaterial () {
      let self = this
      if (!self.$route.query.id) {
        window.axios.get('/web/directory').then(res => {
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
    goback () {
      this.$router.go(-1)
    },
    click_name (item, index) {
      this.$router.push({query: { id: item.id }})
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
      self.isselectAll = !self.isselectAll
      // this.$checkReverse._selectAll(this, this.isselectAll)
    },
    click_tr (item, index) {
      let self = this
      self.isselectAll = false
      self.files.forEach(function (element, index) {
        Vue.set(element, 'selected', false)
      })
      Vue.set(item, 'selected', true)
      this.$reused._selected(item, self, 'activeItem')
      this.isselectAll = false
      // this.$checkReverse._click_tr(this, this.isselectAll, this.files, item, 'activeItem')
    },
    click_checkbox (item, index) {
      if (item.selected) {
        Vue.set(item, 'selected', false)
        this.isselectAll = false
        if (this.activeItem) {
          this.activeItem = null
        }
      } else {
        Vue.set(item, 'selected', true)
      }
      this.isselectAll = this._isselected(this.files)
      // this.$checkReverse._click_checkbox(this.isselectAll, item, this.activeItem, this.files)
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
  .table.table-hover.table-condensed > tbody > tr.active
    background-color: #f6faff;

  .content
    display: table;
    width: 100%;
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

</style>
