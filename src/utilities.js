export const mockBasePath = process.env.MOCK_BASE_PATH || '/';
const mockPort = isNaN(process.env.SPA_PORT) ? 80: process.env.MOCK_OKTA_PORT;
export const mockFullBaseUrl = `${process.env.MOCK_OKTA_PROTOCOL}://${process.env.MOCK_OKTA_DOMAIN}:${mockPort}${mockBasePath}`;

const spaBasePath = process.env.SPA_BASE_PATH || '/';
const spaPort = isNaN(process.env.SPA_PORT) ? 80: process.env.SPA_PORT;
export const spaFullBaseUrl = `${process.env.SPA_PROTOCOL}://${process.env.SPA_DOMAIN}:${spaPort}${spaBasePath}`;

// "set-okta-token" implies proxy is used.
export const useProxy = process.argv.slice(2).indexOf('set-okta-token') >= 0;

export const spaRedirectUrl = useProxy ? mockFullBaseUrl : spaFullBaseUrl;