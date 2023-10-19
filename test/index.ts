import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
// import app from 'src/index'; // Import your Express app
import mongoose from 'mongoose';
import config from 'src/config';

chai.use(chaiHttp);

describe('Database Connection', () => {
    before((done) => {
        mongoose
            .set('strictQuery', false)
            .connect(config.db.host, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            })
            .then(() => done())
            .catch((error) => done(error));
    });

    it('should connect to the database', () => {
        expect(mongoose.connection.readyState).to.equal(1); // 1 means connected
    });


    after((done) => {
        mongoose.connection.close(() => done());
    });
});
