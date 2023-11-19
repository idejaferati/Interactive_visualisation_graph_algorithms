import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Timeline } from '@mui/icons-material';
import { links1, nodes1, links2, nodes2, links3, nodes3 } from './GraphInit';

const graphOptions = [
  { label: 'Graph 1', nodes: nodes1, links: links1 },
  { label: 'Graph 2', nodes: nodes2, links: links2 },
  { label: 'Graph 3', nodes: nodes3, links: links3 },
];

export default function GraphSelection({ onGraphSelect }) {
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
      <span>Select Graph:</span>
      <Select
        value={selectedGraph.label}
        onChange={handleGraphChange}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {graphOptions.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            <Timeline /> {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
