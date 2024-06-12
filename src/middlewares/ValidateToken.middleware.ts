import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../Services/_user/repository/User.repository";
import { IResponse, IToken } from "../interfaces/Interfaces";
import { validateToken } from "../utils/Utils";
import { StatusCodes } from "http-status-codes";
import { EUser, IUser } from "../Services/_user/interfaces/IUser";

export class ValidateToken {

    private userRepository: UserRepository;

    constructor(UserRepository: UserRepository){
        this.userRepository = UserRepository;
    }

    async verify(req: Request, res: Response<IResponse<any>>, next: NextFunction){
        const token: string = req.headers['authorization'] ?? '';
        const isValidToken: boolean | IToken = validateToken(token);

        if(!isValidToken) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Token inválido"]});

        const userId = (isValidToken as IToken).id;

        const existUser: IUser | boolean = await this.userRepository.findById(userId) as IUser;

        if(!existUser) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Usuário não existe!"]});
        if(existUser.validToken !== token) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Token inválido!"]});
        const { validToken, validateRefreshToken, forgetPasswordKey, password, ...restUser } = existUser;
        req.params.userId = userId;
        req.body.user = restUser;
        next();
    }
}