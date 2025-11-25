const { validateToken } = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (tokenCookieValue) {
            try {
                const userPayload = validateToken(tokenCookieValue);
                req.user = userPayload;
            } catch (error) {
                // Invalid token, just ignore and continue
                req.user ;
            }
        } else {
            req.user ; // no token found
        }

        next(); // call next exactly once
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
