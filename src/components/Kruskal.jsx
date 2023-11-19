import React, { useEffect, useState } from 'react';
import Graph from './Graph';

function Kruskal({
  nodes,
  links,
  selectedEdges,
  correctSelectedEdges,
  onEdgeClick,
  onEdgeMouseOver,
  onEdgeMouseOut,
}) {
  const [minimumSpanningTree, setMinimumSpanningTree] = useState([]);

  const findMinimumSpanningTree = () => {
    const sortedEdges = [...links].sort((a, b) => a.weight - b.weight);
    const parent = {};
    const rank = {};

    const find = (node) => {
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

    const formattedEdges = minimumSpanningTreeEdges.map(edge => `edge${edge.source}-${edge.target}`);

    setMinimumSpanningTree(formattedEdges);

    console.log('Minimum Spanning Tree:', formattedEdges);
  };

  useEffect(() => {
    findMinimumSpanningTree();
  }, [links, nodes]);

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

export default Kruskal;
