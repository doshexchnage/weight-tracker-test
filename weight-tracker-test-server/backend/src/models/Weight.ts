import mongoose, { Schema, Document, Model, model } from 'mongoose';

interface IWeight extends Document {
    industry: string;
    location: string;
    rating: number;
}

const weightSchema: Schema<IWeight> = new Schema<IWeight>({
    industry: {
        type: String,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
}, { collection: 'weight', timestamps: true });

const Weight: Model<IWeight> = model<IWeight>('Weight', weightSchema);

export default Weight;
