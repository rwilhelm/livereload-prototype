window.onload = function() {
    var data = [40, 82, 51, 65, 20, 42];

    var w = 20,
        h = 80;

    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, w]);

    var y = d3.scale.linear()
        .domain([0, 100])
        .rangeRound([0, h]);

    var chart = d3.select("body").append("svg")
        .attr("class", "chart")
        .attr("width", w * data.length - 1)
        .attr("height", h);

    chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d, i) { return x(i) - .5; })
        .attr("y", function(d) { return h - y(d) - .5; })
        .attr("width", w)
        .attr("height", function(d) { return y(d); });

}
