import express, { Router } from 'express'
import path from 'path'

interface Options{
    port: number
    router: Router
    public_path?: string
}

export class Server{
    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routs: Router

    constructor(options: Options){
        const {port, public_path = 'public', router} = options
        this.port = port
        this.publicPath = public_path
        this.routs = router
    }

    async start(){

        //Middleware:
        //Middleware: La línea this.app.use(express.static('public')) configura un middleware en Express. Este middleware sirve archivos estáticos (HTML, CSS, JavaScript, imágenes, etc.) 
        // Public Folder


        this.app.use(express.json())//raw
        this.app.use(express.urlencoded({extended: true})) // x-www-form-urlendecode
        this.app.use(express.static(this.publicPath))
        
        //Routers
        this.app.use(this.routs)

        this.app.get('*', (resq, resp) =>{
            const indexPath = path.join(__dirname + '../../../public/index.html')
            resp.sendFile(indexPath)
        })        
        
        this.app.listen(this.port, ()=>{
            console.log('Server running on por 3000')
        })
    }
}