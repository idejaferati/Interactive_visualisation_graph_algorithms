import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { reorderEdgeNode } from './utils';

function Kruskal({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
  correctPath,
  setCorrectPath,
}) {
  const [minimumSpanningTree, setMinimumSpanningTree] = useState([]);

  const findMinimumSpanningTree = () => {
    const sortedEdges = [...links].sort((a, b) => a.weight - b.weight);
    const parent = {};
    const rank = {};

    const find = (node) => {
      if (parent[node] === undefined) {
        parent[node] = node;
        return node;
      }

      if (parent[node] !== node) {
        parent[node] = find(parent[node]);
      }
      return parent[node];
    };

    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX !== rootY) {
        if (rank[rootX] < rank[rootY]) {
          [rootX, rootY] = [rootY, rootX];
        }
        parent[rootY] = rootX;
        if (rank[rootX] === rank[rootY]) {
          rank[rootX]++;
        }
      }
    };

    for (const node of nodes) {
      parent[node] = node;
      rank[node] = 0;
    }

    const minimumSpanningTreeEdges = [];
    for (const edge of sortedEdges) {
      const rootSource = find(edge.source);
      const rootTarget = find(edge.target);
      if (rootSource !== rootTarget) {
        minimumSpanningTreeEdges.push(edge);
        union(rootSource, rootTarget);
      }
    }
    
    const formattedEdges = minimumSpanningTreeEdges.map(edge => {
      const el = reorderEdgeNode(`edge${edge.source}-${edge.target}`);
      return el;
    });

    return formattedEdges;
  };

  const memoizedMinimumSpanningTree = useMemo(() => findMinimumSpanningTree(), [links, nodes]);

  useEffect(() => {
    setMinimumSpanningTree(memoizedMinimumSpanningTree);
    if (memoizedMinimumSpanningTree.join(',') !== correctPath.join(',')) {
      setCorrectPath(memoizedMinimumSpanningTree);
    }
    console.log('Minimum Spanning Tree:', memoizedMinimumSpanningTree);
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
      //minimumSpanningTree={minimumSpanningTree}
    />
  );
}

export default Kruskal;
