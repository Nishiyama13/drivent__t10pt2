import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";
import { CreateTicketParams } from "../../protocols";

async function findAllTicket(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: { TicketType: true }
    });
}

async function createTicket(ticket: CreateTicketParams) {
    return prisma.ticket.create({
        data: ticket
    });
}

const ticketsRepository = {
    findAllTicket,
    findTicketByEnrollmentId,
    createTicket

}
//    createTicket
export default ticketsRepository;