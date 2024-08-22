import { envs } from "./config/envs"
import { Server } from "./presentation/server"


(()=>{
    main()
})()


//Todo lo que es Express va en la capa de presentacion
function main(){
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })
    server.start()
}