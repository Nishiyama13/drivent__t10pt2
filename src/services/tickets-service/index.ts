import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "../../errors";
import { Ticket, TicketType } from "@prisma/client";
import enrollmentRepository from "../../repositories/enrollment-repository";

async function getTickets(): Promise<TicketType[]>{
    const tickets = await ticketsRepository.findAllTicket();
    if(!tickets) throw notFoundError()
    return tickets;
}

async function getTicketByUserId(userId: number): Promise<Ticket> {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket) throw notFoundError();

    return ticket
}
/*
async function createOrUpdateTickets(ticketTypeId: number){
  
}
*/

//export type CreateTicketParams = Pick<Ticket, "ticketTypeId">


const ticketService = {
    getTickets,
    getTicketByUserId,
};
  
export default ticketService;