// Load data from CSV file
d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log(stateData);

    // log states
    var states = stateData.map(data => data.state);
    console.log("States", states);
    // Variables for chart
    var obesity = stateData.map(data => data.obesity);
    var poverty = stateData.map(data => data.poverty);


    // Create svg rectangle for chart
    var margin = {top: 30, right: 30, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
        .append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // Create axes
    var xScale = d3.scaleLinear()
        .domain([0, 50])
        .range([0, width])

    var yScale = d3.scaleLinear()
        .domain([0, 30])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // append to page
    svg.append("g")
        .selectAll("dot")
        .data(stateData)
        .enter()
        .append("circle")
            .attr("cx", function(stateData) { return xScale(stateData.obesity);})
            .attr("cy", function(stateData) { return yScale(stateData.poverty);})
            .attr("r", 10)
            .attr("fill", "blue")
            .attr("opacity", ".75")

    // Add datapoint labels (states)
    svg.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(function(d) { 
            return d.abbr;
        })
        .attr("x", function(d) {
            return xScale(d.obesity);
        })
        .attr("y", function(d) {
            return yScale(d.poverty);
        })
        .attr("font-family", "arial")
        .attr("font-size", "9px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")

    // Add label axes
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .text("Obesity (%)");

        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left - 35)
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .text("Poverty (%)");

    
});
