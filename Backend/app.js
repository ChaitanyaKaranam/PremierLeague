const express=require('express');
const app=express();
const mongoose=require('mongoose');
const matches=require('./routes/matches');
const cors=require('cors');

mongoose.connect('mongodb://localhost/premierdb',{ useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conection established with Database...');
});

app.use(cors());

app.use('/matches',matches);

app.get('/',(req,res)=>{
    res.send('Welcome');
})

app.listen(3000,res=>{
    console.log('Backend server started on port:3000...');
});

