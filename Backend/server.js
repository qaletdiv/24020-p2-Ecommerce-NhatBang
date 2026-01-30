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
const db = require('./models') ;

const POST = 3000 ;

// bật CORS cho frontend HTML/JS thuần
app.use(cors());
app.use(requestLoggerMiddleware) ;

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.json())


app.use('/api/auth' , userRouter)
app.use('/api/category' , categoryRouter) ;
app.use('/api/product', productRouter) ;
app.use('/api/cart' ,cartRouter) ;
app.use('/api/historyOrder' , historyRouter) ;
app.use('/api/orderItem' , orderItemRouter)
app.use(errorHandlerMiddleware)
db.sequelize.authenticate()
.then(() => {
    console.log('ket noi database thanh cong')
})
.catch((error) => {
    console.log('ket noi database that bai' , error)
})
app.listen(POST ,() => {
    console.log(`Su kien lang nghe tai http://localhost:${POST}`)
})