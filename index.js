const fs = require('fs');
const http = require('http');
const url = require('url');
///// Server

function replaceTemplate(temp,product){
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMGE%}/g,product.image);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%ID%}/g,product.id);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/templet-overview.html`,'utf-8');  
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/templet-card.html`,'utf-8');  
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/templet-product.html`,'utf-8');  
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');  // TODO: __dirname ==> . also we used readFileSync cus we need to real file once at the beggining of code and no mater if blocked other api cus its just execute once
const objData = JSON.parse(data); // transform data from strig json to object to res it to browser

const server = http.createServer((req,res)=>{
    const pathName = req.url;

    // Overview
    if(pathName === '/' || pathName ==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardHtml = objData.map(el=>replaceTemplate(tempCard,el)).join('');
        console.log(cardHtml);
        
        output = tempOverview.replace(/{%PRODUCTCARD%}/g,cardHtml)
        res.end(output);
    }
    // Proeduct
    else if(pathName ==='/product'){
        res.end('This is the Product');
    }
    // Api
    else if(pathName==='/api'){
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