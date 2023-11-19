// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GraphVisualization from './components/GraphVisualization';
import App from './App';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/djikstra" element={<GraphVisualization algorithm="djikstra"/>} />
      <Route path="/dfs" element={<GraphVisualization algorithm="dfs"/>} />
      <Route path="/bfs" element={<GraphVisualization algorithm="bfs"/>} />
      <Route path="/kruskal" element={<GraphVisualization algorithm="kruskal"/>} />
      <Route path="/prim" element={<GraphVisualization algorithm="prim"/>} />
    </Routes>
  );
};

export default AppRoutes;
