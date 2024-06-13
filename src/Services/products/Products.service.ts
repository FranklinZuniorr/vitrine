import { Request, Response } from "express";
import { IResponse } from "../../interfaces/Interfaces";
import { StatusCodes } from 'http-status-codes';
import { ProductsRepository } from "./repository/Products.repository";
import { IProduct } from "./interfaces/IProducts";
import { ProductEntity } from "./entities/Products.entity";

export class ProductsService {

    private productsRepository: ProductsRepository;

    constructor(ProductsRepository: ProductsRepository){
        this.productsRepository = ProductsRepository;
    }

    async newProduct(req: Request, res: Response<IResponse<any>>){
        try {
            const newProduct: IProduct = await ProductEntity.validate(req.body);
            const hasCreatedProduct: boolean = await this.productsRepository.create(newProduct);

            if(!newProduct || !hasCreatedProduct) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível criar o produto"]});
        
            res.status(StatusCodes.OK).send({r: true, msg: "Produto criado com sucesso!"})
        } catch (error) {
            const entityErrors: string[] = Array.isArray(error) ? error : [];
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: entityErrors.length ? entityErrors : ["Não foi possível criar o produto."]});
        }
    }

    async editProduct(req: Request, res: Response<IResponse<any>>){
        try {
            const productId: string = req.params.productId;
            const newProduct: Partial<IProduct> = await ProductEntity.validateEdit(req.body);
            const { userId, ...restNewProduct } = newProduct;
            const hasEditedProduct: boolean = await this.productsRepository.edit(productId, restNewProduct);

            if(!newProduct || !hasEditedProduct) return res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível editar o produto!"]});
        
            res.status(StatusCodes.OK).send({r: true, msg: "Produto editado com sucesso!"})
        } catch (error) {
            const entityErrors: string[] = Array.isArray(error) ? error : [];
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: entityErrors.length ? entityErrors : ["Não foi possível editar o produto!"]});
        }
    }

    async getAllByUser(req: Request, res: Response<IResponse<IProduct[]>>){
        try {
            const userId: string = req.params.userId; 
            const products: IProduct[] | boolean = await this.productsRepository.getAll(userId);

            if(!products) return res.status(StatusCodes.NOT_FOUND).send({r: false, errors: ["Nenhum produto encontrado!"]});

            res.status(StatusCodes.OK).send({ r: true, data: products as IProduct[], msg: "Produtos encontrados!" })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível encontrar produtos!"]});
        }
    }

    async getById(req: Request, res: Response<IResponse<IProduct>>){
        try {
            const productId: string = req.params.productId; 
            const product: IProduct | boolean = await this.productsRepository.getById(productId);

            if(!product) return res.status(StatusCodes.NOT_FOUND).send({r: false, errors: ["Nenhum produto encontrado!"]});

            res.status(StatusCodes.OK).send({ r: true, data: product as IProduct, msg: "Produto encontrado!" })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).send({r: false, errors: ["Não foi possível encontrar o produto!"]});
        }
    }
}