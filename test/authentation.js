const request = require('supertest');
const expect = require('chai').expect;
const app = require('../');
const userDao = require('../database/user.dao');

const testUsers = [
    {
        'email': 'harmendark@codementor.io',
        'name': 'Harmen Dark',
        'password': 'Apassword!'
    },
    {
        'email': 'harmen.dark@codementor.io',
        'name': 'Dark Harmen',
        'password': 'APassword!'
    }
];

let authTokens = {};

describe('Authentication', () => {
    before((done) => {
        let testUserEmails = testUsers.map(user => user.email);
        userDao.delete({ email: { '$in': testUserEmails } }, (err, stats) => {
            if (err) throw new Error('Cannot connect to DB');
            done();
        });
    });

    // describe('POST: /users', () => {
    //     it('creates a new user in the database and return the auth credentials', (done) => {
    //         request(app)
    //             .post('/users')
    //             .set('Accept', 'application/json')
    //             .send(testUsers[0])
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (res) {
    //                     let tokenObj = res.body;
    //                     expect(tokenObj.refresh_token).not.to.be.undefined;
    //                     expect(tokenObj.jwt).not.to.be.undefined;
    //                     return done();
    //                 }
    //                 return done(err);
    //             });
    //     });
    // });

    // describe('POST: /access-tokens', () => {
    //     it('Successfully logs in a user with correct credentials', (done) => {
    //         let userLoginCredentials = {
    //             'email': testUsers[0].email,
    //             'password': testUsers[0].password
    //         }

    //         request(app)
    //             .post('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .send(userLoginCredentials)
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 if (res) {
    //                     let tokenObj = res.body;
    //                     authTokens = tokenObj;
    //                     expect(tokenObj.refresh_token).not.to.be.undefined;
    //                     expect(tokenObj.jwt).not.to.be.undefined;
    //                     return done();
    //                 }
    //             });
    //     });

    //     it('Fails to log in a user with an email that is not yet registered', (done) => {
    //         let userLoginCredentials = {
    //             'email': 'fakemail@gmail.com',
    //             'password': testUsers[0].password
    //         }

    //         request(app)
    //             .post('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .send(userLoginCredentials)
    //             .expect('Content-Type', /json/)
    //             .expect(404)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    //     it('Fails to log in a user with a wrong password', (done) => {
    //         let userLoginCredentials = {
    //             'email': testUsers[0].email,
    //             'password': 'fakepassword'
    //         }

    //         request(app)
    //             .post('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .send(userLoginCredentials)
    //             .expect('Content-Type', /json/)
    //             .expect(422)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });
    // });

    // describe('POST: /access-tokens/refresh', () => {
    //     it('should get a new access token when a refresh token is passed', (done) => {
    //         request(app)
    //             .post('/access-tokens/refresh')
    //             .set('Accept', 'application/json')
    //             .set('x-access-token', authTokens.jwt)
    //             .send({ refresh_token: authTokens.refresh_token })
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });
    // })

    // describe('DELETE: /access-tokens', () => {
    //     it('Successfully logs a user out with correct credentials', (done) => {
    //         let userLoginCredentials = {
    //             'email': testUsers[0].email,
    //             'password': testUsers[0].password
    //         }

    //         request(app)
    //             .delete('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .set('x-access-token', authTokens.jwt)
    //             .send({ refresh_token: authTokens.refresh_token })
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    //     it('Fails to logout a user when the refresh token is not sent in the request body', (done) => {
    //         let userLoginCredentials = {
    //             'email': testUsers[0].email,
    //             'password': testUsers[0].password
    //         }

    //         request(app)
    //             .delete('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .set('x-access-token', authTokens.jwt)
    //             .expect('Content-Type', /json/)
    //             .expect(403)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });

    //     it('Fails to logout a user when the jwt token is not passed in the header', (done) => {
    //         let userLoginCredentials = {
    //             'email': testUsers[0].email,
    //             'password': testUsers[0].password
    //         }

    //         request(app)
    //             .delete('/access-tokens')
    //             .set('Accept', 'application/json')
    //             .send({ refresh_token: authTokens.refresh_token })
    //             .expect('Content-Type', /json/)
    //             .expect(403)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });
    // });
});