 
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
// import { StudentRoutes } from './app/modules/student/student.route';
// import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandlers';
import notFound from './app/middleware/notFound';
import router from './app/routes';

// parser

app.use(express.json());
app.use(cors());

// Application Route

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//Global Error Handler 

app.use(globalErrorHandler)
app.use(notFound)


export default app;
