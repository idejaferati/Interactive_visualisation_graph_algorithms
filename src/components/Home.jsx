// Home.js
import React from "react";
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Home() {
    const navigate = useNavigate();

    const navigateToAlgorithm = (algorithm) => {
        navigate(`/${algorithm.toLowerCase()}`);
    };

    return (
        <div>
            <h3>Graph algorithms</h3>
           
            <div>
                <img src={logo} alt="logo" style={{ height: "30%", maxWidth: "30%" }} />
            </div>
            <h4>Interact, Explore, Solve: Graphs at Your Fingertips, Algorithms Revealed.</h4>
            <hr></hr>
            <h5>Choose the algorithm you want to solve:</h5>
            <ButtonGroup color="secondary" variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => navigateToAlgorithm('Djikstra')}>Djikstra</Button>
                <Button onClick={() => navigateToAlgorithm('DFS')}>Depth First Search</Button>
                <Button onClick={() => navigateToAlgorithm('BFS')}>Breadth First Search</Button>
                <Button onClick={() => navigateToAlgorithm('Kruskal')}>Kruskal</Button>
                <Button onClick={() => navigateToAlgorithm('Prim')}>Djikstra Prim</Button>
            </ButtonGroup>

        </div>
    );
}

export default Home;
