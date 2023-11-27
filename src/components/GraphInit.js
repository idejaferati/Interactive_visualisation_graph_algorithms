export const nodes1 = [
  { id: "node1", label: "A", x: 100, y: 100 },
  { id: "node2", label: "B", x: 300, y: 100 },
  { id: "node3", label: "C", x: 100, y: 300 },
  { id: "node4", label: "D", x: 300, y: 300 },
  { id: "node5", label: "E", x: 500, y: 100 },
  { id: "node6", label: "F", x: 500, y: 300 },
  { id: "node7", label: "G", x: 700, y: 200 },
];

export const links1 = [
  { source: "node1", target: "node2", weight: 6 },
  { source: "node1", target: "node3", weight: 8 },
  { source: "node2", target: "node4", weight: 10 },
  { source: "node3", target: "node4", weight: 5 },
  { source: "node2", target: "node5", weight: 9 },
  { source: "node4", target: "node6", weight: 7 },
  { source: "node5", target: "node7", weight: 11 },
  { source: "node6", target: "node7", weight: 4 },
];


export const nodes2 = [
  { id: "node1", label: "A", x: 100, y: 100 },
  { id: "node2", label: "B", x: 300, y: 100 },
  { id: "node3", label: "C", x: 100, y: 300 },
  { id: "node4", label: "D", x: 300, y: 300 },
  { id: "node5", label: "E", x: 500, y: 100 },
  { id: "node6", label: "F", x: 500, y: 300 },
  { id: "node7", label: "G", x: 700, y: 100 },
  { id: "node8", label: "H", x: 700, y: 300 },
];

export const links2 = [
  { source: "node1", target: "node2", weight: 6 },
  { source: "node1", target: "node3", weight: 8 },
  { source: "node2", target: "node4", weight: 10 },
  { source: "node3", target: "node4", weight: 5 },
  { source: "node2", target: "node5", weight: 9 },
  { source: "node4", target: "node6", weight: 7 },
  { source: "node5", target: "node7", weight: 11 },
  { source: "node6", target: "node8", weight: 12 },
  { source: "node7", target: "node8", weight: 4 },
];


export const nodes3 = [
  { id: "node1", label: "A", x: 100, y: 100 },
  { id: "node2", label: "B", x: 300, y: 100 },
  { id: "node3", label: "C", x: 100, y: 300 },
  { id: "node4", label: "D", x: 300, y: 300 },
  { id: "node5", label: "E", x: 500, y: 100 },
  { id: "node6", label: "F", x: 500, y: 300 },
  { id: "node7", label: "G", x: 700, y: 100 },
  { id: "node8", label: "H", x: 700, y: 300 },
  { id: "node9", label: "I", x: 800, y: 200 },
];

export const links3 = [
  { source: "node1", target: "node2", weight: 10 },
  { source: "node1", target: "node3", weight: 14 },
  { source: "node2", target: "node4", weight: 13 },
  { source: "node3", target: "node4", weight: 12 },
  { source: "node2", target: "node5", weight: 8 },
  { source: "node4", target: "node6", weight: 11 },
  { source: "node5", target: "node7", weight: 9 },
  { source: "node6", target: "node8", weight: 7 },
  { source: "node7", target: "node9", weight: 15 },
  { source: "node8", target: "node9", weight: 6 },
];
