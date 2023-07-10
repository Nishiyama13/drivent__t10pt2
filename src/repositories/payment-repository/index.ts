import { prisma } from "@/config";
import { PaymentParams } from "@/protocols";
import { Payment } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number): Promise <Payment> {
    return prisma.payment.findFirst({
        where: { ticketId }
    });
}

async function createPayment(ticketId: number, params: PaymentParams): Promise<Payment> {
    return prisma.payment.create({
        data: {
            ticketId, 
            ...params
        }
    })
}

const paymentsRepository = {
    findPaymentByTicketId,
    createPayment
}

export default paymentsRepository;