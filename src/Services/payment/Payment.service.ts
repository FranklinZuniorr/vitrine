import { Request, Response } from "express";
import { IResponse } from "../../interfaces/Interfaces";
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from "../_user/repository/User.repository";

const YOUR_DOMAIN = 'http://localhost:3000';
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
                success_url: `${YOUR_DOMAIN}?success=true`,
                cancel_url: `${YOUR_DOMAIN}?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar o checkout."]});
        }
    }

    async confirmStrip(req: Request, res: Response<IResponse<any>>){
        try {
            const payload = req.body;
            const userId = payload.data.object.metadata.userId;
            const status = payload.data.object.status;

            if(!status || status && status !== 'succeeded') return res.status(StatusCodes.BAD_REQUEST).end();

            await this.userRepository.editTickets(userId, 10);

            res.status(200).end();
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar o checkout."]});
        }
    }
}