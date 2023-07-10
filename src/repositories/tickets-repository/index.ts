import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function findAllTicket(): Promise<TicketType[]> {
    return await prisma.ticketType.findMany();
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

}
//    createTicket
export default ticketsRepository;