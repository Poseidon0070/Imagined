import express, { Application, Request, Response } from 'express'; 
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app: Application = express();
app.use(bodyParser.json());

// test route
app.get('/check', (req:Request, res:Response) => {
    res.send('Hello World!!');
})

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 3000');
})

export default app;