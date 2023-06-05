import mockData from './mock-data';
import { spaRedirectUrl } from './utilities';

const mockRoutes = (app) => {
    // mock routes related to OKTA OIDC/SPA flow
    app.get('/login/step-up/redirect', (req, res) => {
        res.redirect(`${spaRedirectUrl}/auth-callback?code=${mockData.okta.authCode}&state=${mockData.okta.authState}`);
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