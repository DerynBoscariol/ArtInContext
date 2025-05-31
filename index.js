//Setting up application and requiring API files
const express = require("express");
const path = require("path");

const art = require("./modules/Art/api"); 
const facts = require("./modules/facts/api");

const app = express();
const port = process.env.PORT || 8888;

//Convert form data from query string format to JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Defining views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Setting up static files folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES

//Routing to index and sending list of artworks received from the AIC API
app.get("/", async (request, response) => {
    let artworkList = await art.getArtwork();
    //console.log(artworkList);
    response.render("index", { title: "Home", artworks: artworkList });
  });

//Routing to the details page of a single artwork, sending data on the piece from the AIC API, and sending a list of facts, from the Historical Facts API, from the year the artwork was finished
app.get("/details/:id/:year", async (request, response) => {
    let oneArtwork = await art.getSingleArtwork(request.params.id);
    let factList = await facts.getFacts(request.params.year);
    response.render("details", { title: oneArtwork.title, artwork: oneArtwork, yearFacts: factList });
  });

//Routing to the byYear page
app.get("/byYear", async (request,response) => {
  response.render("byYear", {title: "Browse Artwork By Year"});
});
/*
app.get("/yearlyArt", async (request, response) => {
  let year = request.body.year;
  let artList = await art.getArtByYear(year);
  response.render(`yearlyArt/${year}`, {title: "Browse Artwork by Year" + year, artworks: artList} )
}) */

//Posting year input submitted by the form on the byYear page and sending a list of artworks from that year to the yearlyArt page, which extends the byYear page
app.post("/byYear/submit", async (request, response) => {
  let inYear = request.body.year;
  let artList = await art.getArtByYear(inYear);
  response.render(`yearlyArt`, {title: "Browse Artwork from " + inYear, artworks: artList, year: inYear} )
});


//Setting up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });