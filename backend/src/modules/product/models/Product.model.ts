import { getModelForClass, prop } from "@typegoose/typegoose";

export class Product {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public price!: number;

    @prop({ required: true })
    public category!: string
}

export default getModelForClass(Product); 