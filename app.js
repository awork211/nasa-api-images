var express = require("express"),
    app     = express(),
    request = require("request");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.sol;
    var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + query + "&api_key=w79NEKE8I6Pra0OciNgJqskUi3q3DmXqfFr2tDHI";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running..");
});