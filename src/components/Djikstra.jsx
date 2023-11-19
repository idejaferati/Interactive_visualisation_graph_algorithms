import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { useMemo } from 'react';

function Djikstra({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
  startNode,
  correctPath,
  setCorrectPath,
}) {
  const endNode = 'node4';
  const [shortestPath, setShortestPath] = useState([]);

  const findShortestPath = () => {
    const graph = {};

    // Creating the graph data structure
    links.forEach(link => {
      graph[link.source] = graph[link.source] || {};
      graph[link.target] = graph[link.target] || {};
  
      graph[link.source][link.target] = link.weight;
      graph[link.target][link.source] = link.weight; // Assuming an undirected graph
    });
  
    const distances = {};
    const visited = {};
    const parents = {};
  
    for (let node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
  
    while (true) {
      let minDistance = Infinity;
      let closestNode = null;
  
      for (let node in distances) {
        if (!visited[node] && distances[node] < minDistance) {
          minDistance = distances[node];
          closestNode = node;
        }
      }
  
      if (closestNode === null || closestNode === endNode) {
        break;
      }
  
      visited[closestNode] = true;
  
      for (let neighbor in graph[closestNode]) {
        let distance = distances[closestNode] + graph[closestNode][neighbor];
  
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          parents[neighbor] = closestNode;
        }
      }
    }
  
    // Reconstructing the path
    if (distances[endNode] !== Infinity) {
      let tempNode = endNode;
      const formattedPath = [];
  
      while (tempNode !== startNode) {
        const parentNode = parents[tempNode];
        formattedPath.unshift(`edge${parentNode}-${tempNode}`);
        tempNode = parentNode;
      }
  
      // Set the shortest path to your desired output
      return formattedPath;
        
    } else {
      console.log("No valid path exists between the nodes.");
      // Handle the scenario where no valid path is found
      return [];
    }
  };

  const memoizedShortestPath = useMemo(() => findShortestPath(), [startNode, links, nodes, endNode]);

  useEffect(() => {
    setShortestPath(memoizedShortestPath);
    if (memoizedShortestPath.join(',') !== correctPath.join(',')) {
      setCorrectPath(memoizedShortestPath);
    }
    
  }, [startNode, links, nodes, endNode]);


  return (
    <Graph
      nodes={nodes}
      links={links}
      selectedEdges={selectedEdges}
      correctSelectedEdges={correctSelectedEdges}
      onEdgeClick={onEdgeClick}
      onEdgeMouseOver={onEdgeMouseOver}
      onEdgeMouseOut={onEdgeMouseOut}
    />
  );
}

export default Djikstra;
