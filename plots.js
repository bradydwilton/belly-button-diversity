function init() {

    // set 'selector' variable equal to drowdownMenu html tag (<select/>)
    var selector = d3.select('#selDataset');

    // read in samples.json from local directory
    d3.json('samples.json').then((data) => {

        // print data to log
        console.log(data);

        // set 'sampleNames' variable equal to an array of the names from the data
        var sampleNames = data.names;

        // append name property of each data point to 'selector' var (assigned to dropdownMenu tag (id='selDataset'))
        sampleNames.forEach((sample) => {

            selector

                // append <option/> into tag stored in 'selector' variable
                .append('option')

                // set text of <option/> to the current sample
                .text(sample)

                // give <option/> a property value='sampleName'
                .property('value', sample);
        });
    })
}

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function buildMetadata(sample) {
    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select('#sample-metadata');

        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append('h6').text(key.toUpperCase() + ': ' + value);
        })
    });
}




init();