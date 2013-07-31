window.onload = function() {
    var dataSet = [
            {
                "legend": "1",
                "data": [
                    { "title": "Unit 1", "value": 72 },
                    { "title": "Unit 2", "value": 91 },
                    { "title": "Unit 3", "value": 45 },
                    { "title": "Unit 4", "value": 28 },
                    { "title": "Unit 5", "value": 56 }
                ]
            },
            {
                "legend": "2",
                "data": [
                    { "title": "Unit 1", "value": 92 },
                    { "title": "Unit 2", "value": 24 },
                    { "title": "Unit 3", "value": 56 },
                    { "title": "Unit 4", "value": 76 },
                    { "title": "Unit 5", "value": 85 }
                ]
            }
        ];

    var data = dataSet[0]["data"],
        data2 = dataSet[1]["data"];

    var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain(data.map(function (d) { return d.title; }))
        .rangeRoundBands([0, width], 0.5, 0.3);

    var y = d3.scale.linear()
        .domain([0, 100])
        .rangeRound([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(1)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(1)
        .ticks(5)
        .tickFormat(function (d) { return d + '%' });

    <!-- draw skeleton -->
    var chart = d3.select("body").append("svg")
        .attr("class", "chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    <!-- draw x-axis -->
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    <!-- draw y-axis -->
    chart.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y" , 15)
        .style("text-anchor", "end")
        .text("Percentage");

    <!-- draw bars -->
    chart.selectAll()
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.title); })
        .attr("width", x.rangeBand()/1)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

    <!-- draw labels -->
    chart.selectAll().append("labels")
        .data(data.map(function(d) { return d.value; }))
        .enter().append("text")
        .attr("class", "chart-label")
        .attr("x", x)
        .attr("y", y)
        .attr("dx", (x.rangeBand() / 2) / 1 )
        .attr("text-anchor", "middle")
        .attr("dy", 15)
        .text(String);
}
