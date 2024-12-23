import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/AppError"
import { ZodError } from "zod"



export function errorHandling(error:any,request:Request,response:Response, next:NextFunction){

    //errors internos
    if(error instanceof AppError){
        return response.status(error.statusCode).json({message: error.message})
    }
    //errors do próprio servidor
    return response.status(500).json({message: error.message})

    //error do zod
    if(error instanceof ZodError){
        return response.status(400).json({
            message: "errors de validação",
            issues: error.format(),
        })
    }
}