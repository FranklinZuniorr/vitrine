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

    async edit(productId: string, data: Partial<IProduct>): Promise<boolean>{
        try {
            await this.productsModel.findByIdAndUpdate(productId, data);

            return true;
        } catch (error) {
            return false;
        }
    }

    async getAll(userId: string): Promise<IProduct[] | boolean> {
        try {

           const products = await this.productsModel.find({ userId: userId });

           if(products){
                const productsObject: IProduct[] = products.map(product => product.toObject());
                return productsObject;
           }

           throw false;
           
        } catch (error) {
            return false;
        }
    }
};