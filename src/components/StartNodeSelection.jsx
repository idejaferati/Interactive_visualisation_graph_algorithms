import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function StartNodeSelection({ selectedGraph, onStartNodeSelect, disabledOptions }) {
  const [open, setOpen] = React.useState(false);
  const [selectedStartNode, setSelectedStartNode] = React.useState(selectedGraph[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGraphChange = (event) => {
    const selectedValue = event.target.value;
    const selectedStartNodeOption = selectedGraph.find(
      (option) => option.label === selectedValue
    );
    setSelectedStartNode(selectedStartNodeOption);
    onStartNodeSelect(selectedStartNodeOption.id);
    handleClose();
  };

  return (
    <div>
      <span>Select Start Node: </span>
      <Select
        style={{height: "35px"}}
        value={selectedStartNode.label}
        onChange={handleGraphChange}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {selectedGraph.map((option) => (
          <MenuItem key={option.label} value={option.label} disabled={disabledOptions.includes(option.id)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
