export function createBarChart(data, chartName) {
    const container = document.querySelector('.container');
    let canvas = document.getElementById(chartName);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = chartName;
        canvas.style = "width:50%;max-width:350px";
        container.appendChild(canvas);
    }
    
    // Destroy existing chart instance if it exists

    // Initialize the chart on the new canvas
    const ctx = canvas.getContext('2d');
    const colors = data.labels.map(() => getRandomColor()); // Generating a random color for each segment
    keyBarChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.labels,
            datasets: [{
                backgroundColor: colors,
                borderColor: 'white',
                data: data.data
            }]
        },
        options: {}
    });

    canvas.onclick = (evt) => {
        const points = keyBarChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if(points[0]) {
            var index = points[0]._index;
            populateTable(data.trackNames[data.labels[index]], data.artistNames[data.labels[index]], data.imageurls[data.labels[index]]);
        }
    };
}

export function createPieChart(data, chartName) {
    const container = document.querySelector('.container');
    let canvas = document.getElementById(chartName);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = chartName;
        canvas.style = "width:50%;max-width:350px";
        container.appendChild(canvas);
    }
    
    // Destroy existing chart instance if it exists

    // Initialize the chart on the new canvas
    const ctx = canvas.getContext('2d');
    const colors = data.labels.map(() => getRandomColor()); // Generating a random color for each segment
    modePieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: data.labels,
            datasets: [{
                backgroundColor: colors,
                borderColor: 'white',
                data: data.data
            }]
        },
        options: {}
    });

    canvas.onclick = (evt) => {
        const points = modePieChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if(points[0]) {
            var index = points[0]._index;
            // if(chartName === 'keyPieChart') {
            populateTable(data.trackNames[data.labels[index]], data.artistNames[data.labels[index]], data.imageurls[data.labels[index]]);
            // }
        }
    };
}

          

export function populateTable(songNames, artistNames, imageurls) {
    var table = document.querySelector("#songTable tbody");
    table.innerHTML = "<tr><th>Song Name</th><th>Artist Name</th><th>Album Art/Spotify Link</th></tr>";

    for(var i = 0; i < songNames.length; i++) {
        var row = document.createElement("tr");

        var songBox = document.createElement("td");
        var artistName = document.createElement("td");
        var imageBox = document.createElement("td");

        songBox.innerHTML = songNames[i];
        artistName.innerHTML = artistNames[i];

        var image = document.createElement('img');
        image.src = imageurls[i];
        imageBox.appendChild(image);

        row.appendChild(songBox);
        row.appendChild(artistName);
        row.appendChild(imageBox);

        // name.innerHTML = graphValues[label].names[i];

        table.appendChild(row);
    }
}