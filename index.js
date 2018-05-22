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
 var creds = require('./client_secret_dev.json');
 var doc = new GoogleSpreadsheet('1IdnXQFjBUDngUPpzmnW6eJ68Lqk8oTUCA6NISxanAW0');
 var input = req.body.result.parameters.param1.toLowerCase() ;
 var myString = "";
 var flag = 0;
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
	                //var output = ["Saab", "Volvo", "BMW"];
			for (let row1 in data1) {
				var prod = {};
				var productname = data1[row1].product.toLowerCase();
				productname = productname.replace("&","and");
				var aisleno = data1[row1]['aisle'].toLowerCase();
				 if((input.replace("&","and")) == productname && !(aisleno.includes("aisle"))){
					flag++;
					prod = aisleno;
					myString = JSON.stringify(prod);
					myString = myString.replace(/\"/g, "");
					myString = "aisle " + myString ;
					string1 = string1 + " You can find " + input + " in " +  myString + ';';
					
				}else if ((input.replace("&","and")) == productname && aisleno.includes("aisle")) {
				       flag++;
				       prod = aisleno;
				       myString = JSON.stringify(prod);
				       myString = myString.replace(/\"/g, "");
				       string1 = string1 + " You can find " + input +  myString +  ';'; 
				}
				
		}
			if(flag <= 0){
			    string1 = string1 + "Currently this product is not available in our store " + ';';
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

restService.post('/getproduct', function(req, res) {
    //console.log('=============' + req.body.result.action)
    
 var resp = {},
 ret = '';
 var GoogleSpreadsheet = require('google-spreadsheet');
 var creds = require('./client_secret_main.json');
 var doc = new GoogleSpreadsheet('1sS52vZsiJ_ZVJxuW4U1YKHHruj4mdLV4ETTsTfsQKhQ');
 var input = req.body.result.parameters.param1.toLowerCase() ;
 var myString = "";
 var flag = 0;
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
	                var output = ["It is available in ", "You can get it in ", "It is located in ","It is in "];
	                var randoutput = output[Math.floor(Math.random() * output.length)];
			for (let row1 in data1) {
				var prod = {};
				var productname = data1[row1].product.toLowerCase();
				productname = productname.replace("&","and");
				var aisleno = data1[row1]['aisle'].toLowerCase();
				 if((input.replace("&","and")) == productname && !(aisleno.includes("aisle"))){
					flag++;
					prod = aisleno;
					myString = JSON.stringify(prod);
					myString = myString.replace(/\"/g, "");
					myString = "aisle " + myString ;
					string1 = string1 + randoutput +  myString + ';';
					
				}else if ((input.replace("&","and")) == productname && aisleno.includes("aisle")) {
				       flag++;
				       prod = aisleno;
				       myString = JSON.stringify(prod);
				       myString = myString.replace(/\"/g, "");
				       string1 = string1 + " You can find it " +  myString +  ';'; 
				}
				
		}
			if(flag <= 0){
			    string1 = string1 + "Currently this product is not available in our store " + ';';
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
