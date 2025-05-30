const jwt = require('jsonwebtoken');

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        console.warn('Unauthorized access: No token provided');
        return response.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    console.warn('Unauthorized: Token expired');
                    return response.status(401).json({ message: 'Unauthorized: Token has expired. Please log in again.' });
                case 'JsonWebTokenError':
                    console.warn('Forbidden: Invalid token');
                    return response.status(403).json({ message: 'Forbidden: Invalid token' });
                case 'NotBeforeError':
                    console.warn('Forbidden: Token not yet valid');
                    return response.status(403).json({ message: 'Forbidden: Token is not yet valid' });
                default:
                    console.error('JWT Verification Error', err);
                    return response.status(500).json({ message: 'Server error. Please try again later.' });
            }
        }

        request.user = user;
        next();
    });
};

module.exports = { authenticateToken };
