import mongoose from 'mongoose';
import config from '../src/config';

mongoose.Promise = global.Promise;

before((done) => {
    mongoose
        .set('strictQuery', false)
        .connect(config.db.host, {})
        .then(async () => {
            for(var collection in mongoose.connection.collections){
                await mongoose.connection.collections[collection].deleteMany({});
            }
            done();
        })
        .catch((error) => done(error));
});

after((done) => {
    mongoose.connection.close(() => done());
});

