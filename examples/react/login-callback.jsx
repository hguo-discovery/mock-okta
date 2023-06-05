import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCallback as OktaLoginCallback } from '@okta/okta-react';

// Use your own condition here. For example, use mock when the environment is local.
const shouldUseMock = () => true;
const mockJwtTokenUrl = () => 'http://localhost:3333/oauth2/default/make-jwt-token';

const LoginCallback = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (shouldUseMock()) {
            fetch(mockJwtTokenUrl()).then(res => res.json())
                .then(json => {
                    localStorage.setItem('okta-token-storage', JSON.stringify(json));
                    navigate('/');
                });
        }
    }, []);

    return <OktaLoginCallback />
}

export default LoginCallback;

/*
 * Use custom LoginCallback component in the place of OKTA React's LoginCallBack, for example:
 * import { LoginCallback } from '@okta/okta-react';
 * const app = () =>
 *   <Security>
 *     <Routes>
 *       <Route path="/callback" element={<LoginCallback />} />
 *       .... other routes ....
 *     </Routes>
 *   </Security>
 */
