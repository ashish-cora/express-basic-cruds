// require('./db/connect')
require('dotenv').config();
const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require("./db/connect");
const notFound  = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`));
    }
    catch(error){
        console.log(error);
    }
}
    
start()