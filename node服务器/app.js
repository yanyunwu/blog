const express = require('express');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const path = require('path')


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('./src/dist'));

app.get('/geta', (req,res)=>{
    res.send('1');
})

// app.use(history({
//     index: '/',
//     verbose: true
// }));

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "./src/dist/index.html"))
// });






// app.use(function(req,res){
//     res.sendFile(__dirname + '/src/dist/index.html');
// })




app.listen(3000,()=>console.log('已启动!'));