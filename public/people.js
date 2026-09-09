/* GCA people — shared helpers for the Leadership and Members pages.
 *
 * The roster is deliberately NOT in this file. Anything shipped to the browser
 * is public by definition, so the records live server-side in
 * api/_lib/people-data.js and arrive over one of two endpoints:
 *
 *   GCA.loadPublic()          -> GET /api/people-public
 *                                no auth; the subset the public Leadership
 *                                page renders (no contact details).
 *   GCA.loadDirectory(token)  -> GET /api/people
 *                                full records for the member directory;
 *                                requires a Firebase ID token, verified
 *                                server-side. Returns 401 without one.
 *
 * Both resolve with this same object, its TERMS / PAST_TERMS / CURRENT_TERM /
 * PEOPLE properties filled in. Read those only after the promise resolves.
 */
window.GCA = (function () {
  var TERMS        = [];
  var PAST_TERMS   = [];
  var CURRENT_TERM = "";
  var ROLE_ORDER   = [];
  var PEOPLE       = [];

  function roleIn(p, term) {
    var r = (p.roles || []).filter(function (x) { return x.term === term; })[0];
    return r ? r.role : null;
  }
  function teamIn(p, term) {
    var t = (p.teams || []).filter(function (x) { return x.term === term; })[0];
    return t ? t.dept : null;
  }
  function roleRank(role) {
    var i = ROLE_ORDER.indexOf(role);
    return i === -1 ? ROLE_ORDER.length : i;
  }
  function officersFor(term) {
    return PEOPLE.filter(function (p) { return roleIn(p, term); })
                 .sort(function (a, b) { return roleRank(roleIn(a, term)) - roleRank(roleIn(b, term)); });
  }
  function teamFor(term) {
    return PEOPLE.filter(function (p) { return teamIn(p, term); });
  }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2)
               .map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }
  // Latest role, else latest department — what the person is known as today.
  function standing(p) {
    if (p.roles && p.roles.length) return roleIn(p, CURRENT_TERM) || p.roles[0].role;
    if (p.teams && p.teams.length) return teamIn(p, CURRENT_TERM) || p.teams[0].dept;
    return "";
  }
  function termsOf(p) {
    return (p.roles || []).map(function (r) { return r.term; })
      .concat((p.teams || []).map(function (t) { return t.term; }));
  }

  var api = {
    TERMS: TERMS, PAST_TERMS: PAST_TERMS, CURRENT_TERM: CURRENT_TERM, PEOPLE: PEOPLE,
    roleIn: roleIn, teamIn: teamIn, officersFor: officersFor, teamFor: teamFor,
    initials: initials, standing: standing, termsOf: termsOf
  };

  function absorb(payload) {
    TERMS        = payload.terms       || [];
    CURRENT_TERM = payload.currentTerm || "";
    ROLE_ORDER   = payload.roleOrder   || [];
    PEOPLE       = payload.people      || [];
    PAST_TERMS   = TERMS.filter(function (t) { return t !== CURRENT_TERM; });

    api.TERMS        = TERMS;
    api.PAST_TERMS   = PAST_TERMS;
    api.CURRENT_TERM = CURRENT_TERM;
    api.PEOPLE       = PEOPLE;
    return api;
  }

  function fetchRoster(url, headers) {
    return fetch(url, { headers: headers || {}, credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) {
          var err = new Error('Roster request failed: ' + res.status);
          err.status = res.status;
          throw err;
        }
        return res.json();
      })
      .then(absorb);
  }

  api.loadPublic = function () {
    return fetchRoster('/api/people-public');
  };

  api.loadDirectory = function (idToken) {
    if (!idToken) {
      var err = new Error('Sign in required.');
      err.status = 401;
      return Promise.reject(err);
    }
    return fetchRoster('/api/people', { Authorization: 'Bearer ' + idToken });
  };

  return api;
})();
