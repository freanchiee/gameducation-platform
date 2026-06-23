import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace with your repo name
const repoName = 'strandhoots/lab-report-criteria-b';


export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/strandhoots/lab-report-criteria-b/' : '/',
  plugins: [react()]
});
