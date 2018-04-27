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
  var product =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.any
      ? req.body.result.parameters.any
      : "No products found";
  return res.json({
    speech: product,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
