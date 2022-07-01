import React from 'react';
import { createRoot } from 'react-dom/client';
import Sample from './components/sample/sample';

const container = document.getElementById('sample');
const root = createRoot(container);

document.addEventListener('DOMContentLoaded', () => {
  root.render(<Sample/>);
});