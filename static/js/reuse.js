import Vue from 'vue'
import axios from 'axios'
/**
 * 统一拦截响应错误提示
 */
axios.interceptors.response.use(function (response) { // 这里的config包含每次响应的内容
  return response;
}, function (error) {
  console.log(error.response);
  if (error.response.status === 401) {
    window.location.href = 'login';
    window.swal('系统提示！', "请先登录！", 'error');
  } else {
    if ( typeof error.response.data === 'string') {
      window.swal('操作失败！', error.response.status + '\n' + error.response.data, 'error');
    } 
    let errorData = error.response.data;
    if (Object.prototype.toString.call(errorData) === '[object Object]') {
      for ( let key in errorData) {
        if (errorData[key] instanceof Array ) {
          window.swal('操作失败！', error.response.status + '\n' + errorData[key][0], 'error');
        }
      }
    }
  }
  return Promise.reject(error);
});
/* 复用 */
const reused = {
  del (url, func_success) {
    window.swal({
      title: '是否确认删除?',
      text: '删除后将无法恢复！',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(function () {
      axios.delete(url)
      .then(func_success);
    });
  },
  _alertSuccess () {
    window.swal({
      title: '操作成功!',
      text: '2秒后自动关闭！',
      timer: 2000,
      showConfirmButton: false,
      type: 'success'
    });
  },
  _search (allDatas, keysArray, searchKey) {
    let data = allDatas;
    data = data.filter(function (row) {
      return keysArray.some(function (key) {
        return String(row[key]).indexOf(searchKey) > -1;
      });
    });
    return data;
  },
  // self: this
  _selected (item, self, activeItem) {
    if (self[activeItem]) {
      Vue.set(self[activeItem], 'selected', false);
    }
    self[activeItem] = item;
    Vue.set(self[activeItem], 'selected', true);
  },
   _copy (source, target) {
    for (let key in source) {
      if (target.append && typeof (target.append) === 'function') {
        target.append(key, source[key]);
      } else {
        target[key] = source[key];
      }
    }
  },
  _totalpage (self) {
      if (self.totalDataP.last_page <= 10) {
        self.totalPage = self.totalDataP.last_page;
      } else {
        if ((self.totalDataP.current_page - 1) < 5) {
          self.totalPage = [1, 2, 3, 4, 5, 6, 'more', self.totalDataP.last_page];
        }
        if ((self.totalDataP.last_page - self.totalDataP.current_page) < 5 ) {
          self.totalPage = 
          [1, 'more', self.totalDataP.last_page - 5, self.totalDataP.last_page - 4, self.totalDataP.last_page - 3, self.totalDataP.last_page - 2, self.totalDataP.last_page - 1, self.totalDataP.last_page];
        }
    if (((self.totalDataP.current_page - 1) >= 5) && ((self.totalDataP.last_page - self.totalDataP.current_page) >= 5)) {
      self.totalPage = 
      [1, 'more', self.totalDataP.current_page - 2, self.totalDataP.current_page - 1, self.totalDataP.current_page, self.totalDataP.current_page + 1, self.totalDataP.current_page + 2, 'more', self.totalDataP.last_page];
    }
      }
  },
  _judgePage (self, item) {
    if (item === 'next') {
      if (self.totalDataP.current_page === self.totalDataP.last_page) {
        return false;
      }
      self.totalDataP.current_page++;
    }
    if (item === 'prev') {
      if (self.totalDataP.current_page === 1) {
        return false;
      }
      self.totalDataP.current_page--;
    }
    if (!isNaN(item)) {
      self.totalDataP.current_page = item;
    }
    if (!self.totalDataP.current_page) {
      self.totalDataP.current_page = 1;
    }
  },
  GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        r = window.location.search.substr(1).match(reg),  //获取url中"?"符后的字符串并正则匹配
        context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  }
};
/**
 需要初始化的参数如下：
  isselectAll: boonlean
  alldatas
  activeItem
**/
const checkReverse = {
  _selectAll (self, isselectAll) {
    self.files.forEach(function (element, index) {
      if (isselectAll) {
        Vue.set(element, 'selected', false)
      } else {
        Vue.set(element, 'selected', true)
      }
    })
    self.isselectAll = !self.isselectAll
  },
  _click_tr (self, isselectAll, alldatas, item, activeItem) {
    isselectAll = false
    alldatas.forEach(function (element, index) {
      Vue.set(element, 'selected', false)
    })
    Vue.set(item, 'selected', true)
    self.$reused._selected(item, self, activeItem)
  },
  _click_checkbox (isselectAll, item, activeItemObj, alldatas) {
    if (item.selected) {
      Vue.set(item, 'selected', false)
      isselectAll = false
      if (activeItemObj) {
        activeItemObj = null
      }
    } else {
      Vue.set(item, 'selected', true)
    }
    isselectAll = this._isselected(alldatas)
  },
  _isselected (arr) {
    return arr.every(function (item) {
      return item.selected
    })
  }
};

Vue.prototype.$reused = reused;
Vue.prototype.$checkReverse = checkReverse;

/* 模态框点击空白处和键盘esc禁止关闭 */
// window.$('#add-edit-music').modal({backdrop: 'static', keyboard: false, });
