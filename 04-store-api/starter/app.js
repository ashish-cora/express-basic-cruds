const express = require('express');
const connectDB = require('./db/connect');
const productRouter = require('./routes/products')
const app = express();

require('dotenv').config();
require('express-async-errors')

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());


app.get('/', (req, res) => {
    res.send("<h1>Store Api</h1><a href = '/api/v1/products'>Product route</a>")
})

app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening in port ${port} !!`))
    }
    catch (error){
        console.log("error occured while starting up this webApp", error);
    }
}

start();