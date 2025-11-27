const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Posts API CRUD Operations', () => {

    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    const TEST_POST_ID = 1;

    it('GET /posts/1: Should retrieve a single post and validate its structure', function () {
        return frisby
            .get(`${BASE_URL}/posts/${TEST_POST_ID}`)
            .expect('status', 200)
            .expect('header', 'Content-Type', 'application/json; charset=utf-8')

            // Schema Validation
            .expect('jsonTypes', {
                userId: Joi.number().required(),
                id: Joi.number().valid(TEST_POST_ID).required(),
                title: Joi.string().required(),
                body: Joi.string().required()
            });
    });

    it('POST /posts: Should successfully create a new post', function () {
        const newPost = {
            title: 'frisby automation test post',
            body: 'This is the body for the new post created via Frisby.',
            userId: 99
        };

        return frisby
            .post(`${BASE_URL}/posts`, {
                body: newPost
            })
            .expect('status', 201)


            .expect('jsonTypes', {
                id: Joi.number().required(),
                title: Joi.string(),
                body: Joi.string(),
                userId: Joi.number()
            })


            .expect('json', {
                title: newPost.title,
                body: newPost.body,
                userId: newPost.userId
            });
    });

    it('PUT /posts/1: Should update an existing post', function () {
        const updatedPost = {
            id: TEST_POST_ID,
            title: 'Updated Title by Frisby',
            body: 'The body has been completely replaced in this PUT request.',
            userId: 1
        };

        return frisby
            .put(`${BASE_URL}/posts/${TEST_POST_ID}`, {
                body: updatedPost
            })
            .expect('status', 200)

            // JSONPlaceholder returns exactly what is sent
            .expect('json', updatedPost);
    });


    it('DELETE /posts/1: Should delete a post successfully', function () {
        return frisby
            .del(`${BASE_URL}/posts/${TEST_POST_ID}`)
            .expect('status', 200);
    });
});
