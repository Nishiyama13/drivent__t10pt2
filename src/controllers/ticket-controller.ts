import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "../services/tickets-service";


export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response, next: NextFunction ): Promise<Response> {
    try {
        const ticketTypes = await ticketService.getTickets();
        return res.status(httpStatus.OK).send(ticketTypes);
    } catch (error) {
        next(error)
    }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response>{
    const { userId } = req;

    try{
        const ticket = await ticketService.getTicketByUserId(userId)
        return res.status(httpStatus.OK).send(ticket)

    } catch (error) {
        next(error)
    }
}
/*
export async function createTicket(req: AuthenticatedRequest, res:Response){


}
*/