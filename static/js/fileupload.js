import events from 'events'
import axios from 'axios'

class fileUploader extends events.EventEmitter {
  constructor () {
    super()

    this.preTimeStamp = 0
    this.preUploaded = 0
  }

	upload (files) {
    for (let i = 0; i < files.length; i++) {
      this.uploadOne(files[i], i)
    }
  }

  uploadOne (file, index=0) {
    let self = this
    let data = new FormData()
    data.append('fileBatchUpload', file)

    axios.post('element', data, {
      onUploadProgress: progressEvent => {
        // 对原生进度事件的处理
        let progress = (progressEvent.loaded / progressEvent.total * 100).toFixed(1) + '%'
        let loaded = progressEvent.loaded
        let timeStamp = progressEvent.timeStamp
        let uploadSpeed

        // 上传进度
        self.emit('progress', progress, index, file)

        // 上传速度
        uploadSpeed = (loaded - self.preUploaded) / ((timeStamp - self.preTimeStamp) / 1000)
        if (uploadSpeed / (1024 * 1024) >= 1) {
          uploadSpeed = (uploadSpeed / (1024 * 1024)).toFixed(2) + 'M/s'
        } else {
          uploadSpeed = (uploadSpeed / 1024).toFixed(2) + 'KB/s'
        }

        self.emit('uploadSpeed', uploadSpeed, index, file)

        self.preTimeStamp = progressEvent.timeStamp
        self.preUploaded = loaded

      }
    }).then(res => {
      console.log(res)
      self.emit('fileuploaded', res.data, index, file)
    }, err => {
      console.log(err)
    })
  }
}

export default fileUploader

