var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongo=require('mongodb');
var MongoClient=mongo.MongoClient;
var port=8081;

app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'));


app.use(function(req,res,next){
      res.header("Access-Control-Allow-Origin","*");
      res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});

app.get('/home',function(req,res){
  res.sendFile(__dirname+'/public/views/index.html');
});
app.post('/textAreaDetails', function(req,res){
    console.log("hello");
    var data=req.body;
    MongoClient.connect("mongodb://127.0.0.1:27017/feedback", function(err,db){

        if(err){
          console.log("error in connection");
        }
        if(!err){
            var collectionDetails=db.collection('userData');
                    collectionDetails.save(data,function(err,items){
                        console.log("done");
                        db.close();
                    });
            console.log("done1");
            //res.writeHead(200,{'Content-type':'text/html'});
            //res.end('<h1>Hello World</h1>');
        }
            });
            
});
app.listen(port, function(req,res){
  console.log('server listens at '+port);
});


