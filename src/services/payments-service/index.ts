import { Payment } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/payment-repository";
import { PaymentCardParams, PaymentParams } from "@/protocols";


async function verify(ticketId: number, userId: number): Promise<void> {
    const ticket = await ticketsRepository.findTicketById(ticketId);
    if(!ticket) throw notFoundError();

    const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId)
    if(!enrollment) throw notFoundError();
    if(enrollment.userId !== userId) throw unauthorizedError();
}


async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment>{
    await verify(ticketId, userId);

    const payment = await paymentsRepository.findPaymentByTicketId(ticketId);
    if(!payment) throw notFoundError();

    return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: PaymentCardParams ): Promise<Payment>{
    await verify(ticketId, userId);

    const ticket = await ticketsRepository.findTicketWithTypeById(ticketId);

    const paymentData: PaymentParams = {
        ticketId,
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
    }

    const payment = await paymentsRepository.createPayment(ticketId, paymentData)

    await ticketsRepository.ticketProcessPayment(ticketId)

    return payment
}

const paymentsService = {
    getPaymentByTicketId,
    paymentProcess
}

export default paymentsService;