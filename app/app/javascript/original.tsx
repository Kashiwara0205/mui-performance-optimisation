import React from 'react';
import { createRoot } from 'react-dom/client';
import Sample from './components/mui/sample';

const container = document.getElementById('originals');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(<Sample/>);
});