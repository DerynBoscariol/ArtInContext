
const art = "https://api.artic.edu/api/v1"; //base URL for any AIC API requests


//Functions for Art Institute of Chicago API requests.

//Function to get a list of all artworks in the public domain, limited to 52
async function getArtwork(){
    let reqUrl = `${art}/artworks?[is_public_domain]=true&limit=52&page=1`; 
    let response = await fetch(
        reqUrl, 
        {
        method: "get",
        headers:{
            "Content-Type": "application/json" 
            }
        }
    );
    let respInfo = await response.json();

    return respInfo.data;
}

//Function to get data one artwork by it's id
async function getSingleArtwork(id) {
    let reqUrl = `${art}/artworks/${id}`;
    let response = await fetch(
        reqUrl,
        {
            method: "get", 
            headers: {
                "Content-Type": "application/json"

            }
        }
    );
    let respInfo = await response.json();

    return respInfo.data;
}

//Function to get info from the listed fields about each artwork from a submitted year, limited to 52
async function getArtByYear(year) {
    let fields = "id,title,artist_title,artist_display,date_display,image_id,date_end,thumbnail,date_qualifier_title"
    let reqUrl = `${art}/artworks/search?fields=${fields}&query[term][date_end]=${year}&[is_public_domain]=true&limit=52&page=1`
    let response = await fetch(
        reqUrl, 
        {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    let respInfo = await response.json();
    //console.log(response);
    return respInfo.data;
}


//Exporting functions
module.exports = {
    getArtwork,
    getSingleArtwork,
    getArtByYear
}