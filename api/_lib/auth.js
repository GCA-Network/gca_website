// Firebase ID-token verification for API routes.
//
// The browser gets an ID token from the Firebase SDK after sign-in and sends it
// as `Authorization: Bearer <token>`. Verification happens here, server-side —
// a client-side redirect only hides a page, it does not protect the data behind
// it.

const { admin, db } = require('./firebase');

/**
 * Resolve the signed-in user for a request, or null.
 * Returns the decoded token (uid, email, ...) on success.
 */
async function getUser(req) {
  const header = req.headers.authorization || req.headers.Authorization || '';
  const match = /^Bearer\s+(.+)$/i.exec(String(header).trim());
  if (!match) return null;

  try {
    return await admin.auth().verifyIdToken(match[1].trim());
  } catch (e) {
    console.warn('ID token rejected:', e.message);
    return null;
  }
}

/**
 * Guard for handlers that require a signed-in user.
 * Writes the error response and returns null when the caller is not
 * authenticated; returns the decoded token when they are.
 */
async function requireUser(req, res) {
  if (!db) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'Auth not configured. Set FIREBASE_SERVICE_ACCOUNT in environment variables.' }));
    return null;
  }

  const user = await getUser(req);
  if (!user) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Sign in required.' }));
    return null;
  }
  return user;
}

module.exports = { getUser, requireUser };
