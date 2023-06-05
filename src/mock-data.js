import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { mockFullBaseUrl } from './utilities';

const mockOktaPort = isNaN(process.env.MOCK_OKTA_PORT) ? 80 : process.env.MOCK_OKTA_PORT;
const fullMockBaseUrl = `${process.env.MOCK_OKTA_PROTOCOL}://${process.env.MOCK_OKTA_DOMAIN}:${mockOktaPort}`;
const fullMockOauthDefaultBaseUrl = `${fullMockBaseUrl}/oauth2/default`;

const mockData = {
  'okta': {
    authState: 'qqEONsAck0gUa5LbteCElpQbfpO7RUxQ2lHKJV7bLxO1q4klkP4WdUWONjRQZp7P',
    authCode: 'a1oeIHGz6B3-gj0FDnfZPqFXp1AumTaEXunlROiVrN8',
    'openid-configuration-response': {
      'issuer': fullMockOauthDefaultBaseUrl,
      'authorization_endpoint': `${fullMockOauthDefaultBaseUrl}/v1/authorize`,
      'token_endpoint': `${fullMockOauthDefaultBaseUrl}/v1/token`,
      'userinfo_endpoint': `${fullMockOauthDefaultBaseUrl}/v1/userinfo`,
      'revocation_endpoint': `${fullMockOauthDefaultBaseUrl}/v1/revoke`,
      'jwks_uri': `${fullMockOauthDefaultBaseUrl}/v1/keys`,
      'response_types_supported': [
        'code',
        'token',
        'id_token',
        'code token',
        'code id_token',
        'token id_token',
        'code token id_token',
      ],
      'subject_types_supported': [
        'public',
      ],
      'id_token_signing_alg_values_supported': [
        'RS256',
      ],
      'scopes_supported': [
        'openid',
        'profile',
        'email',
        'address',
        'phone',
      ],
      'token_endpoint_auth_methods_supported': [
        'client_secret_basic',
        'client_secret_post',
      ],
      'claims_supported': [
        'sub',
        'name',
        'given_name',
        'family_name',
        'middle_name',
        'nickname',
        'preferred_username',
        'profile',
        'picture',
        'website',
        'email',
        'email_verified',
        'gender',
        'birthdate',
        'zoneinfo',
        'locale',
        'phone_number',
        'phone_number_verified',
        'address',
        'updated_at',
      ],
      'code_challenge_methods_supported': [
        'S256',
      ],
    },
    userInfo: {
      sub: 'fake-user-id',
      name: 'John Smith',
      locale: 'US',
      email: 'fake.user@example.com',
      preferred_username: 'fake.user@example.com',
      given_name: 'John',
      family_name: 'Smith',
      zoneinfo: 'America/Los_Angeles',
      updated_at: 1674502163,
      email_verified: true
    },
    token: () => {
      const tokenPayload = {
        ver: 1,
        jti: 'AT.ZhG_iZgUmpBWAsVltfo3LCVgu7832x7RdH_uPokH5qo',
        iss: `${mockFullBaseUrl}/oauth2/default`,
        aud: "api://default",
        "iat": 1685933356,
        "exp": 1685936956,
        "cid": "0oa1hy8q4q1oPfZQJ0h8",
        "uid": "00u1d2ioj7yDlf9XC0h8",
        "scp": [
          "email",
          "groups",
          "openid",
          "profile"
        ],
        "auth_time": 1685933310,
        "sub": "fake-user-id",
        "groups": [
          "admin"
        ]
      };
      const tokenSecretKey = 'fake-secret-key';
      const tokenOptions = {};

      // make up a JWT token that is to be put in local storage in SPA
      return {
        accessToken: {
          accessToken: process.env.OKTA_ACCESS_TOKEN ? process.env.OKTA_ACCESS_TOKEN : jwt.sign(tokenPayload, tokenSecretKey, tokenOptions),
          userinfoUrl: `${process.env.MOCK_OKTA_PROTOCOL}://${process.env.MOCK_OKTA_DOMAIN}:${isNaN(process.env.SPA_PORT) ? 80: process.env.MOCK_OKTA_PORT}/oauth2/default/v1/userinfo`,
        },
        idToken: {
          idToken: process.env.OKTA_ID_TOKEN ? process.env.OKTA_ID_TOKEN : 'fake-okta-id-token',
          claims: {
            sub: 'fake-user-id',
          },
        },
      }
    }
  },
};

export default mockData;
