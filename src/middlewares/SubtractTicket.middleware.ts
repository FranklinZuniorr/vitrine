import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../Services/_user/repository/User.repository";
import { IResponse } from "../interfaces/Interfaces";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../Services/_user/interfaces/IUser";

export class SubtractTicket {

    private userRepository: UserRepository;

    constructor(UserRepository: UserRepository){
        this.userRepository = UserRepository;
    }

    async subtract(req: Request, res: Response<IResponse<any>>, next: NextFunction, qty: number){
        const userId: string = req.params.userId;
        const existUser: IUser | boolean = await this.userRepository.findById(userId) as IUser;

        if(existUser.tickets < qty) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Você não possui tickets suficientes!"]});

        try {

            await this.userRepository.editTickets(userId, qty * -1);
            next();
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível finalizar essa operação!"]});   
        }
    }
}