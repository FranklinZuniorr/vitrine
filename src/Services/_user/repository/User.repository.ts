import { Document, Model } from "mongoose";
import { IUserModel } from "./models/User.model";
import { EUser, IUser } from "../interfaces/IUser";

export class UserRepository {

    private userModel: Model<IUserModel & Document>

    constructor(UserModel: Model<IUserModel & Document>){
        this.userModel = UserModel;
    }

    async create(data: IUser): Promise<boolean>{
        try {
            await this.userModel.create({...data, email: data.email.toLowerCase() });

            return true;
            
        } catch (error) {
            return false;
        }
    }

    async find(query: EUser, value: any): Promise<IUser | boolean>{
        try {
            const user = await this.userModel.findOne({[query]: value});
            
            if(user){
                const userObject: IUser = user.toObject(); 
                const refactorUser: IUser = {
                    _id: userObject._id,
                    email: userObject.email,
                    password: userObject.password,
                    validateRefreshToken: userObject.validateRefreshToken,
                    validToken: userObject.validToken,
                    forgetPasswordKey: userObject.forgetPasswordKey,
                    store: userObject.store,
                    tickets: userObject.tickets,
                }; 
                return refactorUser;
            }

            throw false;
            
        } catch (error) {
            return false;
        }
    }

    async findById(userId: string): Promise<IUser | boolean>{
        try {
            const user = await this.userModel.findById(userId);
            
            if(user){
                const userObject: IUser = user.toObject(); 
                const refactorUser: IUser = {
                    _id: userObject._id,
                    email: userObject.email,
                    password: userObject.password,
                    validateRefreshToken: userObject.validateRefreshToken,
                    validToken: userObject.validToken,
                    forgetPasswordKey: userObject.forgetPasswordKey,
                    store: userObject.store,
                    tickets: userObject.tickets,
                }; 
                return refactorUser;
            }

            throw false;
            
        } catch (error) {
            return false;
        }
    }

    async edit(email: string, newUser: Partial<IUser>): Promise<boolean>{
        try {
            const userEdited = await this.userModel.updateOne({email: email.toLowerCase()}, newUser);

            if(userEdited){
                return true
            }

            throw false;
            
        } catch (error) {
            return false;
        }
    }

    async delete(id: string): Promise<Boolean> {
        try {
            const userDeleted = await this.userModel.deleteOne({_id: id});

            if(userDeleted){
                return true
            }

            throw false;
            
        } catch (error) {
            return false;
        }
    }

    async editTickets(userId: string, qty: number): Promise<boolean>{
        try {

            const userEdited = await this.userModel.updateOne({_id: userId}, {$inc: {tickets: qty}});

            if(userEdited){
                return true
            }

            throw false;
            
        } catch (error) {
            return false;
        }
    }
};