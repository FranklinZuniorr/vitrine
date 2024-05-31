import { Request, Response } from "express";
import { UserEntity } from "./entities/User.entity";
import { IResponse } from "../../interfaces/Interfaces";
import { StatusCodes } from 'http-status-codes';
import { UserRepository } from "./repository/User.repository";
import { EUser, ILogin, INewToken, IUser } from "./interfaces/IUser";
import { comparePasswordToHash, createHash, createToken } from "../../utils/Utils";
import moment from "moment";

export class UserService {

    private userRepository: UserRepository;

    constructor(UserRepository: UserRepository){
        this.userRepository = UserRepository;
    }

    async newUser(req: Request, res: Response<IResponse<any>>){
        try {
            const user: IUser = await UserEntity.validate(req.body);
            const existUser = await this.userRepository.find(EUser.email, user.email);

            if(existUser){
                return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Esse usuário já existe."]});
            }

            const refactorUser: IUser = {
                ...user,
                password: await createHash(user.password),
            }

            await this.userRepository.create(refactorUser);
            res.status(StatusCodes.OK).send({r: true, msg: "Usuário criado com sucesso!"});
        } catch (error) {

            console.warn(error)

            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar esse usuário."]});
        }
    }

    async login(req: Request, res: Response<IResponse<any>>){
        try {
            const body: ILogin = {
                email: req.body.email,
                password: req.body.password,
            };
            const existUser: IUser | boolean = await this.userRepository.find(EUser.email, body.email.toLowerCase()) as IUser;

            if(existUser){
                const comparedPassword = await comparePasswordToHash(body.password, existUser.password);

                if(comparedPassword){

                    const token: string = createToken({email: existUser.email, id: existUser._id}); 
                    const dateRefreshToken = moment().add(1, "day").toISOString();
                    const newUser: IUser = { ...existUser as IUser, validToken: token, validateRefreshToken: dateRefreshToken };
                    await this.userRepository.edit(existUser.email, newUser);

                    return res.status(StatusCodes.OK).send({r: true, msg: "Usuário logado com sucesso!", data: {token}});
                }

                return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Senha incorreta!"]});
            }

            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Esse usuário não existe."]});
            
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Erro ao fazer login."]});
        }
    }

    async newToken(req: Request, res: Response<IResponse<any>>){
        try {
            const body: INewToken = {
                email: req.body.email,
            };
            const existUser: IUser | boolean = await this.userRepository.find(EUser.email, body.email.toLowerCase()) as IUser;

            if(existUser){
                const verifyDateRefreshToken: boolean = moment(existUser.validateRefreshToken).isAfter(moment());

                if(verifyDateRefreshToken){
                    const token: string = createToken({email: existUser.email, id: existUser._id}); 
                    const dateRefreshToken = moment().add(1, "day").toISOString();
                    const newUser: IUser = { ...existUser as IUser, validToken: token, validateRefreshToken: dateRefreshToken };
                    await this.userRepository.edit(existUser.email, newUser);

                    return res.status(StatusCodes.OK).send({r: true, msg: "Acesso garantido!", data: {token}});
                }

                return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Acesso inválido!"] });
            }
            
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Erro ao obter um novo token."]});
        }
    }
}