import { prisma } from "@/config";
import { Enrollment, Ticket, TicketStatus, TicketType } from "@prisma/client";
import { CreateTicketParams } from "@/protocols";

async function findAllTicket(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }>{
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: { TicketType: true }
    });
}

async function findTicketById(ticketId: number): Promise<Ticket & { Enrollment: Enrollment }> {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            Enrollment: true
        }
    });
}

async function  findTicketWithTypeById(ticketId:number):Promise<Ticket & { TicketType: TicketType }> {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            TicketType: true
        }
    });
}

async function createTicket(ticket: CreateTicketParams) :Promise<Ticket>{
    return prisma.ticket.create({
        data: ticket
    });
}

async function ticketProcessPayment(ticketId: number) :Promise<Ticket> {
    return prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: TicketStatus.PAID
        }
    })
}

const ticketsRepository = {
    findAllTicket,
    findTicketByEnrollmentId,
    findTicketById,
    findTicketWithTypeById,
    createTicket,
    ticketProcessPayment
}

export default ticketsRepository;