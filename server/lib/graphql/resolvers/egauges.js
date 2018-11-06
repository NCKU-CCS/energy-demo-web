"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const typeorm_1 = require("typeorm");
const egauge_1 = require("../../entities/egauge");
exports.egaugesResolver = {
    Query: {
        async Egauges(_, args) {
            const options = args || {};
            const repository = typeorm_1.getRepository(egauge_1.Egauge);
            return repository.find(options);
        },
    },
    Mutation: {
        async createEgauge(_, args, { io }) {
            const repository = typeorm_1.getRepository(egauge_1.Egauge);
            const egauge = Object.assign({ id: uuid.v4() }, args.egauge);
            await repository.save(egauge);
            io.emit('egaugeAdded', egauge);
            return egauge;
        },
    },
};
