import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ plugin() ],
    server: {
        port: 5876,
    }
})