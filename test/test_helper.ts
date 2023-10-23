import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = global.Promise;

before((done) => {
    mongoose
        .set('strictQuery', false)
        .connect(config.db.host, {})
        .then(() => done())
        .catch((error) => done(error));
});

beforeEach((done) => {
    const {users, committees, events, tickets} = mongoose.connection.collections;
    users.deleteMany({}).then(() => {
        committees.deleteMany({}).then(() => {
            events.deleteMany({}).then(() => {
                tickets.deleteMany({}).then(() => {
                    done();
                })
            })
        })
    })
})

after((done) => {
    mongoose.connection.close(() => done());
});

