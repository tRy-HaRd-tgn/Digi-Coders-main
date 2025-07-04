const express = require('express');
const app = express();

//importing routers
const userRouter = require('./routers/userRouter');
const trainerRouter = require('./routers/trainerRouter');
const chapterRouter = require('./routers/chapterRouter');
const contactRouter = require('./routers/contactRouter');
const utilRouter = require('./routers/util');



const cors = require( 'cors');

app.use(cors({
    origin: '*'
}));

//convert(parse) json data
app.use(express.json());

//adding routers
app.use('/user', userRouter);
app.use('/trainer', trainerRouter);
app.use('/chapter', chapterRouter);
app.use('/contact', contactRouter);
app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {      
    res.send('Working Perfectly');    //get is used for searching somethig because data is not hidden
                                      //post is used for login or signup because data is hidden
});

app.get('/add', (req, res) => {
    res.send('Response from Add');
});

app.get('/getall', (req, res) => {
    res.send('Response from Getall route');
});

app.listen( port, () => { console.log('server started!!'); } );
