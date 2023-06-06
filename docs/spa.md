# Mock OKTA Behaviors for SPA

OKTA documentation [Implement the OAuth 2.0 Authorization Code with PKCE Flow](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce) 
explains how things work when integrating OKTA with a single-page application (SPA).

There are different ways to mock the OKTA behaviors.

Most intuitively, a full-fledged mocking server can be created to simulate all OKTA behaviors in the authentication flow.

## For React

This tool starts with a minimalist mock, instead of a full-fledged one, to help a SPA skip actual OKTA flow.
To make such a minimalist approach work, it requires some changes to the SPA code:

- use a mock component to replace LoginCallback while using this tool (running locally), and
- point OKTA configuration to this mock tool server

### How to use

1. Clone this repo.
2. Create a `.env` file under project root by copying `.env.example`. Modify values to match your SPA.
3. In SPA, change OKTA config to point to the mock domain and port in # 2 above.
4. In SPA, create a component (see example [here](/examples/react/login-callback.jsx)) to handle callback redirected from OKTA.
5. The mock component should also set `okta-token-storage` in local storage (se example above).
6. If a valid token is required by backend APIs, use one when setting `okta-token-storage`.
7. Start SPA and this mock server (`yarn start`).
8. Visit SPA and observe OKTA step is skipped.

Alternatively, run `yarn start access-spa-via-proxy` to run the SPA on the same port (http://localhost:3333) of mock routes.

For example, your SPA could be running at `http://localhost:4200`, and you can configure the OKTA mock to be running at `http://localhost:3333`.
Once configured all these in `.env`, you'll be visiting `http://localhost:3333` to access the SPA and the mock server will skip all the OKTA steps for you and take you to SPA's home page.   

### TODO


**Use of proxy** allows running SPA on the same port of mock server. This opens the door for further simplifying SPA code. 

Local storage can be set on mock server side before redirecting back to SPA. Then the SPA won't have to do it like in the [example](/examples/react/login-callback.jsx). 

## For other frontend frameworks

Not yet explored but likely a similar minimalist approach would work.
