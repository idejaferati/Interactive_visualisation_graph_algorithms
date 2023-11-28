// GraphVisualization.jsx
import React, { useState, useEffect, useRef } from "react";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ClearButton from './ClearButton';
import BackButton from './BackButton';
import { renameEdge } from "./utils";
import EndNodeSelection from './EndNodeSelection';

function GraphVisualization({algorithm}) {
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [correctPath, setCorrectPath] = useState( ['edgenode1-node2', 'edgenode2-node4']);
  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('manual');
  const [correctSelectedEdges, setCorrectSelectedEdges] = useState([]);
  const [graphData, setGraphData] = useState({nodes: nodes1, links: links1});
  const [startNode, setStartNode] = useState(nodes1[0]?.id);
  const [endNode, setEndNode] = useState(nodes1[nodes1.length-1]?.id);
  
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
            endNode={endNode}
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
            correctPath={correctPath}
            setCorrectPath={setCorrectPath}       
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
            correctPath={correctPath}
            setCorrectPath={setCorrectPath} 
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
            correctPath={correctPath}
            setCorrectPath={setCorrectPath} 
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
              correctPath={correctPath}
              setCorrectPath={setCorrectPath} 
            />
          );
      default:
        return (
          <div>There is a problem with selection of algorithm</div>
        );
    }
  };

  const handleEdgeClick = (d) => {
    if (mode === "manual" && !steps.includes('Correct Path Selected!')) {
      // Handle edge click based on the selected algorithm
      // For example, call the corresponding function for Dijkstra or Kruskal or DFS or BFS
      const edgeId = d.target.id;
      const isSelected = selectedEdges.includes(edgeId);

      if (isSelected) {
        setSelectedEdges((prevSelectedPath) => prevSelectedPath.filter((id) => id !== edgeId));
        setCorrectSelectedEdges((prev) => prev.filter((id) => id !== edgeId));
      } else {
        setSelectedEdges((prevSelectedPath) => {
          // Ensure that the array length is less than 2
          if (prevSelectedPath.length >= 1) {
            // If it already has 2 elements, remove the first element
            return [...prevSelectedPath.slice(1), edgeId];
          } else {
            // If it has less than 2 elements, just add the new element
            return [...prevSelectedPath, edgeId];
          }
        });
      }
      

      if (correctPath.includes(edgeId) && !steps.includes("Correct Path Selected!")) {
        const pathIndex = correctPath.indexOf(edgeId);
        if (correctSelectedEdges.length === pathIndex) {
          setCorrectSelectedEdges((prevSelectedPath) => [...prevSelectedPath, edgeId]);
        } else {
          d3.select(`#${edgeId}`).transition()
          .duration(1000) // Duration for the color transition
          .ease(d3.easeLinear)
          .attr("stroke", "red");
          setSteps([...steps, `Edge ${renameEdge(edgeId, graphData.nodes)} was wrongly selected because the order is not correct.`]);
        }
      } else {
        d3.select(`#${edgeId}`).transition()
        .duration(1000) // Duration for the color transition
        .ease(d3.easeLinear)
        .attr("stroke", "red");
        setSteps([...steps, `Edge ${renameEdge(edgeId, graphData.nodes)} was wrongly selected.`]);
      }
    } else {
      console.log(`You are not allowed to interact with graph on auto mode. Clear Graph data if you want to restart.`);
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
  }, [correctSelectedEdges, correctPath, steps]);

  const handleMouseOverEdge = (event, d) => {
    if (mode === "manual" && !steps.includes('Correct Path Selected!')) {
      const edgeId = `edge${d.source}-${d.target}`;
      d3.select(`#${edgeId}`).transition()
      .duration(1000) // Duration for the color transition
      .ease(d3.easeLinear)
      .attr("stroke", correctSelectedEdges.includes(edgeId) ? "green" : "red");
    } else {
      console.log(`You are not allowed to interact with graph on auto mode. Clear Graph data if you want to restart.`);
    }
  };

  const handleMouseOutEdge = (event, d) => {
    if (mode === "manual" && !steps.includes('Correct Path Selected!')) {
      const edgeId = `edge${d.source}-${d.target}`;
      if (!selectedEdges.includes(edgeId)) {
        d3.select(`#${edgeId}`).transition()
        .duration(1000) // Duration for the color transition
        .ease(d3.easeLinear)
        .attr("stroke", (d) =>
          correctSelectedEdges.includes(edgeId) ? "green" : "gray"
        );
      } else {
        d3.select(`#${edgeId}`).transition()
        .duration(1000) // Duration for the color transition
        .ease(d3.easeLinear)
        .attr("stroke", correctSelectedEdges.includes(edgeId) ? "green" : selectedEdges.includes(edgeId) ? "red" : "gray");
      }
    } else {
      console.log(`You are not allowed to interact with graph on auto mode. Clear Graph data if you want to restart.`);
    }
  };

  useEffect(() => {
    if (mode === 'auto') {
      const edges = graphData.links.map((link) => `edge${link.source}-${link.target}`);
      let delay = 0;
  
      correctPath.forEach((edgeId) => {
        setTimeout(() => {
          if (edges.includes(edgeId)) {
            d3.select(`#${edgeId}`).transition()
            .duration(1000) // Duration for the color transition
            .ease(d3.easeLinear)
            .attr('stroke', 'green');
          } else {
            d3.select(`#${edgeId}`).transition()
            .duration(1000) // Duration for the color transition
            .ease(d3.easeLinear)
            .attr('stroke', 'gray');
          }
        }, delay * 2000); // Applying colors one by one with a delay
        delay++;
      });
    } else {
      d3.select("#graph-container svg").selectAll(".link line").attr("stroke", "gray");
    }
  }, [mode, graphData.links, correctPath, setCorrectSelectedEdges]);
  

  return (
    <div>
      <BackButton/>
      <Box
        sx={{
          display: 'flex',
          justifyContent:'space-around',
          gap: "15px"
        }}

      >
        
        {
          <Table sx={{ maxWidth: 500, maxHeight: 400, height: 100, width: 200, marginTop: "10px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3} style={{fontWeight: "bold"}}>
                  Correct Path table
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="right">Edges</TableCell>
                <TableCell align="right">Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { (steps.includes("Correct Path Selected!") || mode === 'auto')  && correctPath.map((row, index) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align="right">{renameEdge(row, graphData.nodes)}</TableCell>
                  <TableCell align="right">{
                    graphData.links.filter(e => {
                      const edge = row.replace("edge", "");
                      return e.source === edge.split("-")[0] && e.target === edge.split("-")[1];
                    })
                    .map(filteredEdge => filteredEdge.weight)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        <GraphAlgorithm />
        <div style={{width: "400px"}}>
          <h3>Information</h3>
          <ul style={{padding: "10px 28px", height: "300px", overflowY: "scroll", background: "whitesmoke"}}>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent:'space-around'
        }}
        style={{margin: "15px"}}
      >
        <AutoButton onAutoButtonClick={(mode) => {
          setCorrectSelectedEdges([]);
          setSelectedEdges([]);
          setMode(mode);          
          setSteps([`You are not allowed to interact with graph on auto mode. Clear Graph data if you want to restart.`]);
        }}/>
        <ClearButton onClearButtonClick={(mode) => {
          setMode(mode);
          setSteps([]);
          setCorrectSelectedEdges([]);
          setSelectedEdges([]);
        }}/>
        {
          algorithm !== "kruskal" && 
          <StartNodeSelection 
            selectedGraph={graphData.nodes} 
            onStartNodeSelect={(node) => {
              setStartNode( node );
            }} 
            disabledOptions={algorithm !== "djikstra" ? [] : [endNode]} 
          />
        }
        {
          algorithm === "djikstra" && 
          <EndNodeSelection 
            selectedGraph={graphData.nodes} 
            onEndNodeSelect={(node) => {
              setEndNode( node );
            }} 
            disabledOptions={[startNode]} 
          />
        }
        <GraphSelection 
          onGraphSelect={(nodes, links) => {
            setGraphData({ nodes, links });
          }} 
        />
      </Box>
    </div>
  );
}

export default GraphVisualization;
