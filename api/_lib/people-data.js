/* GCA people — the single source of truth for the Leadership and Members pages.
 *
 * This module is SERVER-SIDE ONLY. It is never shipped to the browser as-is.
 * Two endpoints read from it:
 *   /api/people-public  no auth, returns publicView() — what the public
 *                       Leadership page renders.
 *   /api/people         requires a verified Firebase ID token, returns the
 *                       full records that back the member directory.
 *
 * One record per person. A person who served several terms is listed once:
 *   roles[]  officer terms  { term, role }
 *   teams[]  department terms { term, dept }
 *   sort     family name used for directory ordering (names are written in
 *            mixed conventions, so this is set explicitly rather than guessed)
 *   inducted year the person joined GCA (not a graduation class)
 *   email    contact shown in the member directory; omit when unknown
 *
 * PRIVATE_FIELDS below never leave the server without an authenticated caller.
 */

  var TERMS = ["2026–27", "2025–26", "2024–25"];
  var CURRENT_TERM = "2026–27";
  var ROLE_ORDER = ["Founder & President", "President",
                    "VP of Operations", "VP of Marketing", "VP of Outreach",
                    "Secretary General", "Finance Director", "Consultant"];

  var PEOPLE = [
    // ── Officers ──────────────────────────────────────────────────────────
    { id:"felix-gan", name:"Felix Gan", sort:"Gan", inducted:"2024", photo:"/assets/members/felix.jpg",
      uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"President" }, { term:"2025–26", role:"President" },
             { term:"2024–25", role:"Founder & President" }] },
    { id:"alex-feldman", name:"Alex Feldman", sort:"Feldman", inducted:"2023",
      uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Outreach" }, { term:"2025–26", role:"VP of Outreach" }] },
    { id:"immer-feng", name:"Immer Feng", sort:"Feng", inducted:"2025", photo:"/assets/members/immer-feng.jpg",
      uni:"Peking University",
      roles:[{ term:"2026–27", role:"Secretary General" }, { term:"2025–26", role:"Secretary General" }] },
    { id:"sophia-dooly", name:"Sophia Dooly", sort:"Dooly", inducted:"2025", uni:"Tsinghua University",
      roles:[{ term:"2025–26", role:"Consultant" }] },
    { id:"jiani-mao", name:"Jiani Mao", sort:"Mao", inducted:"2024", uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"Finance Director" }] },

    // ── 2025–26 team ──────────────────────────────────────────────────────
    { id:"mikolaj-palacz", name:"Mikolaj Palacz", sort:"Palacz", inducted:"2025",
      uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Social Events Organization"] },
    { id:"melliou-katerina", name:"Melliou Katerina", sort:"Melliou", inducted:"2025", photo:"/assets/members/katerina.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Social Events Organization"] },
    { id:"li-yuan", name:"Li Yuan", sort:"Li", inducted:"2025", photo:"/assets/members/li-yuan.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Social Events Organization", "Outreach"] },
    { id:"roman", name:"Roman", sort:"Roman", inducted:"2025", photo:"/assets/members/roman.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Operations — logistics", "Marketing — promotion", "Outreach — reaching out & sponsorship"] },
    { id:"alper-avci", name:"Alper Avci", sort:"Avci", inducted:"2025", photo:"/assets/members/alper.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Operations"] },
    { id:"aya", name:"Aya", sort:"Aya", inducted:"2024", photo:"/assets/members/aya.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2026–27", dept:"Operations" }, { term:"2025–26", dept:"Operations" }],
      prefs:["Operations"] },
    { id:"akter-nayema", name:"Akter Nayema", sort:"Akter", inducted:"2025", photo:"/assets/members/nayema-akter.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Operations" }],
      prefs:["Operations"] },
    { id:"timotius-kelvin", name:"Timotius Kelvin", sort:"Kelvin", inducted:"2025", photo:"/assets/members/timotius-kelvin.jpg", uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Marketing" }, { term:"2025–26", role:"VP of Marketing" }],
      prefs:["Marketing", "Outreach", "Operations"], ranked:true },
    { id:"durdieva-kumush", name:"Durdieva Kumush Khemraevna", sort:"Durdieva", inducted:"2025", photo:"/assets/members/kumush.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }],
      prefs:["Marketing", "Operations", "Outreach"], ranked:true },
    { id:"naomi-okanda", name:"Naomi imali okanda", sort:"Okanda", inducted:"2025", photo:"/assets/members/naomi.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }],
      prefs:["Marketing"] },
    { id:"jonathan-lan", name:"Jonathan Lan", sort:"Lan", inducted:"2024", photo:"/assets/members/jonathan.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }],
      prefs:["Marketing"] },
    { id:"oualid", name:"Oualid", sort:"Oualid", inducted:"2025", photo:"/assets/members/oualid.jpg", uni:"Harbin Institute of Technology", teams:[{ term:"2025–26", dept:"Marketing & Branding" }],
      prefs:["Marketing"] },
    { id:"laylo-saidova", name:"Laylo Saidova", sort:"Saidova", inducted:"2025", photo:"/assets/members/laylo.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Marketing & Branding" }],
      prefs:["Marketing", "Operations"] },
    { id:"anita-keo", name:"Anita Keo", sort:"Keo", inducted:"2025", photo:"/assets/members/anita.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Outreach & Curation" }],
      prefs:["Outreach", "Operations", "Marketing"], ranked:true },
    { id:"artur-ziganshin", name:"Ziganshin Artur Radikovich", sort:"Ziganshin", inducted:"2025", photo:"/assets/members/artur.jpg", uni:"Tsinghua University",
      roles:[{ term:"2026–27", role:"VP of Operations" }],
      teams:[{ term:"2025–26", dept:"Outreach & Curation" }],
      prefs:["Outreach"] },
    { id:"yaochen", name:"yaochen", sort:"Yaochen", inducted:"2025", photo:"/assets/members/yaochen.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Outreach & Curation" }],
      prefs:["Outreach"] },
    { id:"taleb-alhajji", name:"Taleb Alhajji", sort:"Alhajji", inducted:"2025", photo:"/assets/members/taleb.jpg", uni:"Tsinghua University", teams:[{ term:"2025–26", dept:"Outreach & Curation" }],
      prefs:["Outreach"] },
    { id:"sia", name:"Sia", sort:"Sia", inducted:"2025", uni:"Tsinghua University",
      teams:[{ term:"2026–27", dept:"Outreach & Curation" }, { term:"2025–26", dept:"Outreach & Curation" }],
      prefs:["Operations"] },

    // ── 2024–25 team ──────────────────────────────────────────────────────
    { id:"brendon-tao", name:"Brendon Tao", sort:"Tao", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Operations" }] },
    { id:"roger-liu", name:"Roger Liu", sort:"Liu", inducted:"2024", photo:"/assets/members/roger.jpg", uni:"Tsinghua University",
      roles:[{ term:"2025–26", role:"VP of Operations" }],
      teams:[{ term:"2024–25", dept:"Operations" }] },
    { id:"peter-marsh", name:"Peter Marsh", sort:"Marsh", inducted:"2024",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Operations" }] },
    { id:"leo", name:"Leo", sort:"Leo", inducted:"2024",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Outreach" }] },
    { id:"eric-ling", name:"Eric Ling", sort:"Ling", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Marketing & Branding" }] },
    { id:"rice", name:"Rice", sort:"Rice", inducted:"2024",
      uni:"Tsinghua University",
      roles:[{ term:"2024–25", role:"VP of Marketing" }] },
    { id:"dario", name:"Dario", sort:"Dario", inducted:"2024",
      uni:"Tsinghua University", teams:[{ term:"2024–25", dept:"Outreach & Curation" }] }
  ];

// Fields the public Leadership page has no use for. `email` is the reason the
// member directory is gated at all; `sort` only exists for directory ordering.
var PRIVATE_FIELDS = ['email', 'sort'];

function publicView() {
  return PEOPLE.map(function (person) {
    var copy = {};
    Object.keys(person).forEach(function (key) {
      if (PRIVATE_FIELDS.indexOf(key) === -1) copy[key] = person[key];
    });
    return copy;
  });
}

module.exports = {
  TERMS: TERMS,
  CURRENT_TERM: CURRENT_TERM,
  ROLE_ORDER: ROLE_ORDER,
  PEOPLE: PEOPLE,
  PRIVATE_FIELDS: PRIVATE_FIELDS,
  publicView: publicView,
};
