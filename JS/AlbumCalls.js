import { getAccessToken } from "./MainCalls.js";

var access_token;

if(!access_token) 
    access_token = await getAccessToken();


export async function getAlbumTracks(albumIDs) {
    console.log(albumIDs);

    var url = 'https://api.spotify.com/v1/albums?ids=';
    
    url += albumIDs.join(",");

    const tracksResponse = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + access_token   
        }
    });

    var tracksData = await tracksResponse.json();

    return tracksData;
}