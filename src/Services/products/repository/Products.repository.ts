import { Document, Model } from "mongoose";
import { IProductsModel } from "./models/Products.model";
import { IProduct } from "../interfaces/IProducts";

export class ProductsRepository {

    private productsModel: Model<IProductsModel & Document>

    constructor(ProductsModel: Model<IProductsModel & Document>){
        this.productsModel = ProductsModel;
    }

    async create(data: IProduct): Promise<boolean>{
        try {
            await this.productsModel.create(data);

            return true;
        } catch (error) {
            return false;
        }
    }
};