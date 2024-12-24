import { Request, Response} from "express"
import z from "zod"
import {hash} from "bcrypt"

export class UsersController{
    async create(request:Request, response:Response){
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string()
        })

        const {name, email, password} = bodySchema.parse(request.body)

        const hashPassword = await hash(password,8)
        return response.json({message: "usuário criado com sucesso", hashPassword})
    }
}