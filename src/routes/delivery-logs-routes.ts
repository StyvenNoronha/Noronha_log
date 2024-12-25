import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { Router } from "express";


const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveriesLogsController()

deliveryLogsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(['sale']),deliveryLogsController.create)
deliveryLogsRoutes.get("/:delivery_id/show",ensureAuthenticated, verifyUserAuthorization(['sale',"customer"]),deliveryLogsController.show)


export{ deliveryLogsRoutes}