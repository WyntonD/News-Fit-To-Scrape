var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error)
});

app.get("/", function (req,res) {
    res.send("Hello world");
        axios.get("https://www.forbes.com/ai/#62ec1a757052").then(function (response) {

    var $ = cheerio.load(response.data);

    $(".editors-pick").each(function (i, element) {
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
            console.log("")
        if (title && link) {
            db.scrapedData.insert({
                title:title,
                link:link
            },
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else{
                    console.log(inserted);
                }
            });
        }
    });
    });

    res.send("Data Scrape is Complete! Reading is Fundamental");
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

// app.get("/scrape", function (req, res) {

// });

app.listen(3000, function() {
    console.log("App running on port: 3000!");
});