import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRES_IN = '7d' } = process.env;

export function signUserJwt(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function jwtRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
