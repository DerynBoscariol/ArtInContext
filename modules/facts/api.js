const facts = "https://api.api-ninjas.com/v1/historicalevents"; //base url for requests to get histroical facts
const apiKey = "Hi8CK+zMRlKPUm1+HqcSUA==SWGuA4jykrvPtbGn";

//Function to receive historical facts per year submitted
async function getFacts(year){
    let reqUrl = `${facts}?year=${year}`;
    let response = await fetch(
        reqUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": apiKey
            }
        }
    );
    let respInfo = await response.json();
    return respInfo;
}

//Exporting the function
module.exports = {
    getFacts
}