/* GCA people — the single source of truth for the Leadership and Members pages.
 *
 * One record per person. A person who served several terms is listed once:
 *   roles[]  officer terms  { term, role }
 *   teams[]  department terms { term, dept }
 *   sort     family name used for directory ordering (names are written in
 *            mixed conventions, so this is set explicitly rather than guessed)
 *   inducted year the person joined GCA (not a graduation class)
 *   field    field of study
 *   email    contact shown in the member directory; omit when unknown
 */
window.GCA = (function () {
  var TERMS = ["2026–27", "2025–26", "2024–25"];
  var CURRENT_TERM = "2026–27";
  var ROLE_ORDER = ["Founder & President", "President",
                    "VP of Operations", "VP of Marketing", "VP of Outreach",
                    "Secretary General", "Finance Director", "Consultant"];

  var PEOPLE = [
    // ── Officers ──────────────────────────────────────────────────────────
    { id:"felix-gan", name:"Felix Gan", sort:"Gan", inducted:"2024", field:"Computer Science", email:"reachfelixgan@gmail.com", photo:"/assets/members/felix.jpg",
      uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"President" }, { term:"2025–26", role:"President" },
             { term:"2024–25", role:"Founder & President" }] },
    { id:"alex-feldman", name:"Alex Feldman", sort:"Feldman", inducted:"2023", field:"Data Science",
      uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Outreach" }, { term:"2025–26", role:"VP of Outreach" }] },
    { id:"immer-feng", name:"Immer Feng", sort:"Feng", inducted:"2025", field:"Financial Media", photo:"/assets/members/immer-feng.jpg",
      uni:"Peking University",
      roles:[{ term:"2026–27", role:"Secretary General" }, { term:"2025–26", role:"Secretary General" }] },
    { id:"sophia-dooly", name:"Sophia Dooly", sort:"Dooly", inducted:"2025", field:"China Studies: History & Archaeology", uni:"Peking University",
      roles:[{ term:"2025–26", role:"Consultant" }] },
    { id:"jiani-mao", name:"Jiani Mao", sort:"Mao", inducted:"2024", field:"Data Science", uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"Finance Director" }] },

    // ── 2025–26 team ──────────────────────────────────────────────────────
    { id:"mikolaj-palacz", name:"Mikolaj Palacz", sort:"Palacz", inducted:"2025", field:"Smart Logistics", email:"mik.palacz@gmail.com",
      uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"melliou-katerina", name:"Melliou Katerina", sort:"Melliou", inducted:"2025", field:"Precision Medicine and Healthcare", email:"melliou_katerina@hotmail.com", photo:"/assets/members/katerina.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"li-yuan", name:"Li Yuan", sort:"Li", inducted:"2025", field:"Chemistry", email:"3275938178@qq.com", photo:"/assets/members/li-yuan.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"roman", name:"Roman", sort:"Roman", inducted:"2025", field:"Smart Logistics", email:"roman.leander.esser@gmail.com", photo:"/assets/members/roman.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"alper-avci", name:"Alper Avci", sort:"Avci", inducted:"2025", photo:"/assets/members/alper.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"aya", name:"Aya", sort:"Aya", inducted:"2024", field:"Computer Science", photo:"/assets/members/aya.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2026–27", dept:"Operations" }, { term:"2025–26", dept:"Operations" }] },
    { id:"akter-nayema", name:"Akter Nayema", sort:"Akter", inducted:"2025", field:"Environmental Science and New Energy Technology", email:"nayemaakhter32@gmail.com", photo:"/assets/members/nayema-akter.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }] },
    { id:"timotius-kelvin", name:"Timotius Kelvin", sort:"Kelvin", inducted:"2025", field:"Data Science", email:"timotiuskelvin01@gmail.com", photo:"/assets/members/timotius-kelvin.jpg", uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Marketing" }, { term:"2025–26", role:"VP of Marketing" }] },
    { id:"durdieva-kumush", name:"Durdieva Kumush Khemraevna", sort:"Durdieva", inducted:"2025", field:"Smart Logistics", email:"durdievakh@gmail.com", photo:"/assets/members/kumush.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"naomi-okanda", name:"Naomi imali okanda", sort:"Okanda", inducted:"2025", field:"Data Science and Information Technology", email:"naomiokanda7@gmail.com", photo:"/assets/members/naomi.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"jonathan-lan", name:"Jonathan Lan", sort:"Lan", inducted:"2024", field:"Materials Science", email:"thisislanyale@sina.com", photo:"/assets/members/jonathan.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"oualid", name:"Oualid", sort:"Oualid", inducted:"2025", field:"Business Administration", email:"oualidmkadem8@gmail.com", photo:"/assets/members/oualid.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"laylo-saidova", name:"Laylo Saidova", sort:"Saidova", inducted:"2025", field:"Precision Medicine and Healthcare", email:"laylosaidova2003@gmail.com", photo:"/assets/members/laylo.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"anita-keo", name:"Anita Keo", sort:"Keo", inducted:"2025", field:"Smart Logistics", email:"keo.anita93@gmail.com", photo:"/assets/members/anita.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Outreach & Curation" }] },
    { id:"artur-ziganshin", name:"Ziganshin Artur Radikovich", sort:"Ziganshin", inducted:"2025", field:"Environmental Science and New Energy Technology", email:"ziganshinn.a@gmail.com", photo:"/assets/members/artur.jpg", uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Operations" }],
      teams:[{ term:"2025–26", dept:"Outreach & Curation" }] },
    { id:"yaochen", name:"yaochen", sort:"Yaochen", inducted:"2025", field:"Artificial Intelligence", email:"Ychan9liu@163.com", photo:"/assets/members/yaochen.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Outreach & Curation" }] },
    { id:"taleb-alhajji", name:"Taleb Alhajji", sort:"Alhajji", inducted:"2025", field:"Artificial Intelligence and Innovation Design", email:"panda.1738@hotmail.com", photo:"/assets/members/taleb.jpg", uni:"Tsinghua University",
      teams:[{ term:"2026–27", dept:"Outreach & Curation" }, { term:"2025–26", dept:"Outreach & Curation" }] },
    { id:"sia", name:"Sia", sort:"Sia", inducted:"2025", uni:"Tsinghua University",
      teams:[{ term:"2026–27", dept:"Outreach & Curation" }, { term:"2025–26", dept:"Outreach & Curation" }] },

    // ── 2024–25 team ──────────────────────────────────────────────────────
    { id:"brendon-tao", name:"Brendon Tao", sort:"Tao", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Operations" }] },
    { id:"roger-liu", name:"Roger Liu", sort:"Liu", inducted:"2024", field:"Smart Logistics", photo:"/assets/members/roger.jpg", uni:"Tsinghua University",
      roles:[{ term:"2025–26", role:"VP of Operations" }],
      teams:[{ term:"2024–25", dept:"Operations" }] },
    { id:"peter-marsh", name:"Peter Marsh", sort:"Marsh", inducted:"2024", field:"Data Science",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Operations" }] },
    { id:"leo", name:"Leo", sort:"Leo", inducted:"2024", field:"Ocean Engineering",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Outreach" }] },
    { id:"eric-ling", name:"Eric Ling", sort:"Ling", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Marketing & Branding" }] },
    { id:"rice", name:"Rice", sort:"Rice", inducted:"2024", field:"Architecture",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Marketing" }],
      teams:[{ term:"2025–26", dept:"Marketing & Branding" }] },
    { id:"dario", name:"Dario", sort:"Dario", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Outreach & Curation" }] }
  ];

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

  var PAST_TERMS = TERMS.filter(function (t) { return t !== CURRENT_TERM; });

  return {
    TERMS: TERMS, PAST_TERMS: PAST_TERMS, CURRENT_TERM: CURRENT_TERM, PEOPLE: PEOPLE,
    roleIn: roleIn, teamIn: teamIn, officersFor: officersFor, teamFor: teamFor,
    initials: initials, standing: standing, termsOf: termsOf
  };
})();
