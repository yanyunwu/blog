

let str: string = 'rwerwer'
let newStr = str.replace(/e(.)w/g, (match, ...args) => {
  console.log(args)
  return '1'
})
console.log(newStr)