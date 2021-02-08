'use strict'

const express = require('express');
const server = express();
const request = require("supertest");

server.use('/',require('../../src/routes'));

describe('/users', () => {
    it('/', async () => {
        const { body } = await request(server).get('/users');
        console.log(body); 
        expect(body).toEqual({});
    })
})