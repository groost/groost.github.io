import { getAlbumTracks } from "./AlbumCalls.js";
import { getTracks } from "./SearchCalls.js";
import { getSongDetails } from "./SongCalls.js";

export async function parseAlbums(albums) {
    var data = [];
    var ids = [];
    for(var i = 0; i < albums.length; i++) {
        var subData = {};
        
        //Add general data
        subData["artistName"] = albums[i]['artists'][0]['name'];
        subData['imageurl'] = albums[i]['images'][0]['url'];
        subData['albumName'] = albums[i]['name'];
        subData['releaseDate'] = albums[i]['release_date'];
        subData['spotifyURL'] = albums[i]['external_urls']['spotify'];
        subData['id'] = albums[i]['id'];
        ids.push(subData['id']);

        data.push(subData);
    }

    var albumData = await getAlbumTracks(ids);
    albumData = albumData['albums'];

    for(var i = 0; i < albumData.length; i++) {
        var trackData = [];
        var trackIds = [];
        for(var j = 0; j < albumData[i]['tracks']['items'].length; j++) {
            var subTrackData = {};

            subTrackData['trackName'] = albumData[i]['tracks']['items'][j]['name'];
            subTrackData['id'] = albumData[i]['tracks']['items'][j]['id'];
            trackIds.push(subTrackData['id']);
            subTrackData['spotifyURL'] = albumData[i]['tracks']['items'][j]['external_urls']['spotify'];
            // console.log(subTrackData);
            trackData.push(subTrackData);
        }

        var resultDetails = await getSongDetails(trackIds);
        var popData = await getTracks(trackIds);

        for(var j = 0; j < resultDetails.length; j++) {
            trackData[j]['acousticness'] = resultDetails[j]['acousticness'];
            trackData[j]['danceability'] = resultDetails[j]['danceability'];
            trackData[j]['energy'] = resultDetails[j]['energy'];
            trackData[j]['instrumentalness'] = resultDetails[j]['instrumentalness'];
            trackData[j]['liveness'] = resultDetails[j]['liveness'];
            trackData[j]['loudness'] = resultDetails[j]['loudness'];
            trackData[j]['speechiness'] = resultDetails[j]['speechiness'];
            trackData[j]['tempo'] = resultDetails[j]['tempo'];
            trackData[j]['key'] = resultDetails[j]['key'];
            trackData[j]['mode'] = resultDetails[j]['mode'];
            trackData[j]['valence'] = resultDetails[j]['valence'];
            trackData[j]['popularity'] = popData['tracks'][j]['popularity'] / 100.0;
        }

        data[i]['trackData'] = trackData;
    }
    
    console.log(data);
    return data;
}

export async function parseSongs(albumData) {
    // albumData = albumData[0]['trackData'];
    var results = [];
    
    for(var i = 0; i < albumData.length; i++) {
        for(var j = 0; j < albumData[i]['trackData'].length; j++) {
            var diction = {
                'trackName': albumData[i]['trackData'][j]['trackName'], 
                'artistName': albumData[i]['artistName'], 
                'albumName': albumData[i]['albumName'], 
                'imageurl': albumData[i]['imageurl'],
                'acousticness': albumData[i]['trackData'][j]['acousticness'],
                'danceability': albumData[i]['trackData'][j]['danceability'],
                'energy': albumData[i]['trackData'][j]['energy'],
                'instrumentalness': albumData[i]['trackData'][j]['instrumentalness'],
                'liveness': albumData[i]['trackData'][j]['liveness'],
                'loudness': albumData[i]['trackData'][j]['loudness'],
                'speechiness': albumData[i]['trackData'][j]['speechiness'],
                'tempo': albumData[i]['trackData'][j]['tempo'],
                'key': albumData[i]['trackData'][j]['key'],
                'mode': albumData[i]['trackData'][j]['mode'],
                'valence': albumData[i]['trackData'][j]['valence'],
                'popularity': albumData[i]['trackData'][j]['popularity']
            };

            results.push(diction);
        }
    }

    return results;
}

export function getGraphValues(data, typeToSearch) {
    // console.log(data);
    var xVals = [];
    var names = [];
    var artistNames = [];
    var imageURLs = [];
    for(var i = 0; i < data.length; i++) {
        xVals.push(data[i][typeToSearch]);
        names.push(data[i]['trackName']);
        artistNames.push(data[i]['artistName'])
        imageURLs.push(data[i]['imageurl']);
    }
    
    // console.log(imageURLs);
    var countsAndNames = {};

    for(var i = 0; i < xVals.length; i++) {
        var rounded = Math.round(xVals[i] / 0.05) * 0.05;
        var roundedKey = rounded.toFixed(2); // Convert to string for a consistent key format
        
        if (!countsAndNames[roundedKey]) {
            countsAndNames[roundedKey] = { count: 0, trackNames: [], artistNames: [], imageurls: []};
        }
        
        countsAndNames[roundedKey].count++;
        countsAndNames[roundedKey].trackNames.push(names[i]);
        countsAndNames[roundedKey].artistNames.push(artistNames[i]);
        countsAndNames[roundedKey].imageurls.push(imageURLs[i]);
    }

    return countsAndNames;
}

export function getPieChartKeys(resultData) {
    // console.log(resultData);
    const pitchClasses = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var diction = {data: new Array(pitchClasses.length).fill(0), labels: pitchClasses, trackNames: {}, artistNames: {}, imageurls: {}};
    
    // console.log(resultData);
    for (var i = 0; i < resultData.length; i++) {
        diction.data[resultData[i]['key']] += 1;
        if(!diction.trackNames[pitchClasses[resultData[i]['key']]]) {
            diction.trackNames[pitchClasses[resultData[i]['key']]] = [];
            diction.artistNames[pitchClasses[resultData[i]['key']]] = [];
            diction.imageurls[pitchClasses[resultData[i]['key']]] = [];
        }

        diction.trackNames[pitchClasses[resultData[i]['key']]].push(resultData[i]['trackName']);
        diction.artistNames[pitchClasses[resultData[i]['key']]].push(resultData[i]['artistName']);
        diction.imageurls[pitchClasses[resultData[i]['key']]].push(resultData[i]['imageurl']);
    }

    // console.log(diction);
    return diction
}

export function getPieChartModes(data) {
    const labels = ['minor', 'major'];
    var diction = {data: new Array(labels.length).fill(0), labels: labels, trackNames: {}, artistNames: {}, imageurls: {}};
    
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        diction.data[data[i]['mode']] += 1;
        if(!diction.trackNames[labels[data[i]['mode']]]) {
            diction.trackNames[labels[data[i]['mode']]] = [];
            diction.artistNames[labels[data[i]['mode']]] = [];
            diction.imageurls[labels[data[i]['mode']]] = [];
        }

        diction.trackNames[labels[data[i]['mode']]].push(data[i]['trackName']);
        diction.artistNames[labels[data[i]['mode']]].push(data[i]['artistName']);
        diction.imageurls[labels[data[i]['mode']]].push(data[i]['imageurl']);
    }

    // console.log(diction);
    return diction
}