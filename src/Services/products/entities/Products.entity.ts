import * as yup from 'yup';
import { IProduct } from '../interfaces/IProducts';
import { ENUM_STATUS } from '../../../constants';
import { Schema, isObjectIdOrHexString } from 'mongoose';

export class ProductEntity {

    static async validate({...product}: IProduct): Promise<IProduct> {
        const productSchema = yup.object<IProduct>().shape({
            name: yup.string().required('O nome do produto é obrigatório!'),
            description: yup.string().required('A descrição do produto é obrigatória!'),
            photo: yup.string().required('A foto do produto é obrigatória'),
            status: yup.string().oneOf(Object.values(ENUM_STATUS), `Só os valores ${Object.values(ENUM_STATUS).map(text => text)} são permitidos`)
            .required('O status do produto é obrigatório!'),
            redirectLink: yup.string().required('O link de redirecionamento para contato é obrigatório!'),
            value: yup.number().required("O valor do produto é obrigatório!"),
            userId: yup.string().test('isObjectId', "O id precisa ser válido!", value => isObjectIdOrHexString(value)).required('O id do usuário é obrigatório!'),
        }).noUnknown(true, 'Campos adicionais não são permitidos!')

        try {
            const validatedData = productSchema.validateSync(product, {
              abortEarly: false, 
              stripUnknown: false,
            });
          
            return validatedData;
        } catch (error: any) {
            const msgErrors = error.inner.map((e: any) => e.message);
            throw msgErrors;
        }
    }

    static async validateEdit({...product}: Partial<IProduct>): Promise<Partial<IProduct>> {
        const productSchema = yup.object<Partial<IProduct>>().shape({
            name: yup.string(),
            description: yup.string(),
            photo: yup.string(),
            status: yup.string().oneOf(Object.values(ENUM_STATUS), `Só os valores ${Object.values(ENUM_STATUS).map(text => text)} são permitidos`),
            redirectLink: yup.string(),
            value: yup.number(),
            userId: yup.string().test('isObjectId', "O id precisa ser válido!", value => isObjectIdOrHexString(value)),
        }).noUnknown(true, 'Campos adicionais não são permitidos!')

        try {
            const validatedData = productSchema.validateSync(product, {
              abortEarly: false, 
              stripUnknown: false,
            });
          
            return validatedData;
        } catch (error: any) {
            const msgErrors = error.inner.map((e: any) => e.message);
            throw msgErrors;
        }
    }
}