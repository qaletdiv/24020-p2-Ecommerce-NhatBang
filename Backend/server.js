const path = require('path')
require('dotenv').config();
const express = require('express') ;
const cors = require('cors');
const app = express() ;
const requestLoggerMiddleware = require('./middlewares/requestLogger')
const errorHandlerMiddleware = require('./middlewares/errorHandler') ;

const userRouter = require('./routers/userRouter') ;
const categoryRouter = require('./routers/categoryRouter') ;
const productRouter = require('./routers/productRouter') ;
const cartRouter = require('./routers/cartRouter') ;
const historyRouter = require('./routers/historyOrderRouter')
const orderItemRouter = require('./routers/orderItemRouter');
const ProductImageRouter = require('./routers/productImageRouter') ;
const seedAdmin = require('./controllers/seedAdmin');
const db = require('./models') ;

const PORT = process.env.PORT || 3000;


// bật CORS cho frontend HTML/JS thuần
app.use(cors());
app.use(requestLoggerMiddleware) ;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())


app.use('/api/auth' , userRouter)
app.use('/api/product_image' , ProductImageRouter)
app.use('/api/category' , categoryRouter) ;
app.use('/api/products', productRouter) ;
app.use('/api/cart' ,cartRouter) ;
app.use('/api/historyOrder' , historyRouter) ;
app.use('/api/orderItem' , orderItemRouter) ;

app.use(errorHandlerMiddleware)
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("ket noi database thanh cong");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("ket noi database that bai", error);
    }
}

startServer();