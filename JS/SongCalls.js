var access_token;
import { getAccessToken } from './MainCalls.js';
if(!access_token)
    access_token = await getAccessToken();

export async function getSongDetails(songIDs) {
    // console.log(songIDs);
    const detailResponse = await fetch("https://api.spotify.com/v1/audio-features?ids=" + songIDs, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + access_token
        }
    });

    // await sleep(250);

    const detailData = await detailResponse.json();
    
    var retArr = [];
    for(var a of detailData['audio_features']) 
        if(a) 
            retArr.push(a);
            // retArr.push([a['acousticness'], a['danceability'], a['energy'], a['instrumentalness'], a['liveness'], a['loudness'], a['speechiness'], a['tempo']]);

            
    return retArr;
}