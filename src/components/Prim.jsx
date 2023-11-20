import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { reorderEdgeNode } from './utils';

function Prim({
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
    const parent = {};

    const nodesArr = nodes.map(el => el.id);

    nodesArr.forEach(node => {
      minDistances[node] = Infinity;
      visited[node] = false;
      parent[node] = null;
    });

    minDistances[startNode] = 0;

    const selectedEdges = [];

    while (selectedEdges.length < nodesArr.length - 1) {
      let minNode = null;
      let minWeight = Infinity;
      let minEdge = null;

      // Find the vertex with the minimum distance among unvisited nodes
      for (const node of Object.keys(minDistances)) {
        if (!visited[node] && minDistances[node] < minWeight) {
          minNode = node;
          minWeight = minDistances[node];
          const el = reorderEdgeNode(`edge${parent[node]}-${node}`);
          minEdge = parent[node] !== null ? el : null;
        }
      }

      if (minEdge) {
        selectedEdges.push(minEdge);
      }

      visited[minNode] = true;

      // Update the minimum distances and selected edges
      for (const node in graph[minNode]) {
        if (graph[minNode][node] < minDistances[node] && !visited[node]) {
          parent[node] = minNode;
          minDistances[node] = graph[minNode][node];
        }
      }
    }


    console.log('Minimum Spanning Tree:', selectedEdges);
    return selectedEdges;
  };

  const memoizedMinimumSpanningTree = useMemo(() => findMinimumSpanningTree(), [links, nodes]);

  useEffect(() => {
    setMinimumSpanningTree(memoizedMinimumSpanningTree);
    if (memoizedMinimumSpanningTree.join(',') !== correctPath.join(',')) {
      setCorrectPath(memoizedMinimumSpanningTree);
    }
  }, [links, nodes]);

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
