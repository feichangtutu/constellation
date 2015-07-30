/**
 * Created by jyn on 15/7/11.
 *
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var path = require('path');
var formidable = require('formidable');
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    req.method = urlObj.query.__method__;
    console.log(req.method+'aaa');
    if(pathname =='/'){
        fs.createReadStream('./test.html').pipe(res);
    }else if(pathname =='/post'){
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            if(err){
                res.writeHead(500);
                res.end(err.toString());
            }
            else{
                res.writeHead(200);
                var result = util.inspect(fields)
                console.log(result);
                res.end(result);
                fs.writeFile('./result.txt',new Buffer(result),{encoding:'utf8'},function(err){
                    console.log('write over')
                })
                fs.appendFile('./test.txt',result,{encoding:'utf8'},function(err){
                    console.log('write over')
                })
            }
        });
    }
}).listen(8080);