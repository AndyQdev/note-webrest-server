import express from 'express'
import path from 'path'

interface Options{
    port: number
    public_path?: string
}

export class Server{
    private app = express()
    private readonly port: number
    private readonly publicPath: string

    constructor(options: Options){
        const {port, public_path = 'public'} = options
        this.port = port
        this.publicPath = public_path
    }

    async start(){

        //Middleware:
        //Middleware: La línea this.app.use(express.static('public')) configura un middleware en Express. Este middleware sirve archivos estáticos (HTML, CSS, JavaScript, imágenes, etc.) 
        // Public Folder


        this.app.use(express.static(this.publicPath))
        
        this.app.get('*', (resq, resp) =>{
            const indexPath = path.join(__dirname + '../../../public/index.html')
            resp.sendFile(indexPath)
        })        
        
        this.app.listen(this.port, ()=>{
            console.log('Server running on por 3000')
        })
    }
}