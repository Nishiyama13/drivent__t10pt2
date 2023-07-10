import Joi from "joi";
import { TicketInput } from "@/protocols";

export const createTicketSchema = Joi.object<TicketInput>({
    ticketTypeId: Joi.number().required()
})
