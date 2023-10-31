import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../src/index';

chai.use(chaiHttp);

describe('server checks', function(){
    it('server is created without error', function(done){
        request(app).get('/').expect(200, done);
    })
})