import path from 'path';
import mockData from './mock-data';
import { spaRedirectUrl } from './utilities';

const mockRoutes = (app) => {
    app.get('/set-okta-token-then-redirect', (req, res) => {
        res.sendFile(path.join(__dirname, `/set-okta-token-then-redirect.html`));
    });

    // mock routes used in OKTA OIDC/SPA flow
    app.get('/login/step-up/redirect', (req, res) => {
        const redirectTo = `${spaRedirectUrl}/auth-callback?code=${mockData.okta.authCode}&state=${mockData.okta.authState}`;
        process.argv.slice(2).indexOf('set-okta-token') >= 0
            ? res.redirect(`/set-okta-token-then-redirect?redirectTo=${redirectTo}&token=${JSON.stringify(mockData.okta.token())}`)
            : redirectTo
    });

    app.get('/oauth2/default/v1/authorize', (req, res) => {
        res.redirect(`/login/step-up/redirect?stateToken=${mockData.okta.authState}`);
    });

    app.get('/oauth2/default/.well-known/openid-configuration', (req, res) => {
        res.json(mockData.okta['openid-configuration-response']);
    });

    app.get('/oauth2/default/v1/userinfo', (req, res) => {
        res.json(mockData.okta.userInfo);
    })

    app.get('/oauth2/default/make-jwt-token', (req, res) => {
        res.json(mockData.okta.token());
    });
}

export default mockRoutes;