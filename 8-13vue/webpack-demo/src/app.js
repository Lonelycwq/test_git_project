//引入getsum方法
let getsum = require('./getsum');
//import getsum from './getsum';
//引入css文件
require('../styles/test.css');
require('../styles/test1.less');
// import '../styles/test.css';
// import '../styles/test1.less';
//调用方法
let num = getsum(220, 20);
//输出结果
document.write(num);