
// for (let i = 0; i < 5; i++) {
//   setTimeout(console.log, 1000 * i, i)
// }

function fun(i) {
  setTimeout(() => {
    console.log(i);
    i++
    if (i < 5) {
      fun(i)
    }
  }, 1000)
}

fun(0)