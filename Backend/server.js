const express = require('express') ;
const app = express() ;

const POST = 3000 ;


app.listen(POST ,() => {
    console.log(`Su kien lang nghe tai http://localhost:${POST}`)
})