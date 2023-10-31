import chai, { expect } from 'chai';
import {createUser, deleteAllUsers, deleteUser, findUser, loginUser} from '../../src/services/users';
import {UserDocument} from '../../src/db/users';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('user service', () => {
    after(async () => {
        await deleteAllUsers();
    });

    afterEach(async () => {
        await deleteAllUsers();
    })

    const userPayload = {
        email: "test1@test.com",
        password: "asecretpassword",
        username: 'user_test1'
    };

    describe('create user', () => {
        describe('given the input is valid', () => {
            it('should create a new user', async () => {
                const user = await createUser(userPayload);
                expect(user.email).to.equal(userPayload.email);
                expect(user.username).to.equal(userPayload.username);
                expect(user.password).to.not.equal(userPayload.password);
            })
        })
    });

    describe('find user', () => {
        describe('given the user id exists', () => {
            var user: UserDocument;
            beforeEach(async () => {
                user = await createUser(userPayload);
            })
            
            it('should return a user', async () => {
                const resultUser = await findUser({email: userPayload.email});
                expect(user._id.toString()).to.equal(resultUser?._id.toString());
                expect(user.username).to.equal(resultUser?.username);
                expect(user.comparePassword(userPayload.password)).to.eventually.be.true;
            })

            it('should be able to return particular existing fields requested', async() => {
                const resultUser = await findUser({email: userPayload.email}, {email: 1, _id: 0, course: 1});
                expect(resultUser).to.not.have.property('_id');
                expect(resultUser).to.have.property('email');
                expect(resultUser).to.not.have.property('course');
                expect(resultUser).to.not.have.property('password');
                expect(resultUser).to.not.have.property('sessions');
            })

            it('should be able to return sensitive information when requested', async() => {
                const resultUser = await findUser({'_id': user._id.toString()}, null, true);
                expect(resultUser).to.have.property('password');
            })
        })
    });

    describe('log user in', () => {
        describe('given the password is correct', () => {
            it('should return true', async () => {
                const user = await createUser(userPayload);
                const isValid = await loginUser({
                    email: user.email,
                    password: userPayload.password
                });
                expect(isValid).to.be.true;
            })
        })
    })
})