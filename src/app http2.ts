import fs  from 'fs'
import http2 from 'http2'

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),  
},(request, response)=>{

    console.log(request.url)
    
    // response.writeHead(200, {'Content=Type': 'application/json'})
    // response.write(`<h1>URL ${ request.url }</h1>`)
    // response.end()
    // const data = {name : 'John Doe', age: 30, city: 'New York'}
    // response.writeHead(200, {'Content-Type': 'application/json'})
    // response.end(JSON.stringify(data))

    if( request.url === '/' ){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        response.writeHead(200, { 'ContentType': 'text/html' })
        response.end( htmlFile )
        return;
    }

    if(request.url?.endsWith('.js')){
        response.writeHead(200, {'ContentType': 'text/javascript'})
    }else if (request.url?.endsWith('.css')){
        response.writeHead(200, {'ContentType': 'text/css'})
    }

    const responseContent = fs.readFileSync(`./public${request.url}`, 'utf-8')
    response.end(responseContent)
})

server.listen(8080, ()=>{
    console.log('Server running on port 8000')
})