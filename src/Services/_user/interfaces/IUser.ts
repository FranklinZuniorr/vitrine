import { ObjectId } from "mongoose";

export interface IUser {
    _id?: ObjectId,
    email: string,
    name: string,
    password: string,
    pix: string,
    socialNetwork?: string,
    validateRefreshToken?: string,
    validToken?: string,
}

export interface ILogin {
    email: string,
    password: string,
}

export interface INewToken {
    email: string,
}

export enum EUser {
    email = "email",
    name = "name",
    password = "password",
    pix = "pix",
    socialNetwork = "socialNetwork",
    validateRefreshToken = "validateRefreshToken",
    validToken = "validToken", 
}