import { Request, Response } from "express";
import { IResponse } from "../../interfaces/Interfaces";
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from "../_user/repository/User.repository";

const REDIRECT_URL = process.env.REDIRECT_URL_STRIPE;
const stripe = require('stripe')(process.env.API_KEY_STRIPE);

export class PaymentService {

    private userRepository: UserRepository;

    constructor(UserRepository: UserRepository){
        this.userRepository = UserRepository;
    }

    async stripeCheckout(req: Request, res: Response<IResponse<any>>){
        try {
            const userId: string = req.params.userId;
            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price: process.env.PROODUTCT_KEY_STRIPE,
                    quantity: 1,
                  },
                ],
                metadata: {
                    userId
                },
                mode: 'payment',
                success_url: `${REDIRECT_URL}?success=true`,
                cancel_url: `${REDIRECT_URL}?canceled=true`,
            });
            res.status(StatusCodes.OK).send({r: true, data: { url: session.url }});
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar o checkout."]});
        }
    }

    async confirmStrip(req: Request, res: Response<IResponse<any>>){
        try {
            const payload = req.body;
            const userId = payload.data.object.metadata.userId;
            const status = payload.data.object.status;

            if(status !== 'succeeded' || !userId) return res.status(StatusCodes.BAD_REQUEST).end();

            await this.userRepository.editTickets(userId, 10);

            res.status(200).end();
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar o checkout."]});
        }
    }
}