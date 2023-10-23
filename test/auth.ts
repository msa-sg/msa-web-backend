import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';
import app from 'index';

chai.use(chaiHttp);

describe('Authentication', function () {
    it('Can register a user', async function () {
        const response = await request(app)
            .post('/auth/register')
            .send({ 'email': 'test1@test.com', 'password': 'test123', 'username': 'test1' })
            .set('Accept', 'application/json');
        expect(response.header["content-type"]).match(/json/);
        expect(response.status).equal(201);
        expect(response.body.message).to.equal("User created");
        expect(response.body).to.have.nested.property('data.id');
    })

})
