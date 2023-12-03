import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { reorderEdgeNode } from './utils';

function BFS({
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
  isDirected
}) {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [edgesInBFS, setEdgesInBFS] = useState([]);

  const traverseBFS = () => {
    const graph = {};

    // Creating the graph data structure
    links.forEach(link => {
      graph[link.source] = graph[link.source] || [];

      if (isDirected) {
        // For directed graphs, add edges in the specified direction
        graph[link.source].push(link.target);
      } else {
        // For undirected graphs, add edges in both directions
        graph[link.source].push(link.target);
        graph[link.target] = graph[link.target] || [];
        graph[link.target].push(link.source);
      }
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
            const el = reorderEdgeNode(`edge${currentNode}-${neighbor}`);
            edgesVisited.push(el);
          }
        }
      }
    }

    console.log('Visited Nodes in BFS:', visitedOrder);
    console.log('Edges visited in BFS:', edgesVisited);

    setVisitedNodes(visitedOrder);
    return edgesVisited;
  };

  const memoizedTraverseBFS = useMemo(() => traverseBFS(), [startNode, links, nodes]);

  useEffect(() => {
    setEdgesInBFS(memoizedTraverseBFS);
    if (memoizedTraverseBFS.join(',') !== correctPath.join(',')) {
      setCorrectPath(memoizedTraverseBFS);
    }
    
  }, [startNode, links, nodes]);

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
      hideWeights={true}
      isDirected={isDirected}
    />
  );
}

export default BFS;
