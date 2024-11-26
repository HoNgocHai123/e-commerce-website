const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

const userRouter = require('./router/userRouter');
const categoryRouter = require('./router/categoryRouter');
const productRouter = require('./router/productRouter');   
const commentRouter = require('./router/commentRouter') ;
const cartRoter = require('./router/cartRouter')

app.use('/categories', categoryRouter);
app.use('/product', productRouter);
app.use('/users', userRouter);
app.use ('/comment', commentRouter)
app.use ('/cart', cartRoter)


app.get('/', (req, res) => {
    res.send('Xin chào');
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});
