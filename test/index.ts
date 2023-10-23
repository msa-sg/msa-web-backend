import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';
import app from 'index';

chai.use(chaiHttp);

describe('server checks', function(){
    it('server is created without error', function(done){
        request(app).get('/').expect(200, done);
    })
})