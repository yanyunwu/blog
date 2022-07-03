
class VNode {
  static ELEMENT = 0
  static TEXT_NODE = 1
  static COMPONENT = 2
}

class PropValue {
  constructor(realValue) {
    this.realValue = realValue
    this.dep = []
  }

  setDep(watcher) {
    this.dep.push(watcher)
  }

  valueOf() {
    return this.realValue
  }

  toString() {
    return this.realValue
  }

  notify() {
    this.dep.forEach(watcher => {
      watcher.update()
    })
  }

}

class Watcher {
  constructor(fn) {
    this.fn = fn
  }

  update() {
    this.fn()
  }
}

class Component {
  static nativeEvent = {
    'onclick': 'click'
  }
  static temp = []
  constructor(config) {
    let mount = config.mount
    mount && (this.ele = document.querySelector(mount))
    this.config = config
    // 响应式数据临时储存
    this.valueMap = new WeakMap();
    // 设置响应式数据对象
    this.setProxy()
    // 开始渲染
    this.rendering()
  }

  setProxy() {
    let that = this;
    this.data = new Proxy(this.config.data, {
      get(target, prop, receiver) {
        let valueTarget = that.valueMap.get(target)
        if (!(valueTarget && valueTarget[prop])) {
          if (!valueTarget) that.valueMap.set(target, {})
          that.valueMap.get(target)[prop] = new PropValue(target[prop])
        }
        let res = that.valueMap.get(target)[prop]
        for (let depArr of Component.temp) {
          if (!depArr.includes(res)) {
            depArr.push(res)
          }
        }
        return res
      },
      set(target, prop, value, receiver) {
        let propValue = that.valueMap.get(target)[prop]
        propValue.realValue = value
        propValue.notify()
        return Reflect.set(target, prop, value, receiver)
      }
    })
  }

  rendering() {
    let vnode = this.render();
    if (!vnode) return;
    // 递归调用渲染
    let recursive = (vnode) => {
      let type = vnode.type

      if (type === VNode.ELEMENT) {
        let tag = vnode.tag
        let onClickEvent = vnode.onClick
        let ele = document.createElement(tag)
        ele.addEventListener('click', onClickEvent)
        for (let child of vnode.childNodes) {
          ele.appendChild(recursive(child))
        }
        return ele
      }

      if (type === VNode.TEXT_NODE) {
        let vnodeValue = vnode.value;
        let depPropValue = []
        if (typeof vnode.value === "function") {
          Component.temp.push(depPropValue)
          vnodeValue = vnode.value()
          let index = Component.temp.indexOf(depPropValue)
          Component.temp.splice(index, 1)
        }
        let textNode = document.createTextNode(vnodeValue)
        if (typeof vnode.value === "function") {
          for (let watcher of depPropValue) {
            let fn = function () {
              textNode.nodeValue = vnode.value()
            }
            watcher.setDep(new Watcher(fn))
          }
        }
        return textNode;
      }

      if (type === VNode.COMPONENT) {
        return vnode.component.rendering()
      }
    }




    let rootNode = recursive(vnode)
    if (this.config.mount) this.ele.appendChild(rootNode)
    return rootNode
  }

}

