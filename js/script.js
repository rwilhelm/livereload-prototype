/* global d3 */
window.onload = function () {
    'use strict';

    var data = [4, 8, 15, 16, 23, 42];

    var chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", 420)
    .attr("height", 20 * data.length)
    .append("g")
    .attr("transform", "translate(10, 15)");

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    var y = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, 120]);
    
    chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", y)
        .attr("width", x)
        .attr("height", y.rangeBand());

    chart.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(String);

};
