import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { CreateTicketParams } from "@/protocols";

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

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket>{
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticketData: CreateTicketParams = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    }

    await ticketsRepository.createTicket(ticketData);
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    
    return ticket;  
}



const ticketService = {
    getTickets,
    getTicketByUserId,
    createTicket
};
  
export default ticketService;