"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/newservice", function(req, res) {
  
  return res.json({
    speech: "test",
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
