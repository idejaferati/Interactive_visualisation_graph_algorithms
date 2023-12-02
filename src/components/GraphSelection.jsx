import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Timeline } from '@mui/icons-material';
import { links1, nodes1, links2, nodes2, links3, nodes3, linksNeg1, linksNeg2, linksNeg3 } from './GraphInit';

const graphOptions = [
  { label: 'Graph 1', nodes: nodes1, links: links1, algorithmPermission: [] },
  { label: 'Graph 2', nodes: nodes2, links: links2, algorithmPermission: [] },
  { label: 'Graph 3', nodes: nodes3, links: links3, algorithmPermission: [] },
  { label: 'Negative weighted graph 1', nodes: nodes1, links: linksNeg1, algorithmPermission: ["kruskal", "prim"] },
  { label: 'Negative weighted graph 2', nodes: nodes2, links: linksNeg2, algorithmPermission: ["kruskal", "prim"] },
  { label: 'Negative weighted graph 3', nodes: nodes3, links: linksNeg3, algorithmPermission: ["kruskal", "prim"] },
];

export default function GraphSelection({ onGraphSelect, algorithm }) {
  const [open, setOpen] = React.useState(false);
  const [selectedGraph, setSelectedGraph] = React.useState(graphOptions[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGraphChange = (event) => {
    const selectedValue = event.target.value;
    const selectedGraphOption = graphOptions.find(
      (option) => option.label === selectedValue
    );
    setSelectedGraph(selectedGraphOption);
    onGraphSelect(selectedGraphOption.nodes, selectedGraphOption.links);
    handleClose();
  };

  return (
    <div>
      <span>Select Graph: </span>
      <Select
        style={{height: "35px"}}
        value={selectedGraph.label}
        onChange={handleGraphChange}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {graphOptions.map((option) => (
          (option.algorithmPermission.length === 0 || option.algorithmPermission.includes(algorithm)) && 
            <MenuItem key={option.label} value={option.label}>
            {open &&  <Timeline />} <span>{option.label}</span>
            </MenuItem>
        ))}
      </Select>
    </div>
  );
}
