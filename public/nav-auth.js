/* GCA nav — the two buttons at the right of the header follow sign-in state.
 *
 *   signed out:  [ Login ]      [ Join GCA ]
 *   signed in:   [ Dashboard ]  [ Log out ]
 *
 * bindNavAuth(auth) wires both the desktop nav and the mobile menu. Pages that
 * require a signed-in member keep their own redirect guard; this file only
 * touches the buttons. Log out signs out in place: the listener below flips
 * the buttons back, and gated pages bounce to the login form on their own.
 */
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js';

var PAIRS = [
  { login: 'nav-login-btn',        join: 'nav-join-btn' },
  { login: 'nav-login-btn-mobile', join: 'nav-join-btn-mobile' },
];

export function renderNavAuth(user) {
  PAIRS.forEach(function (ids) {
    var login = document.getElementById(ids.login);
    var join  = document.getElementById(ids.join);
    if (login) {
      login.textContent = user ? 'Dashboard' : 'Login';
      login.href        = user ? '/dashboard.html' : '/login.html';
    }
    if (join) {
      // Keep the page's own Join label and target so signing out restores them.
      if (!join.dataset.joinLabel) join.dataset.joinLabel = join.textContent;
      if (!join.dataset.joinHref)  join.dataset.joinHref  = join.getAttribute('href');
      join.textContent = user ? 'Log out' : join.dataset.joinLabel;
      join.href        = user ? '#' : join.dataset.joinHref;
    }
  });
}

export function bindNavAuth(auth) {
  PAIRS.forEach(function (ids) {
    var join = document.getElementById(ids.join);
    if (!join) return;
    join.addEventListener('click', function (e) {
      if (!auth.currentUser) return;   // signed out: this is still the Join link
      e.preventDefault();
      signOut(auth);
    });
  });
  onAuthStateChanged(auth, renderNavAuth);
}
