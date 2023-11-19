import React, { useEffect, useState } from 'react';
import Graph from './Graph';

function BFS({
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
  const [edgesInBFS, setEdgesInBFS] = useState([]);

  const traverseBFS = () => {
    const graph = {};

    // Creating the graph data structure
    links.forEach(link => {
      graph[link.source] = graph[link.source] || [];
      graph[link.target] = graph[link.target] || [];
  
      graph[link.source].push(link.target);
      graph[link.target].push(link.source); // Assuming an undirected graph
    });

    const visited = {};
    const queue = [];

    queue.push(startNode);
    visited[startNode] = true;

    const visitedOrder = [];
    const edgesVisited = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visitedOrder.push(currentNode);

      if (graph[currentNode]) {
        for (const neighbor of graph[currentNode]) {
          if (!visited[neighbor]) {
            queue.push(neighbor);
            visited[neighbor] = true;
            edgesVisited.push(`edge${currentNode}-${neighbor}`);
          }
        }
      }
    }

    setVisitedNodes(visitedOrder);
    setEdgesInBFS(edgesVisited);
    console.log('Visited Nodes in BFS:', visitedOrder);
    console.log('Edges visited in BFS:', edgesVisited);
  };

  useEffect(() => {
    traverseBFS();
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
      edgesInBFS={edgesInBFS}
    />
  );
}

export default BFS;
