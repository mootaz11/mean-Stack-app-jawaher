const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser=require("cookie-parser");



//connection to data base 

const password="FCgHl2xegQQFXkwG";
const uri ="mongodb+srv://amara11:"+password+"@cluster0-09veh.mongodb.net/admin?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser:true});

mongoose.connection.on('error',()=>{console.log('connection failed')});

mongoose.connection.on('ok',()=>{console.log('connection done')})

mongoose.set('debug',true);
mongoose.set('useFindAndModify', false);




const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser());


//Routes uploading
const UserRoute= require("./routes/user");
const CollectionRoute=require("./routes/collection");
const CitationRoute=require("./routes/citation");
const FavoriteRoute = require("./routes/favorite");
const CommentRoute=require("./routes/comment");




//userRoute
app.use('/user',UserRoute);


//collection Route
app.use('/users/my/collections',CollectionRoute);


//citations Route
app.use('/',CitationRoute);


//FavoriteRoute
app.use('/users/my/favorites',FavoriteRoute);


//CommentRoute
app.use('/users/my/comments',CommentRoute);


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
console.log('Server is Running on ',app.get('port'));
});

