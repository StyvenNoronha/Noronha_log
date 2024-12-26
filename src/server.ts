import { app } from "@/app";
import {env} from "./env"
const PORT = env.PORT

app.listen(PORT, ()=>console.log(`Servidor esta rodando na porta ${PORT}`))