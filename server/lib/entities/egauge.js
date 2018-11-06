"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Egauge = class Egauge {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Egauge.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Egauge.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Egauge.prototype, "dataid", void 0);
__decorate([
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], Egauge.prototype, "use", void 0);
__decorate([
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], Egauge.prototype, "gen", void 0);
__decorate([
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], Egauge.prototype, "grid", void 0);
Egauge = __decorate([
    typeorm_1.Entity()
], Egauge);
exports.Egauge = Egauge;
