import React, { useEffect } from "react";
import * as d3 from "d3";

function Graph({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
}) {

  useEffect(() => {
    const svg = d3.select("#graph-container svg")
        .attr("width", 900)
        .attr("height", 500);

    return () => {
        svg.selectAll("*").remove(); // Clean up on component unmount
    };
  }, []); // Empty dependency array to ensure this runs only once
    
  useEffect(() => {
    const svg = d3.select("#graph-container svg");

    // Links
    const linkGroup = svg.selectAll(".link")
      .data(links)
      .enter().append("g")
      .attr("class", "link");

    linkGroup.append("line")
      .attr("x1", d => getNodePosition(d.source).x)
      .attr("y1", d => getNodePosition(d.source).y)
      .attr("x2", d => getNodePosition(d.target).x)
      .attr("y2", d => getNodePosition(d.target).y)
      .attr("stroke", d => {
        const edgeId = `edge${d.source}-${d.target}`;
        return correctSelectedEdges.includes(edgeId) ? "green" : "gray";
      })
      .attr("stroke-width", 8)
      .on("click", onEdgeClick)
      .on("mouseover", onEdgeMouseOver)
      .on("mouseout", onEdgeMouseOut)
      .attr("id", d => `edge${d.source}-${d.target}`)
      .style("cursor", "pointer");

    linkGroup.append("text")
      .attr("x", d => (getNodePosition(d.source).x + getNodePosition(d.target).x) / 2 +8)
      .attr("y", d => (getNodePosition(d.source).y + getNodePosition(d.target).y) / 2 +15)
      .attr("text-anchor", "middle")
      .text(d => d.weight);

    // Nodes
    const nodeGroup = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodeGroup.append("circle")
      .attr("r", 20)
      .attr("fill", "blue");

    nodeGroup.append("text")
      .attr("dy", -22)
      .attr("dx", -10)
      .attr("text-anchor", "middle")
      .text(d => d.label);
      
    function getNodePosition(nodeId) {
      const node = nodes.find((n) => n.id === nodeId);
      return { x: node.x || 0, y: node.y || 0 };
    }

    return () => {
        svg.selectAll("*").remove(); // Clean up on component unmount
    };
  }, [nodes, links, selectedEdges, correctSelectedEdges, onEdgeClick, onEdgeMouseOver, onEdgeMouseOut]);

  useEffect(() => {
    const svg = d3.select("#graph-container svg");

    // Update link colors
    svg
      .selectAll(".link")
      .attr("stroke", (d) => {
        const edgeId = `edge${d.source}-${d.target}`;
        return selectedEdges.includes(edgeId) ? "red" : correctSelectedEdges.includes(edgeId) ? "green" : "gray";
      });

    return () => {
      // Reset link colors on unmount
      svg.selectAll(".link").attr("stroke", "gray");
    };
  }, [selectedEdges, correctSelectedEdges]);

  return <div id="graph-container" style={{ height: "500px", width: "900px" }}><svg></svg></div>;
}

export default Graph;
