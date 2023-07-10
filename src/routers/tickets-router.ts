import { Router } from "express";
import { authenticateToken } from '@/middlewares';  //validateBody
//import { createTicketsSchema } from "../schemas/tickets-schemas"; //não feito
import { getAllTicketsTypes, getUserTickets } from "@/controllers";  

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types',getAllTicketsTypes)
    .get('/', getUserTickets)

export { ticketsRouter };

//    .post('/', validateBody(createTicketsSchema), createTicket); 