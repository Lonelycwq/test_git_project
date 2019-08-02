const express = require('express');
const corss = express();

corss.listen(9090, () => {
  console.log('http://127.0.0.1:9090');
})

corss.use('/assets', express.static('assets'));
corss.use('/views', express.static('views'));

corss.get('/testcorss', (req, res) => {
  let fnName = req.query.fn;
  let jsonStr = JSON.stringify({
    name: '张胜男',
    gender: '女',
    age: 22
  });
  res.send(`${fnName}(${jsonStr})`);
  console.log(req.query.fn(jsonStr));
})