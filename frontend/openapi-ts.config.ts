import { defineConfig } from '@hey-api/openapi-ts';
import { baseURL } from './src/services/baseUrl';

export default defineConfig({
    input: `${baseURL}/openapi.yaml`,
    output: 'src/services/api',
    plugins: [
        '@tanstack/react-query',
        '@hey-api/client-axios'
    ],
});