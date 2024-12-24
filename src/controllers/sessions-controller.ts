import {Request, Response} from "express"
import {prisma} from "@/database/prisma "
import { AppError } from "@/utils/AppError"
import z from "zod"
import { compare } from "bcrypt"

export class SessionsController{
    async create(request:Request,response:Response){
            const bodySchema = z.object({
                email: z.string().email(),
                password: z.string().min(3)
            })
            const { email, password} = bodySchema.parse(request.body)
            const user = await prisma.user.findFirst({
                where:{email},
            })
            //verifica se existe usuário   
            if(!user){
                throw new AppError("Email ou senha invalido", 401)
            }
            
            const passwordMatched = await compare(password, user.password)
            if(!passwordMatched){
                throw new AppError("Email ou senha invalido", 401)
            }
            return response.json({message:"ok"})
    }
}