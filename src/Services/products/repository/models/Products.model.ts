import mongoose, { Document, Schema, SchemaTypes } from 'mongoose';
import { IProduct } from '../../interfaces/IProducts';

export interface IProductsModel extends Omit<IProduct, 'userId'>, Document {
    userId: Schema.Types.ObjectId
};

const ProductsModelSchema: Schema<IProductsModel> = new Schema<IProductsModel>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  photo: { type: String, required: true },
  status: { type: String, required: true },
  redirectLink: { type: String, required: true },
  value: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true });

const ProductsModel = mongoose.model<IProductsModel>('Products', ProductsModelSchema);

export default ProductsModel;
