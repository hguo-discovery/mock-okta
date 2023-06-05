import { createProxyMiddleware } from 'http-proxy-middleware';
import { mockBasePath, spaFullBaseUrl } from './utilities';

const proxySpa = (app) => {
    // mount SPA app
    app.use(mockBasePath, createProxyMiddleware({
        target: spaFullBaseUrl,
        secure: false,
        changeOrigin: true,
    }));

    // mount backend APIs
    app.use(process.env.API_BASE_PATH, createProxyMiddleware({
        target: `${process.env.API_PROTOCOL}://${process.env.API_DOMAIN}:${process.env.API_PORT}${process.env.API_BASE_PATH}`,
        secure: false,
        changeOrigin: true,
        logger: console,
        on: {
            // When an API is protected AWS WAF, XSRF token might be needed, even if just a fake one.
            proxyReq: (proxyReq, req, res) => proxyReq.setHeader('cookie', 'XSRF-TOKEN=made-up-xsrf-token'),
        },
    }));
}

export default proxySpa;