import { Router } from "express";
import { authenticateToken } from '@/middlewares';  //validateBody
//import { createTicketsSchema } from "../schemas/tickets-schemas"; //não feito
import { getAllTicketsTypes } from "@/controllers";  

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types',getAllTicketsTypes)

export { ticketsRouter };

//    .post('/types', validateBody(createTicketsSchema), createTicket); 