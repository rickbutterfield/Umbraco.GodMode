import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    debug: true,
    input: 'http://localhost:26096/umbraco/swagger/god-mode/swagger.json',
    output: {
        path: 'src/api',
    },
    plugins: [
        {
            name: "@hey-api/client-fetch",
            exportFromIndex: true,
            throwOnError: true,
        },
        {
            name: "@hey-api/typescript",
            enums: true,
        },
        {
            name: "@hey-api/sdk",
            asClass: true,
            classNameBuilder: (name) => `${name}Service`,
            responseStyle: "fields",
        },
    ]
});