import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function findAllTicket(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: { TicketType: true }
    });
}
/*
async function createTicket(ticketData: Prisma.TicketCreateInput) {
    return prisma.ticket.create({
        data: ticketData
    })
}
*/
const ticketsRepository = {
    findAllTicket,
    findTicketByEnrollmentId

}
//    createTicket
export default ticketsRepository;