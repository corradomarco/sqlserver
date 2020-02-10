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


/* GET users listing. */
router.get('/esami', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select * from [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });

  });
});

router.get('/unit', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select Unit from [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
    
  });
});

router.get('/:unit', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query(`select * from [cr-unit-attributes] where unit = '${req.params.unit}'`, (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
    
  });
});


//…NON CANCELLATE GLI ALTRI METODI

router.post('/', function (req, res, next) {
  console.log(req.body);
  // Add a new Unit  
  let unit = req.body;
  if (!unit) {
    next(createError(400 , "Please provide a correct unit"));
  }
  sql.connect(config, err => {
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit,Cost,Hit_Speed) 
                     VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}')`;
    let sqlRequest = new sql.Request();
    sqlRequest.query(sqlInsert, (error, results) => {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
  })
});
module.exports = router;
