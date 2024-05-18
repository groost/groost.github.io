var access_token;

export async function getAccessToken() {
    const client_id = "38dea9d3a01744aea205b2d60761f2f9";
    const client_secret = "55e266eea7494b12a279e1e1586adec9";
    // const client_id = 'e1518d54f8ab43f9bdc00c12b841aede';
    // const client_secret = 'a4dcd6e9cbfa4fde9737ff74011a7f1b';

    const url = "https://accounts.spotify.com/api/token";

    const accessTokenResponse = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type'  : 'application/x-www-form-urlencoded',
            'Authorization' : "Basic " + btoa(client_id + ":" + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    const accessTokenData = await accessTokenResponse.json();
    return access_token = accessTokenData.access_token;   
}