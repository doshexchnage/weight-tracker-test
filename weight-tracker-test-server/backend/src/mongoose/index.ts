import mongoose, { ConnectOptions } from 'mongoose';

const server: string = 'mongodb+srv://Agreement:0192837465@salesdashboard.iqak9tl.mongodb.net/?retryWrites=true&w=majority'; 
const database: string = 'credipple';

class MongoDB {
    constructor() {
        this._connect();
    }

    private _connect(): void {
        const options: ConnectOptions = { dbName: database };

        mongoose.connect(server, options)
            .then(() => {
                console.log('MongoDB connection successful..!');
            })
            .catch(err => {
                console.error('MongoDB connection error...!', err);
            });
    }
}

export default new MongoDB();
