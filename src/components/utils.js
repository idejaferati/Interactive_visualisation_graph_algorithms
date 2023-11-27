export const reorderEdgeNode = (edgeNode) => {
  const regex = /edgenode(\d+)-node(\d+)/;
  const match = edgeNode.match(regex);

  if (match) {
    const firstNode = parseInt(match[1]);
    const secondNode = parseInt(match[2]);

    if (firstNode > secondNode) {
      return `edgenode${secondNode}-node${firstNode}`;
    }
  }

  return edgeNode;
};

export const renameEdge = (edgeId, selectedGraphNodes) => {
  let renamedEdge = edgeId.replace("edge", "");
  selectedGraphNodes.forEach(e => {
    renamedEdge = renamedEdge.replace(e.id, e.label);
  });
  return renamedEdge;
}