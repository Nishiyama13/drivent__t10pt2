import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares'; 
import { createTicketSchema } from "../schemas/tickets-schemas"; 
import { createTicket, getAllTicketsTypes, getUserTickets } from "@/controllers";  

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types',getAllTicketsTypes)
    .get('/', getUserTickets)
    .post('/', validateBody(createTicketSchema), createTicket)

export { ticketsRouter };
  