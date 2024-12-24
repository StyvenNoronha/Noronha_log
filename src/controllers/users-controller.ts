import { Request, Response} from "express"
import z from "zod"
import {hash} from "bcrypt"
import {prisma} from "@/database/prisma "
import { AppError } from "@/utils/AppError"

export class UsersController{
    async create(request:Request, response:Response){
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string()
        })

        const {name, email, password} = bodySchema.parse(request.body)
        //verifica se existe email 
        const userWithSameEmail = await prisma.user.findFirst({where:{email}})
        if(userWithSameEmail){
            throw new AppError("Um usuário com o mesmo email já existe")
        }
        //Cria a criptografia da senha
        const hashPassword = await hash(password,8)

        //cria um novo usuário no banco de dados
        const user = await prisma.user.create({data:{name,email,password:hashPassword,}})

        //para nao deixar a senha aparecer
        const {password:_, ...userWithPassword} = user

        
        return response.json( userWithPassword)
    }
}