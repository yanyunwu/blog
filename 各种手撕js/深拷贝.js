



function deepKb(obj, map = new Map()) {
  let newObj = null;
  if (typeof obj === "object" && obj !== null) {
    if (map.get(obj)) {
      newObj = map.get(obj)
    } else {
      newObj = obj instanceof Array ? [] : {}
      map.set(obj, newObj)
      for (let i in obj) {
        newObj[i] = deepKb(obj[i], map)
      }
    }
  } else {
    newObj = obj
  }

  return newObj

}

let obj = {
  a: {
    b: {
      c: 1
    }
  }
}

obj.c = obj

console.log(deepKb(1));
console.log(deepKb(obj));