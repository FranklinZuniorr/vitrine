import { NextFunction, Request, Response } from "express";
import { IResponse } from "../interfaces/Interfaces";
import { v2 as cloudinary } from 'cloudinary';
import { StatusCodes } from "http-status-codes";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export class Cloudinary {

    async filterImage(req: Request, res: Response<IResponse<any>>, next: NextFunction){
        const base64Situation1: string = req.body.photo;
        const base64Situation2: string = req.body.store.photo;
        const base64: string = base64Situation1 ?? base64Situation2 ?? '';
        if(!base64 && base64.length > 1000) return res.status(StatusCodes.BAD_REQUEST).send({ r: false, errors: ['Nenhuma imagem encontrada!'] });
        const result = await cloudinary.uploader.upload(base64, { overwrite: true, unique_filename: true }).then(res => res).catch(err => err);
        const secureUrl = result.secure_url;

        if(!result) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ r: false, errors: ['Não foi possível registrar a imagem!'] })
        
        if(base64Situation1) {
            req.body.photo = secureUrl;
        }

        if(base64Situation2) {
            req.body.store.photo = secureUrl;
        }

        next();
    }
}