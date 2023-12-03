import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Graph({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
  hideWeights,
  isDirected
}) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current)
        .attr("width", 900)
        .attr("height", 500);

    return () => {
        svg.selectAll("*").remove(); // Clean up on component unmount
    };
  }, []); // Empty dependency array to ensure this runs only once
    
  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Links
    const linkGroup = svg.selectAll(".link")
      .data(links)
      .enter().append("g")
      .attr("class", "link");
    
    const lines = linkGroup.append("line")
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

    if (isDirected) {
      // Append arrow markers for directed edges
      const arrowMarkers = svg.append("defs");

      // Define the default arrow marker
      arrowMarkers.append('marker')
        .attr('id', 'arrowgray')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 13.5)
        .attr('refY', 0)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('class', 'arrowHead')
        .style('fill', 'gray');

      // Define the green arrow marker
      arrowMarkers.append('marker')
        .attr('id', 'arrowgreen')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 13.5)
        .attr('refY', 0)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('class', 'arrowHead')
        .style('fill', 'green');

      // Define the red arrow marker
      arrowMarkers.append('marker')
        .attr('id', 'arrowred')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 13.5)
        .attr('refY', 0)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('class', 'arrowHead')
        .style('fill', 'red');


      lines.attr('marker-end', 'url(#arrowgray)');
    }

    if (!hideWeights) {
      linkGroup.append("text")
      .attr("x", d => (getNodePosition(d.source).x + getNodePosition(d.target).x) / 2 + 8)
      .attr("y", d => (getNodePosition(d.source).y + getNodePosition(d.target).y) / 2 + 15)
      .attr("text-anchor", "middle")
      .style("fill", "blue")
      .text(d => d.weight);
    }
    

    // Nodes
    const nodeGroup = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodeGroup.append("circle")
      .attr("r", 15)
      .attr("fill", "blue");

    nodeGroup.append("text")
      .attr("dy", 4)
      .attr("dx", 0.5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
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
    const svg = d3.select(svgRef.current);

    // Update link colors
    svg
      .selectAll(".link line")
      .attr("stroke", (d) => {
        const edgeId = `edge${d.source}-${d.target}`;
        return correctSelectedEdges.includes(edgeId) ? "green" : (selectedEdges.includes(edgeId) ? "red" : "gray");
      });

    if (isDirected) {
      svg.selectAll(".link line").attr("marker-end", (d) => {
        const edgeId = `edge${d.source}-${d.target}`;
        return correctSelectedEdges.includes(edgeId) ? 'url(#arrowgreen)' : 'url(#arrowgray)';
      });
    }

    return () => {
      // Reset link colors on unmount
      svg.selectAll(".link line").attr("stroke", "gray");
      if (isDirected) {
        svg.selectAll(".link line").attr("marker-end", "url(#arrowgray)");
      }
    };
  }, [selectedEdges, correctSelectedEdges]);

  return <div id="graph-container" style={{ height: "500px", width: "900px" }}><svg ref={svgRef}></svg></div>;
}

export default Graph;