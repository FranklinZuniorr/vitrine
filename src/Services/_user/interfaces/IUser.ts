import { ObjectId } from "mongoose";

export interface IUser {
    _id?: ObjectId,
    email: string,
    password: string,
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
    password = "password",
    validateRefreshToken = "validateRefreshToken",
    validToken = "validToken", 
}