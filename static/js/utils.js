 'use strict' 

const utils = {
	formatFileSize: (fileSize, idx = 0) => {
    const units = ["B", "KB", "MB", "GB"]
    if (fileSize < 1024 || idx === units.length - 1) {
      return fileSize.toFixed(1) + units[idx]
    }
    return utils.formatFileSize(fileSize / 1024, ++idx)
  } 
}

export default utils
