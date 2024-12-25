import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"
import { string } from "zod"

interface TokenPayload{
    role: string
    sub: string
}

export function ensureAuthenticated(request:Request,response:Response, next:NextFunction){
    try {
      const authHeader = request.headers.authorization
      if(!authHeader){
        throw new AppError("Erro no JWT token", 401)
      } 
      //pegando o token 
      const [_,token ] = authHeader.split(" ")

      const {role, sub:user_id} = verify(token, authConfig.jwt.secret) as TokenPayload
      request.user = {
        id: user_id,
        role
      }
      return next()
    } catch (error) {
        console.log(error)
        throw new AppError("Token jwt invalido", 401)
        
    }
}

