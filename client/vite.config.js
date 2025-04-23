import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  optimizeDeps: {
    include: [
      'codemirror',
      'codemirror/mode/javascript/javascript',
      'codemirror/addon/edit/closetag',
      'codemirror/addon/edit/closebrackets',
      'codemirror/lib/codemirror.css',
      'codemirror/theme/dracula.css'
    ]
  }
});
