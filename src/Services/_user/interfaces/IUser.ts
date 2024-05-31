import { ObjectId } from "mongoose";

export interface IUser {
    _id?: ObjectId,
    email: string,
    password: string,
    validateRefreshToken?: string,
    validToken?: string,
    forgetPasswordKey: string;
}

export interface ILogin {
    email: string,
    password: string,
}

export interface INewToken {
    email: string,
}

export interface INewPassword {
    rememberedPassword: string;
    newPassword: string;
}

export enum EUser {
    _id = "_id",
    email = "email",
    password = "password",
    validateRefreshToken = "validateRefreshToken",
    validToken = "validToken", 
}