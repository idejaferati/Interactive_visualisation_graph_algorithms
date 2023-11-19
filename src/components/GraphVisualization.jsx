// GraphVisualization.jsx
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import GraphSelection from "./GraphSelection";
import Djikstra from "./Djikstra";
import Kruskal from "./Kruskal";
import DFS from "./DFS";
import BFS from "./BFS";
import Prim from "./Prim";
import { nodes1, links1 } from './GraphInit';
import StartNodeSelection from "./StartNodeSelection";
import AutoButton from "./AutoButton";
import { Box } from '@mui/material';

function GraphVisualization({algorithm}) {
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [correctPath, setCorrectPath] = useState( ['edgenode1-node2', 'edgenode2-node4']);
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('manual');
  const [correctSelectedEdges, setCorrectSelectedEdges] = useState([]);
  const [graphData, setGraphData] = useState({nodes: nodes1, links: links1});
  const [startNode, setStartNode] = useState('node1');
  

  useEffect(() => {
    const svg = d3
      .select("#graph-container")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    return () => {
      svg.selectAll("*").remove(); // Clean up on component unmount
    };
  }, []); // Empty dependency array to ensure this runs only once

  const GraphAlgorithm = () => {
    switch (algorithm) {
      case "djikstra":
        return (
          <Djikstra
            nodes={graphData.nodes}
            links={graphData.links}
            selectedEdges={selectedEdges}
            correctSelectedEdges={correctSelectedEdges}
            onEdgeClick={handleEdgeClick}
            onEdgeMouseOver={handleMouseOverEdge}
            onEdgeMouseOut={handleMouseOutEdge}
            startNode={startNode}
            correctPath={correctPath}
            setCorrectPath={setCorrectPath}
          />
        );
      case "kruskal":
        return (
          <Kruskal
            nodes={graphData.nodes}
            links={graphData.links}
            selectedEdges={selectedEdges}
            correctSelectedEdges={correctSelectedEdges}
            onEdgeClick={handleEdgeClick}
            onEdgeMouseOver={handleMouseOverEdge}
            onEdgeMouseOut={handleMouseOutEdge}
            startNode={startNode}         
          />
        );
      case "dfs":
        return (
          <DFS
            nodes={graphData.nodes}
            links={graphData.links}
            selectedEdges={selectedEdges}
            correctSelectedEdges={correctSelectedEdges}
            onEdgeClick={handleEdgeClick}
            onEdgeMouseOver={handleMouseOverEdge}
            onEdgeMouseOut={handleMouseOutEdge}
            startNode={startNode}
          />
        );
      case "bfs":
        return (
          <BFS
            nodes={graphData.nodes}
            links={graphData.links}
            selectedEdges={selectedEdges}
            correctSelectedEdges={correctSelectedEdges}
            onEdgeClick={handleEdgeClick}
            onEdgeMouseOver={handleMouseOverEdge}
            onEdgeMouseOut={handleMouseOutEdge}
            startNode={startNode}
          />
        );
      case "prim":
          return (
            <Prim
              nodes={graphData.nodes}
              links={graphData.links}
              selectedEdges={selectedEdges}
              correctSelectedEdges={correctSelectedEdges}
              onEdgeClick={handleEdgeClick}
              onEdgeMouseOver={handleMouseOverEdge}
              onEdgeMouseOut={handleMouseOutEdge}
              startNode={startNode}
            />
          );
      default:
        return (
          <div>There is a problem with selection of algorithm</div>
        );
    }
  };

  const handleEdgeClick = (d) => {
    // Handle edge click based on the selected algorithm
    // For example, call the corresponding function for Dijkstra or Kruskal or DFS or BFS
    const edgeId = d.target.id;
    const isSelected = selectedEdges.includes(edgeId);

    if (isSelected) {
      setSelectedEdges((prevSelectedPath) => prevSelectedPath.filter((id) => id !== edgeId));
      setCorrectSelectedEdges((prev) => prev.filter((id) => id !== edgeId));
    } else {
      setSelectedEdges((prevSelectedPath) => [...prevSelectedPath, edgeId]);
    }

    const isCorrectPath = correctPath.includes(edgeId);

    if (isCorrectPath) {
      setCorrectSelectedEdges((prevSelectedPath) => [...prevSelectedPath, edgeId]);
    } else {
      d3.select(`#${edgeId}`).attr("stroke", "red");
      setSteps([...steps, `Edge ${edgeId} was wrongly selected.`]);
    }
  };

  useEffect(()=> {
    if (correctSelectedEdges.length === correctPath.length && !steps.includes("Correct Path Selected!")) {
      const isCorrectOrder = correctSelectedEdges.every((edge, index) => edge === correctPath[index]);

      if (isCorrectOrder) {
        setSteps([...steps, "Correct Path Selected!"]);
        // Game Over
      } else {
        setCorrectSelectedEdges([]);
        setSelectedEdges([]);
        // Reset state if incorrect order
      }
    }
  }, [correctSelectedEdges, correctPath]);

  const handleMouseOverEdge = (event, d) => {
    const edgeId = `edge${d.source}-${d.target}`;
    d3.select(`#${edgeId}`).attr("stroke", correctSelectedEdges.includes(edgeId) ? "green" : "red");
  };

  const handleMouseOutEdge = (event, d) => {
    const edgeId = `edge${d.source}-${d.target}`;
    if (!selectedEdges.includes(edgeId)) {
      d3.select(`#${edgeId}`).attr("stroke", (d) =>
        correctSelectedEdges.includes(edgeId) ? "green" : "gray"
      );
    } else {
      d3.select(`#${edgeId}`).attr("stroke", correctSelectedEdges.includes(edgeId) ? "green" : selectedEdges.includes(edgeId) ? "gray" : "red");
    }
  };

  useEffect(() => {
    if ( mode === 'auto' ) {
      const edges = graphData.links.map((link) => `edge${link.source}-${link.target}`);

      edges.forEach((edgeId, index) => {
        setTimeout(() => {
          if (correctPath.includes(edgeId)) {
            d3.select(`#${edgeId}`).attr("stroke", "green");
          } else {
            d3.select(`#${edgeId}`).attr("stroke", "gray");
          }
        }, index * 1000); // Applying colors one by one with a delay of 1 seconds
      });  
      setTimeout(()=> {setMode('manual'); console.log('manual')}, 7000);
    }
  }, [mode, graphData.links, correctSelectedEdges]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent:'space-around'
        }}
      >
        <GraphAlgorithm />
        <div style={{width: "400px"}}>
          <h3>Information:</h3>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent:'space-between'
        }}
      >
        <AutoButton onAutoButtonClick={(mode) => setMode(mode)}/>
        <StartNodeSelection onStartNodeSelect={(node) => setStartNode( node )} />
        <GraphSelection onGraphSelect={(nodes, links) => setGraphData({ nodes, links })} />
      </Box>
    </div>
  );
}

export default GraphVisualization;
