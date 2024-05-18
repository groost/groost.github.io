import { getAccessToken } from "./MainCalls.js";
import { getSongDetails } from "./SongCalls.js";

var access_token;

if(!access_token) 
    access_token = await getAccessToken();

export async function getPlaylist(id) {
    var offset = 0;
    var retData = []; 
    while(true) {
        var songIDs = [];
        var url = 'https://api.spotify.com/v1/playlists/' + id + "/tracks?offset=" + offset;
        
        
        const playlistResponse = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + access_token
            }
        });
        
        var playlistData = await playlistResponse.json();
        playlistData = playlistData['items'];
        
        // console.log(playlistData);
        
        for(var track of playlistData) {
            if(!track['track'])
                continue;
            var diction = {'trackName': track['track']['name'], 'artistName': track['track']['artists'][0]['name'], 'albumName': track['track']['album']['name'], 'imageurl': track['track']['album']['images'][0]['url']};
            retData.push(diction);
            songIDs.push(track['track']['id']);
        }
        
        var songDetails = await getSongDetails(songIDs);
        for(var i = 0, j = offset; i < songIDs.length; i++, j++) {
            retData[j]['acousticness'] = songDetails[i]['acousticness'];
            retData[j]['danceability'] = songDetails[i]['danceability'];
            retData[j]['energy'] = songDetails[i]['energy'];
            retData[j]['instrumentalness'] = songDetails[i]['instrumentalness'];
            retData[j]['liveness'] = songDetails[i]['liveness'];
            retData[j]['loudness'] = songDetails[i]['loudness'];
            retData[j]['speechiness'] = songDetails[i]['speechiness'];
            retData[j]['tempo'] = songDetails[i]['tempo'];
            retData[j]['key'] = songDetails[i]['key'];
            retData[j]['mode'] = songDetails[i]['mode'];
        }

        if(playlistData.length < 100) {
            break;
        }

        offset += 100;
    }
    return retData;
}