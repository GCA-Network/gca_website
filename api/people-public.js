// GET /api/people-public — the roster the public Leadership page renders.
//
// No authentication: this is what anyone visiting /leadership.html sees. It is
// the same people, minus the fields that exist only for the member directory
// (see PRIVATE_FIELDS in _lib/people-data.js — notably `email`).

const people = require('./_lib/people-data');

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300');

  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  return res.end(JSON.stringify({
    terms: people.TERMS,
    currentTerm: people.CURRENT_TERM,
    roleOrder: people.ROLE_ORDER,
    people: people.publicView(),
  }));
};
