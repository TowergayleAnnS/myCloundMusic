function handleCurrentLyric(arr,currentTime){
  let head = 0
  let tail = arr.length - 1
  while (head < tail) {
  // console.log("abc")
  let middle = Math.floor((head + tail) / 2)
  let num = arr[middle].time
  // console.log(num)
  if (currentTime > num) {
    head = middle + 1
  } else if (currentTime < num) {
    tail = middle - 1
  } else {
    // console.log(arr[head-1])
    return arr[head - 1]
  }
}
console.log(arr[head - 1])
return arr[head - 1]
}
export default handleCurrentLyric;
