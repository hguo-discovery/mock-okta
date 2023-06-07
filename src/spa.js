import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import mockRoutes from './mock-routes';
import proxySpa from './proxy-spa';
import { mockBasePath, mockFullBaseUrl } from './utilities';

const app = express();

app.use(cors());

if (mockBasePath && mockBasePath !== '/') {
    app.get('/', (req, res) => {
        res.redirect(mockBasePath);
    });
}

// Always make proxy available
proxySpa(app);

mockRoutes(app, mockFullBaseUrl);

const port = process.env.MOCK_OKTA_PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Mock OKTA (for SPA) running at ${process.env.MOCK_OKTA_PROTOCOL}://${process.env.MOCK_OKTA_DOMAIN}:${process.env.MOCK_OKTA_PORT || 3333}`);
});