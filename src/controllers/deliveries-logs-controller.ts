import {Request,Response} from 'express'
import z from 'zod'
import {prisma} from "@/database/prisma "
import { AppError } from '@/utils/AppError'

export class DeliveriesLogsController{
    async create(request:Request, response:Response){
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const {delivery_id, description} = bodySchema.parse(request.body)


       

        const delivery = await prisma.delivery.findUnique({
            where:{id: delivery_id}
        })

        if(!delivery){
            throw new AppError("entrega não encontrada")
        }

        if(delivery?.status === "delivered"){
            throw new AppError("Seu pedido já foi entregue")
        }

        if(delivery.status === "processing"){
            throw new AppError("alterar o status para enviado")
        }


        await prisma.deliveryLog.create({
            data:{
                deliveryId: delivery_id,
                description
            }
        })



        return response.status(201).json()
    }
    async show(request:Request, response:Response){
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),

        })

        const {delivery_id} = paramsSchema.parse(request.params)
        const delivery = await prisma.delivery.findUnique({
            where:{id:delivery_id},
            include:{
                logs:true,
                user:true,
            }
        })



        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("o usuário só pode visualizar suas entregas",401)
        }

        return response.json(delivery)
    }
}