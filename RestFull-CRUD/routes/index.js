var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/unit', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select Unit from [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.render(immagini);  //Invio il risultato
    });
    
  });
});


module.exports = router;
