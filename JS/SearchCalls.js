import { getAccessToken } from "./MainCalls.js";

var access_token;

if(!access_token) 
    access_token = await getAccessToken();

export async function searchGeneral(data, types) {
    var url = "https://api.spotify.com/v1/search?q=";
    var cnt = 1;
    if(data['songName']) {
        url += "track:" + encodeURIComponent(data['songName']);
        if(data['artistName']) {
            url += "%20";
            cnt++;
        }
    }
    if(data['artistName']) {
        url += "artist:" + encodeURIComponent(data['artistName']);
        if(data['album']) 
            url += "%20";
        // if(data.length > cnt) {
        //     url += "&";
        //     cnt++;
        // }
    }
    if(data['album']) {
        url += "album:" + encodeURIComponent(data['album']);
    }
    
    console.log(url);
    console.log(types);
    //TO-DO Genre, year

    url += "&type=";
    for(var i = 0; i < types.length-1; i++) {
        url += types[i] + ',';
    }
    url += types[types.length - 1];

    const response = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + access_token
        }
    });

    const data1 = await response.json();
    console.log(data1);
    return data1;
}

export async function searchRecommendations(reqData, otherData) {
    var url = "https://api.spotify.com/v1/recommendations?" + encodeURIComponent(reqData[0]['type']) + "=" + encodeURIComponent(reqData[0]['rating']);
    for(var i = 0; i < reqData.length; i++) {
        url += "&" + encodeURIComponent(reqData[i]['type']) + "=" + encodeURIComponent(reqData[i]['rating']);
        // if(data[i]['type'] === 'songID') {
        //     url +=
        // }
    }

    for(var i = 0; i < otherData.length; i++) {
        url += "&" + encodeURIComponent("target_" + otherData[i]['type']) + "=" + encodeURIComponent(otherData[i]['rating']);
    }
    
    const response = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + access_token
        }
    });

    return await response.json();
}

export async function getID(data, type) {
    var url = "https://api.spotify.com/v1/search?q=";

    if(data['songName']) {
        url += "track:" + encodeURIComponent(data['songName']);
        if(data['artistName']) {
            url += "%20";
        }
    }
    if(data['artistName']) {
        url += "artist:" + encodeURIComponent(data['artistName']);
        if(data['album']) 
            url += "%20";
        // if(data.length > cnt) {
        //     url += "&";
        //     cnt++;
        // }
    }
    if(data['album']) {
        url += "album:" + encodeURIComponent(data['album']);
    }
    
    url += "&type=" + type;
    const response = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + access_token
        }
    });

    const data1 = await response.json();
    console.log(data1);
    if(type === 'artist') 
        return data1['artists']['items'][0]['id'];
    else 
        return data1['tracks']['items'][0]['id'];
}

export async function getTracks(ids) {
    var url = "https://api.spotify.com/v1/tracks?ids=" + encodeURIComponent(ids[0]);
    for(var i = 1; i < ids.length; i++) {
        url += "," + encodeURIComponent(ids[i]);
    }

    const response = await fetch(url, {
        headers: {
            'Authorization': "Bearer " + access_token
        }
    });

    return await response.json();
}