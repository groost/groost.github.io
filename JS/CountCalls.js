import { getGraphValues } from './ParseCalls.js';

export function createResultData() {
    var resultData = {};
    for(var i = 0; i <= 1; i += 0.05) {
        i = Math.round(i * 100) / 100;
        resultData[i] = {
            counts: [],
            trackIDs: [],
            trackNames: [],
            artistNames: [],
            imageurls: []
        };
    }

    return resultData;
}

export function addCounts(data, typeToSearch, resultData) {
    var graphValues = getGraphValues(data, typeToSearch);
    // console.log(graphValues);

    var multiples = [];
    var counts = [];
    var names = {};

    Object.keys(graphValues).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(key => {
        // console.log(key);
        multiples.push(parseFloat(key)); // Ensure the key is converted back to float for graphing
        counts.push(graphValues[key].count);
        names[parseFloat(key)] = [graphValues[key].trackNames, graphValues[key].artistNames, graphValues[key].imageurls, graphValues[key].trackIDs];
    });

    // console.log(names);
    // console.log(resultData);
    // console.log(counts);

    for(var i = 0; i < multiples.length; i++) {
        // console.log(multiples[i]);

        resultData[multiples[i]].counts.push(counts[i]);
        resultData[multiples[i]].trackNames.push(names[multiples[i]][0]);
        resultData[multiples[i]].artistNames.push(names[multiples[i]][1]);
        resultData[multiples[i]].imageurls.push(names[multiples[i]][2]);
        resultData[multiples[i]].trackIDs.push(names[multiples[i]][3]);

    }

    return resultData;
}

export function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}      
