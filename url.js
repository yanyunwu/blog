let pattern = /^(?:([^:]+)?):\/\/(?:([^:?]+):?([0-9]+)?)(?:\?)?(.*)?/

console.log('http://www.baidu.com:99/aaaa?a=1&b=2'.match(pattern));