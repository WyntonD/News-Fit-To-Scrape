var express = reuire("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collection);
db.on("error", function(error) {
    console.log("Database Error:", error)
});

app.get("/", function (req,res) {
    res.send("Hello world");
});

app.get("/all", function (req, res) {
    db.scrapedData.find({}, function (error, found) {
        if(error) {
            console.log(error);
        }
        else {
            res.json(found);
        }
    });
});