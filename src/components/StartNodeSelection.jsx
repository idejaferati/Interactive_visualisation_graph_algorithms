import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Timeline } from '@mui/icons-material';

const nodeOptions = [
  { label: 'A', node: 'node1' },
  { label: 'B', node: 'node2'},
  { label: 'C', node: 'node3'},
];

export default function StartNodeSelection({ onStartNodeSelect }) {
  const [open, setOpen] = React.useState(false);
  const [selectedStartNode, setSelectedStartNode] = React.useState(nodeOptions[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGraphChange = (event) => {
    const selectedValue = event.target.value;
    const selectedStartNodeOption = nodeOptions.find(
      (option) => option.label === selectedValue
    );
    setSelectedStartNode(selectedStartNodeOption);
    onStartNodeSelect(selectedStartNodeOption.node);
    handleClose();
  };

  return (
    <div>
      <span>Select Start Node: </span>
      <Select
        value={selectedStartNode.label}
        onChange={handleGraphChange}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {nodeOptions.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
