import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function EndNodeSelection({ selectedGraph, onEndNodeSelect, disabledOptions }) {
  const [open, setOpen] = React.useState(false);
  const [selectedEndNode, setSelectedEndNode] = React.useState(selectedGraph[selectedGraph.length-1]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGraphChange = (event) => {
    const selectedValue = event.target.value;
    const selectedEndNodeOption = selectedGraph.find(
      (option) => option.label === selectedValue
    );
    setSelectedEndNode(selectedEndNodeOption);
    onEndNodeSelect(selectedEndNodeOption.id);
    handleClose();
  };

  return (
    <div>
      <span>Select End Node: </span>
      <Select
        style={{height: "35px"}}
        value={selectedEndNode.label}
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
