import React, { useEffect, useState } from 'react';
import Graph from './Graph';

function DFS({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
  startNode,
}) {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [edgesInDFS, setEdgesInDFS] = useState([]);

  const traverseDFS = () => {
    const graph = {};

    // Creating the graph data structure
    links.forEach(link => {
      graph[link.source] = graph[link.source] || [];
      graph[link.target] = graph[link.target] || [];
  
      graph[link.source].push(link.target);
      graph[link.target].push(link.source); // Assuming an undirected graph
    });

    const visited = {};

    const dfsRecursive = (node, visitedOrder) => {
      visited[node] = true;
      visitedOrder.push(node);

      if (graph[node]) {
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            setEdgesInDFS(prevEdges => [...prevEdges, `edge${node}-${neighbor}`]);
            dfsRecursive(neighbor, visitedOrder);
          }
        }
      }
    };

    const visitedOrder = [];
    dfsRecursive(startNode, visitedOrder);

    setVisitedNodes(visitedOrder);
    console.log('Visited Nodes in DFS:', visitedOrder);
    console.log('Edges visited in DFS:', edgesInDFS);
  };

  useEffect(() => {
    traverseDFS();
  }, [startNode, links, nodes]);

  // Additional useEffect for selectedEdges, correctSelectedEdges

  return (
    <Graph
      nodes={nodes}
      links={links}
      selectedEdges={selectedEdges}
      correctSelectedEdges={correctSelectedEdges}
      onEdgeClick={onEdgeClick}
      onEdgeMouseOver={onEdgeMouseOver}
      onEdgeMouseOut={onEdgeMouseOut}
      visitedNodes={visitedNodes}
      edgesInDFS={edgesInDFS}
    />
  );
}

export default DFS;
