var fontSize = 15;
var width = 1400;
var height = 750;

var tree = d3.layout.tree()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");  // translate everting to the right in order to not cut off text

d3.json("progress.json", function(error, json) {
    var nodes = tree.nodes(json),
    links = tree.links(nodes);

    var link = svg.selectAll("path.link")
	.data(links)
	.enter().append("path")
	.attr("class", "link")
	.attr("d", diagonal);

    var node = svg.selectAll("g.node")
	.data(nodes)
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
	.on('click', function(d, i) {
            console.log(d.selected);
	    if (d.selected==2) { 
		d.selected = 0;
		d3.select(this).select("rect").attr("stroke", "green");
	    } else if (d.selected == 1) {
		d.selected = 2;
		d3.select(this).select("rect").attr("stroke", "yellow");
	    } else {
	    	d.selected = 1
	    	d3.select(this).select("rect").attr("stroke","red");
	    } })  

    node.append("rect")
	.attr("x", function(d) { return fontSize * -0.45 * d.name.length;})
	.attr("y", -1*fontSize)  // roughly center around text
	.attr("width", function(d) { return fontSize * 0.65 * d.name.length;})
	.attr("height", 2*fontSize)
	.attr("rx", 10)
	.attr("ry", 10)
        .attr("stroke", "black");

    node.append("text")
	.attr("font-size", fontSize + "px")
	.attr("dx", function(d) { return -2 * d.name.length; })
	.attr("dy", 3)  // centered vertically
	.attr("text-anchor", "middle")
	.text(function(d) { return d.name; });

});

d3.select(self.frameElement).style("height", height + "px");
