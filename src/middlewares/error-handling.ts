import {Request, Response, NextFunction} from "express"
import { AppError } from "@/utils/AppError"


export function errorHandling(error:any,request:Request,response:Response, next:NextFunction){

    //errors internos
    if(error instanceof AppError){
        return response.status(error.statusCode).json({message: error.message})
    }
    //errors do próprio servidor
    return response.status(500).json({message: error.message})
}