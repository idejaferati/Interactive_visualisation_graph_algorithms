import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { reorderEdgeNode } from './utils';

function DFS({
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
  const [edgesInDFS, setEdgesInDFS] = useState([]);

  const traverseDFS = () => {
    const graph = {};

    // Creating the graph data structure based on directed or undirected
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
    const edgesArr = []; // Track edges visited in DFS

    const dfsRecursive = (node, visitedOrder) => {
      visited[node] = true;
      visitedOrder.push(node);

      if (graph[node]) {
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            const el = reorderEdgeNode(`edge${node}-${neighbor}`);
            edgesArr.push(el);
            dfsRecursive(neighbor, visitedOrder);
          }
        }
      }
    };

    const visitedOrder = [];
    dfsRecursive(startNode, visitedOrder);

    setVisitedNodes(visitedOrder);
    setEdgesInDFS(edgesArr);

    return edgesArr;
  };

  const memoizedTraverseBFS = useMemo(() => traverseDFS(), [startNode, links, nodes]);

  useEffect(() => {
    setEdgesInDFS(memoizedTraverseBFS);
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
      edgesInDFS={edgesInDFS}
      hideWeights={true}
      isDirected={isDirected}
    />
  );
}

export default DFS;
