var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: '4DD_10',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_10', //(Nome del DB)
}
/* GET home page.router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/immagini', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select Unit from [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.render('immagini',{dati:result.recordset});  //Invio il risultato
    });
    
  });
}); */
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      renderizza(pagina,res,result.recordset)
      sql.close();
    });

  });
}
renderizza=function(pagina,res,dati)
{
    res.render(pagina,{unita:dati})
}

router.get('/index',function(req,res,next){
    res.render('index');
});

router.get('/',function(req,res,next){
   let unita= "select * from dbo.[cr-unit-attributes]";
   executeQuery(res,unita,next,"unita");
});
router.get('/unit/:nome',function(req,res,next){
   let unita= `select * from dbo.[cr-unit-attributes] WHERE Unit = '${req.params.nome}'`;
   executeQuery(res,unita,next,"unit");             
});




module.exports = router;
