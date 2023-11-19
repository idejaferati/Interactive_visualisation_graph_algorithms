import React, { useEffect, useState } from 'react';
import Graph from './Graph';

function Prim({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
  startNode,
}) {
  const [minimumSpanningTree, setMinimumSpanningTree] = useState([]);

  const findMinimumSpanningTree = () => {
    const graph = {};

    // Creating the graph data structure
    links.forEach(link => {
      graph[link.source] = graph[link.source] || {};
      graph[link.target] = graph[link.target] || {};
  
      graph[link.source][link.target] = link.weight;
      graph[link.target][link.source] = link.weight; // Assuming an undirected graph
    });

    const visited = {};
    const minDistances = {};

    nodes.forEach(node => {
      minDistances[node] = Infinity;
    });

    minDistances[startNode] = 0;

    const selectedEdges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      let minNode = null;

      // Find the vertex with the minimum distance among unvisited nodes
      for (const node of nodes) {
        if (!visited[node] && (minNode === null || minDistances[node] < minDistances[minNode])) {
          minNode = node;
        }
      }

      visited[minNode] = true;

      // Update the minimum distances and selected edges
      for (const node in graph[minNode]) {
        if (graph[minNode][node] < minDistances[node] && !visited[node]) {
          minDistances[node] = graph[minNode][node];
          selectedEdges.push(`edge${minNode}-${node}`);
        }
      }
    }

    setMinimumSpanningTree(selectedEdges);
    console.log('Minimum Spanning Tree:', selectedEdges);
  };

  useEffect(() => {
    findMinimumSpanningTree();
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
      minimumSpanningTree={minimumSpanningTree}
    />
  );
}

export default Prim;
