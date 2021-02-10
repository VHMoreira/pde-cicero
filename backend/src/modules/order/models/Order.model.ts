import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Product } from "../../product/models/Product.model";

export class Order {
    @prop({ required: true })
    public total!: number;

    @prop({ required: true })
    public client_name!: string

    @prop({ required: true, enum: ['confirmed', 'canceled', 'on_progress'], default: 'on_progress' })
    public status!: string

    // @prop({ required: true })
    // public nome_do_cliente!: string

    @prop({ required: true })
    public created_at!: Date

    @prop({ ref: () => Product, type: () => [Product], default: [] })
    public products!: Ref<Product>[]
}

export default getModelForClass(Order); 