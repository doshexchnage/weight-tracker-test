import mongoose, { Schema, Document, Model, model } from 'mongoose';

// Define the TypeScript interface for the Client document
interface IClient extends Document {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    date: Date;
    accountType: string;
    paymentMethod: string;
    taxId: string;
    website: string;
    industry: string;
    registrationNumber: string;
    type: string;
    clientNumber: string;
}

// Define the schema for the Client model
const clientSchema: Schema<IClient> = new Schema<IClient>({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    accountType: {
        type: String,
        required: false,
    },
    paymentMethod: {
        type: String,
        required: false,
    },
    taxId: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    industry: {
        type: String,
        required: false,
    },
    registrationNumber: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    clientNumber: {
        type: String,
        required: false,
    },
}, { collection: 'client', timestamps: true });

// Create and export the Client model
const Client: Model<IClient> = model<IClient>('Client', clientSchema);
export default Client;
