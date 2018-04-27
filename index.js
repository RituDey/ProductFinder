const http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
   //write a response to the client
                                var input = 'Lenna';
                                getData().then((output) => {
                                
                                                console.log(output);
												
                                }).catch((error) => {
                                // If there is an error let the user know
                                //res.setHeader('Content-Type', 'application/json');
                                //res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
                  });
  res.write('hi');
                res.end();
				//end the response
}).listen(8080); //the server object listens on port 8080

function getData () {
  return new Promise((resolve, reject) => {

                var GoogleSpreadsheet = require('google-spreadsheet');
                var creds = require('./client_secret.json');

                // Create a document object using the ID of the spreadsheet - obtained from its URL.
                var doc = new GoogleSpreadsheet('1UwfGyX4NeTyds9mgXG2ldx_wwY2qCur6jhD3kqOisDc');

                // Authenticate with the Google Spreadsheets API.
                doc.useServiceAccountAuth(creds, function (err) {
                                console.log('here');
                  // Get all of the rows from the spreadsheet.
                  doc.getRows(1, function (err1, rows1) {
                                if (err1) {
                                                console.log(err1);
                                                reject(err1);
                                }
                                else {
                                                var data1 = rows1;
                                                var data = [];
                                                                               
                                                    for (let row1 in data1) {
														var prod = {};
														
														prod.product = data1[row1]['product'];
														prod.qty = data1[row1]['qty'];
																									
                                                            data.push(prod);
                                                        }
                                                        //console.log(data[0]);
                                                        resolve(data[0]);
                                                  
                                                
                                }
                  });
                });
  })
}