import { createApp } from '../app';
const port = process.env.NODE_PORT || 4000;

createApp().then(app => {
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at port ${port}`);
  });
});
