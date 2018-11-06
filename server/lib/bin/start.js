"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const port = process.env.NODE_PORT || 3000;
app_1.createApp().then(app => {
    app.listen(port, () => {
        console.log(`🚀 Server ready at port ${port}`);
    });
});
