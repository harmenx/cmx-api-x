const request = require('supertest');
const expect = require('chai').expect;
const app = require('../');

const testUser = 
    {
        'email': `test-user-${Math.random().toString(36).substring(7)}@codementor.io`,
        'name': 'Test User',
        'password': Math.random().toString(36).substring(7)
    }


const testIdea = {
    'content': 'the-content',
    'impact': 8,
    'ease': 8,
    'confidence': 8
};

let createdIdea = {};

let authToken = {};

describe('Idea', () => {
    before((done) => {
    
            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .send(testUser)
                .end((err, res) => {
                    if (res) {
                        authToken = res.body;
                        return done();
                    }
                    return done(err);
                });
       
    });

    describe('POST: /ideas', () => {
        it('should create a new idea for this logged in user ', (done) => {
            request(app)
                .post('/ideas')
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .send(testIdea)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        createdIdea = res.body;
                        expect(createdIdea._id).not.to.be.undefined;
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('PUT: /ideas', () => {
        it('should update an already created idea', (done) => {
            request(app)
                .put(`/ideas/${createdIdea._id}`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .send(createdIdea)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('GET: /ideas', () => {
        it('should get all ideas created by this user', (done) => {
            request(app)
                .get(`/ideas`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });

    describe('DELETE: /ideas', () => {
        it('should get all ideas created by this user', (done) => {
            request(app)
                .delete(`/ideas/${createdIdea._id}`)
                .set('Accept', 'application/json')
                .set('x-access-token', authToken.jwt)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res) {
                        return done();
                    }
                    return done(err);
                });
        });
    });
});