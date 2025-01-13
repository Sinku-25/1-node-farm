const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplet');
///// Server
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/templet-overview.html`,'utf-8');  
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/templet-card.html`,'utf-8');  
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/templet-product.html`,'utf-8');  
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');  // TODO: __dirname ==> . also we used readFileSync cus we need to real file once at the beggining of code and no mater if blocked other api cus its just execute once
const objData = JSON.parse(data); // transform data from strig json to object to res it to browser

const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true); // parse ==> make data in url  transform from string to object by put true to can access each product in product page by id saved in objData array
    // Overview
    if(pathname === '/' || pathname ==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardHtml = objData.map(el=>replaceTemplate(tempCard,el)).join('');
        output = tempOverview.replace(/{%PRODUCTCARD%}/g,cardHtml)
        res.end(output);
    }
    // Proeduct
    else if(pathname ==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        const product = objData[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }
    // Api
    else if(pathname==='/api'){
        res.writeHead(200,{
            'Content-type':'application/json'
        })
        res.end(data)
    }
    // Not Found
    else{
        res.writeHead(404,{
            'Content-type':'index/html'
        });
        res.end("<h1>Page Not Found</h1>");
    }
})

server.listen(8000,'localhost',()=>{
    console.log("Server is runnig...");
    
})