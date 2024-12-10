import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Typescript Project Running On Port :  ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// console.log(config.database_url);

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Error Detect');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException',()=>{
  console.log('Uncaught Exception is detected');
  process.exit(1);
})











