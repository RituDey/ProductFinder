"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
//var dateFormat = require('dateformat');
var http = require('https');
//var os = require('os');

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post('/finditem', function(req, res) {
    //console.log('=============' + req.body.result.action)
    
 var resp = {},
 ret = '';
 var GoogleSpreadsheet = require('google-spreadsheet');
 var creds = require('./client_secret.json');
 var doc = new GoogleSpreadsheet('1IdnXQFjBUDngUPpzmnW6eJ68Lqk8oTUCA6NISxanAW0');
 var input = req.body.result.parameters.any ;
 doc.useServiceAccountAuth(creds, function (err) {
  if (err) {
   console.log(err);
   ret = err;
   speech = ret;
   resp.speech = speech;
   resp.displayText = speech;
   return res.json(resp);    
  }
  else {
   doc.getRows(1, function (err1, rows1) {
	   console.log('here');
    if (err1) {
     console.log(err1);
     ret = err1;
     speech = ret;
     resp.speech = speech;
     resp.displayText = speech;
     return res.json(resp);    
    }
    else {
    
			var data1 = rows1;
			//var data = [];
			var string1 = "";																		   
			for (let row1 in data1) {
				var prod = {};
				
				if(input == data1[row1].product){
					
					prod.aisle = data1[row1]['aisle'];
					//data.push(prod);
					
					var myJSON = prod.toString();
					string1 = string1 + data1[row1].product + " can be found in "  +  myJSON +  ' ; ';
				}
				//console.log(data1[row1]['product']);
				//prod.product = data1[row1]['product'];
				//prod.qty = data1[row1]['qty'];
																											
					//data.push(prod);
				}
				//console.log(data);
	       return res.json({
                    speech: string1,
                    source: 'webhook-echo-one',
         
                });
    }
   });
  }
 });
});


 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
