const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
var buff, buff2;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
};

const server = http.createServer((request, response) => {
    if (request.method == 'POST') {
      var body = ''
      const { parse } = require('querystring');
      request.on('data', function(data) {
        body += data
      })
      var image;
      request.on('end', () => {
        image = JSON.parse(body).image;     
        if(image != undefined){ 
          buff = Buffer.from(image, 'base64');         
          const fs = require('fs');
          // fs.writeFile("./tests/images/1.jpg", buff, function (){renderAll(response, "1.jpg", headers)});              
          const {renderAll} = require("./tests/test.nude.js");
          renderAll(response, buff, headers);                  
        }        
      });
    }
    if (request.method == 'GET') {
      let urlRequest = url.parse(request.url, true);   
      if(urlRequest.query.url != undefined){
        buff = undefined;       
        var my_src = encodeURI("http://" + urlRequest.query.url);
        const request = require('request').defaults({ encoding: null });
        request(decodeURI(my_src), function(error, response2, body2) {
          if(!error){
            buff = Buffer.from(body2, 'base64');
          }          
          const fs = require('fs');
          const {renderAll} = require("./tests/test.nude.js");
          renderAll(response, buff, headers);                  
        });
      }               
    }
});

server.listen(port, hostname, () => {

});



//node C:\Users\Administrator\Documents\servrend\scripts\app.js