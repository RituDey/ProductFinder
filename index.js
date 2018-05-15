"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
var http = require('https');

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
 var input = req.body.result.parameters.param1.toLowerCase() ;
 // input = input.replace("&","and");
 var myString = "";
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
			var string1 = "";																		   
			for (let row1 in data1) {
				var prod = {};
				var productname = data1[row1].product.toLowerCase();
				productname = productname.replace("&","and");
				var aisleno = data1[row1]['aisle'].toLowerCase();
				 if((input.replace("&","and")) == productname && !(aisleno.includes("aisle"))){
					prod = aisleno;
					myString = JSON.stringify(prod);
					myString = myString.replace(/\"/g, "");
					myString = "aisle " + myString ;
					string1 = string1 + " It is available in " +  myString + ';';  
				}else if ((input.replace("&","and")) == productname && aisleno.includes("aisle")) {
				       prod = aisleno;
				       myString = JSON.stringify(prod);
				       myString = myString.replace(/\"/g, "");
				       string1 = string1 + " You can find it " +  myString +  ';'; 
				}else  { 
				
				      string1 = string1 + "Product is not available " + ';';
				      break;
				}
		}
				
	       return res.json({
                    
			"speech": string1,
			"source": "webhook-echo-one",
		       
			
         
                });
    }
   });
  }
 });
});


 
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
