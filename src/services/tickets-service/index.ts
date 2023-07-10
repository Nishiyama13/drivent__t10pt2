import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "../../errors";
import { TicketType } from "@prisma/client";

async function getTickets(): Promise<TicketType[]>{
    const tickets = await ticketsRepository.findAllTicket();
    if(!tickets) throw notFoundError()
    return tickets;
}

/*
async function createOrUpdateTickets(ticketTypeId: number){
  
}
*/

//export type CreateTicketParams = Pick<Ticket, "ticketTypeId">


const ticketService = {
    getTickets,
};
  
export default ticketService;