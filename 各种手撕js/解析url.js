/**
 * @param  {string} url
 * 利用 URLUtils 简单解析 URL
 * @returns {protocol, username, password, hostname, port, pathname, search, hash}
 */
function URLParser(url) {
  const urlObj = new URL(url);
  return {
    protocol: urlObj.protocol,
    username: urlObj.username,
    password: urlObj.password,
    hostname: urlObj.hostname,
    port: urlObj.port,
    pathname: urlObj.pathname,
    search: urlObj.search,
    hash: urlObj.hash,
  }
}


function parseUrl(url) {
  var pattern = /^(?:([^:/?#]+)?:?)\/\/(?:([^:]*):?(.*)@)?(?:([^/?#:]*):?([0-9]+)?)?([^?#]*)(\/?(?:[^#]*))?(#(?:.*))?/;
  var matches = url.match(pattern) || [];
  return {
    protocol: matches[1],
    username: matches[2],
    password: matches[3],
    hostname: matches[4],
    port: matches[5],
    pathname: matches[6],
    search: matches[7],
    hash: matches[8]
  };
}
let s = parseUrl("http://juanni:miao@www.foo.com:8080/file/foo/bar/?test=3&miao=4#test#sss")
console.log(s);
// hash: "#test"
// hostname: "www.foo.com"
// password: "miao"
// pathname: "/file;foo=1;bar=2"
// port: "8080"
// protocol: "https:"
// search: "?test=3&miao=4"
// username: "juanni"


function parseQueryString(url) {
  let res = {};
  var arr = url.substr(url.indexOf('?') + 1).split('&');
  arr.forEach(item => {
    var tmp = item.split('=');
    json[tmp[0]] = tmp[1];
  });
  return res;
}

console.log("231".match(/(?:[^1]+)/));
