var debug = false;
var debugURL = "http://pascal:8000/api/kanshi/sample";
var productionURL = "https://alantian.net/api/kanshi/sample";

var Config = {
  url: debug? debugURL : productionURL
};

export default Config;
