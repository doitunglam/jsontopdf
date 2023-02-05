const trimString = (str, maxLen) => {
    str = String(str)
    if (str.length <= maxLen) return str
    var tmpStr = str.substring(0, maxLen - 3)
    tmpStr = tmpStr + "..."
    return tmpStr
}

module.exports = { trimString }