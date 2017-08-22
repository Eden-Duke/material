import SparkMD5 from './MD5/spark-md5.min.js'

var md5 = function (file) {
  return new Promise((resolve, reject) => {
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    var pps = [
      {
        start: 0,
        end: 2012
      },
      {
        start: file.size/2 - 1999,
        end: file.size/2
      },
      {
        start: file.size - 2010,
        end: file.size
      }
    ],
    currendpps = 0,
    sp = new SparkMD5.ArrayBuffer()

    var fileReader = new FileReader()
    fileReader.onload = function (e) {
      sp.append(e.target.result)
      currendpps++
      if (currendpps === pps.length) {
        var ret = sp.end()
        return resolve(ret)
      } else {
        loadNext()
      }
    }

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.')
    }

    function loadNext () {
      var p = pps[currendpps]
      fileReader.readAsArrayBuffer(blobSlice.call(file, p.start, p.end))
    }

    loadNext()
  })
}

export default md5
