// function lyirc(lyric) {

//   let arr = []
//   let reg1 = /(\[\d\d:\d\d\.\d{1,3}\])+(.*)/g

//   let res1 = null

//   console.log(reg1.exec(lyric))

//   while (res1 = reg1.exec(lyric)) {
//     let str = res1[0]
//     let content = res1[2]

//     let reg2 = /\[(\d\d):(\d\d\.\d{1,3})\]/g
//     let res2 = null
//     while (res2 = reg2.exec(str)) {
//       let m = res2[1] * 1
//       let s = res2[2] * 1
//       arr.push({
//         time: (m * 60 + s).toFixed(3) * 1,
//         content
//       })
//     }

//   }
//   console.log(arr)
//   arr.sort(function (e1, e2) {
//     if (e1.time > e2.time) {
//       return 1
//     } else if (e1.time < e2.time) {
//       return -1
//     } else {
//       return 0
//     }
//   })
//   console.log(arr)
  
//   return arr
  

// }

// module.exports = lyirc


// 把歌词字符串转化为数组
function lyric(txt) {
  // console.log(txt);
  let tempArray = [];

  //  正则表达式
  let reg = /\[(\d{2}):(\d{2}\.\d{1,3})\](.*)/g;
  let res = null;
  // 正则过滤
  while (!!(res = reg.exec(txt))) {
    // console.log(res);
    // 时间
    let time = res[1] * 60 + res[2] * 1;
    // 歌词内容
    let content = res[3];
    tempArray.push({ time, content });
  }
  return tempArray;
}

export default lyric;