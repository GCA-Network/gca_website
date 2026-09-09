// GET /api/people — the full member directory. Members only.
//
// Returns the complete records, including any contact details. The member
// directory page (public/members.html) calls this with the signed-in user's
// Firebase ID token; without a valid token this responds 401 and no roster
// data leaves the server.

const { requireUser } = require('./_lib/auth');
const people = require('./_lib/people-data');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // Directory data is member-only, so it must never sit in a shared cache.
  res.setHeader('Cache-Control', 'private, no-store');

  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const user = await requireUser(req, res);
  if (!user) return; // requireUser already wrote 401/503

  return res.end(JSON.stringify({
    terms: people.TERMS,
    currentTerm: people.CURRENT_TERM,
    roleOrder: people.ROLE_ORDER,
    people: people.PEOPLE,
  }));
};
