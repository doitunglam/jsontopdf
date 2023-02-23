const trimString = (str, maxLen) => {
    str = String(str)
    if (str.length <= maxLen) return str
    var tmpStr = str.substring(0, maxLen - 3)
    tmpStr = tmpStr + "..."
    return tmpStr
}

const splitArray = (arr, chunkSize) => {
    const ANS_ARR = []
    const ARRAY_LENGTH = arr.length
    const CHUNK_COUNT = Math.ceil(ARRAY_LENGTH / chunkSize)
    for (var i = 1; i <= CHUNK_COUNT; i++)
        ANS_ARR.push(arr.slice((i - 1) * chunkSize, i * chunkSize))
    return ANS_ARR
}

module.exports = { trimString , splitArray }