const http = require('http');
const util = require('util');
const fs = require('fs');
const path = require('path');
const reg = /\/echarts\//g;

const server = new http.Server();

server.on('request', (res, req) => {
    router(res, req);
})

function router(res, req) {
    if (res.url == '/') {
        hello(res, req, res.url);
    } 
    if(reg.test(res.url)) {
        reg.lastIndex = 0;
        echarts(res, req, res.url);
    }
}

// echarts静态
function echarts(res, req, urls) {
    try {
        const url = path.join(__dirname, '/www', urls);
        fs.readFile(url, (err, data) => {
            req.writeHead(200);
            req.end(data)
        });
    } catch(err) {
        console.error(err);
        req.end('系统错误')
    }
}

// 主页
function hello(res, req, urls) {
    req.writeHead(200, {'Content-Type': 'text/plan;charset=UTF-8'});
    req.end('请输入 http://localhost:3000/echarts/index.html')
}


server.listen(3000)