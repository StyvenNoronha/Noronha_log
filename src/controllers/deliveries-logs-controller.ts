import {Request,Response} from 'express'

export class DeliveriesLogsController{
    async create(request:Request, response:Response){
        return response.json({message:"ok"})
    }
}