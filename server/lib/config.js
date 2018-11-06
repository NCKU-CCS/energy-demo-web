"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfigs = {
    env: 'development',
    db: {
        host: 'localhost',
        database: 'energydemo',
        port: 27017,
    },
};
const productionConfigs = {
    env: 'production',
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    },
};
exports.default = () => {
    const env = process.env.NODE_ENV || 'development';
    switch (env) {
        case 'production':
            return Object.assign({}, defaultConfigs, productionConfigs);
        default:
            return defaultConfigs;
    }
};
