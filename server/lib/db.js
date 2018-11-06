"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typeorm_1 = require("typeorm");
exports.connect = async (config) => {
    return typeorm_1.createConnection({
        type: 'mongodb',
        host: config.host,
        database: config.database,
        port: config.port,
        entities: [
            path_1.resolve(__dirname, './entities/*.ts'),
        ],
        logging: ['error'],
        synchronize: true,
    }).then((...args) => {
        console.log('Database connection established');
    });
};
