<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="isopen" class='title'>
      <!-- @dblclick="changeType" -->
      {{ model.name }}
      <span @click.stop="add_file(model)" title="添加文件夹" class="f-16 p-l-5 p-r-5">+</span>
      <span @click.stop="edit_file(model)" title="编辑" class="f-16 p-l-5 p-r-5">-</span>
      <span @click.stop="del_file(model)" v-if="!isFolder" title="删除" class="f-16 p-l-5 p-r-5">x</span>
    </div>
    <ul v-show="treeOpen" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model">
      </item>
      <!-- <li class="add" @click="addChild">+</li> -->
    </ul>

      <directory-creat :model='addDir'></directory-creat>
  </li>
</template>
<script>
import Vue from 'vue'
import directoryCreat from './directoryCreat.vue'

export default {
  components: {
    directoryCreat
  },
  name: 'item', // 当递归调用时必须有这个name
  props: {
    model: Object
  },
  data () {
    return {
      treeOpen: true,
      addDir: null
    }
  },
  computed: {
    isFolder () {
      return this.model.children &&
      this.model.children.length
    }
  },
  methods: {
    isopen () {
      if (this.isFolder) {
        this.treeOpen = !this.treeOpen
      }
    },
    changeType () {
      // if (!this.isFolder) {
      Vue.set(this.model, 'children', [])
      this.addChild()
      this.treeOpen = true
      // }
    },
    addChild () {
      this.model.children.push({
        name: '新建文件夹'
      })
    },
    add_file (model) {
      console.log(model)
      this.addDir = this.model
      window.$('#directorycreat').modal('show')
    },
    del_file (model, index) {
      console.log(model.children)
      console.log(this.model)
    },
    edit_file () {
    }
  }
}
</script>
<style lang='sass' scoped> 
  .item
    cursor: pointer;

  .bold
    font-weight: bold;

  ul
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;


</style>
