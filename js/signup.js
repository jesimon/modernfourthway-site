/* Modern Fourth Way — free Chapter 1 + Great Map sign-up.
   Drop <div class="mfw-offer" data-source="home"></div> anywhere; this script renders the offer,
   subscribes the reader to the MFW Mailing List (Klaviyo), records the sign-up conversion
   (Google Ads + GA4), and hands over the downloads immediately. */
(function () {
  var KLAVIYO_COMPANY = 'XMCAwm', LIST = 'WBSKrw';
  var ADS_SIGNUP = 'AW-18462269872/yI65CL-P9IsdELDDv-NE';   // Google Ads "Email sign-up" conversion
  var FILES = [
    ['/free/The-Modern-Fourth-Way-Chapter-1.pdf', 'Chapter 1 &middot; PDF'],
    ['/free/The-Modern-Fourth-Way-Chapter-1.epub', 'Chapter 1 &middot; EPUB (Kindle, Apple Books)'],
    ['/free/The-Great-Map-of-The-Modern-Fourth-Way.pdf', 'The Great Map &middot; full resolution']
  ];

  var css = '' +
    '.mfw-offer{font-family:Georgia,"Times New Roman",serif;color:#d6d2c4;background:#1c2144;border:1px solid rgba(232,200,140,.35);' +
    'border-radius:6px;padding:26px 26px 22px;max-width:620px;box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:left;line-height:1.6;}' +
    '.mfw-offer .mo-eyebrow{font-family:Avenir,"Segoe UI",system-ui,sans-serif;font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;color:#8a91b8;}' +
    '.mfw-offer h3{font-weight:normal;color:#e8c88c;font-size:24px;line-height:1.25;margin:8px 0 10px;}' +
    '.mfw-offer p{margin:0 0 12px;font-size:15.5px;}' +
    '.mfw-offer ul{margin:0 0 14px 18px;padding:0;font-size:15px;}.mfw-offer li{margin:0 0 4px;}' +
    '.mfw-offer form{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;}' +
    '.mfw-offer input{flex:1 1 160px;min-width:0;background:#151936;border:1px solid rgba(232,200,140,.35);color:#efe9da;font-family:Georgia,serif;font-size:16px;padding:11px 13px;border-radius:3px;}' +
    '.mfw-offer input:focus{outline:none;border-color:#e8c88c;}' +
    '.mfw-offer button{flex:1 1 100%;font-family:Avenir,"Segoe UI",system-ui,sans-serif;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;' +
    'background:#e8c88c;color:#151936;border:1px solid #e8c88c;padding:14px 20px;border-radius:3px;}' +
    '.mfw-offer button:hover{background:#f1d8a6;}.mfw-offer button:disabled{opacity:.6;cursor:default;}' +
    '.mfw-offer .mo-fine{font-size:12.5px;color:#8a91b8;margin-top:10px;font-style:italic;}' +
    '.mfw-offer .mo-err{color:#e8a0a0;font-size:14px;flex-basis:100%;}' +
    '.mfw-offer .mo-dl a{display:block;border:1px solid rgba(232,200,140,.5);color:#e8c88c;padding:11px 14px;margin:8px 0;border-radius:3px;text-decoration:none;font-size:15px;}' +
    '.mfw-offer .mo-dl a:hover{background:rgba(232,200,140,.08);text-decoration:none;}' +
    '.mfw-offer .mo-dl a:before{content:"\\2913\\00a0\\00a0";}' +
    '.mfw-offer.compact{padding:20px 20px 16px;}.mfw-offer.compact h3{font-size:20px;}.mfw-offer.compact ul{display:none;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var COPY = {
    map: { eyebrow: 'Free download', h: 'Get the full-resolution Great Map &mdash; plus Chapter 1',
      p: 'Print-quality PDF of the whole map, and the complete first chapter of <em>The Modern Fourth Way</em> as a PDF and EPUB.' },
    def: { eyebrow: 'Start free', h: 'Read Chapter 1 &mdash; and get the Great Map',
      p: 'The complete first chapter of <em>The Modern Fourth Way</em>, ready for any device, plus the full-resolution Great Map of the whole path.' }
  };

  function render(el) {
    var src = el.getAttribute('data-source') || location.pathname;
    var c = COPY[el.getAttribute('data-copy')] || COPY.def;
    if (el.getAttribute('data-variant') === 'compact') el.classList.add('compact');
    el.innerHTML =
      '<div class="mo-eyebrow">' + c.eyebrow + '</div><h3>' + c.h + '</h3><p>' + c.p + '</p>' +
      '<ul><li>Chapter 1 &mdash; <em>Do You Feel Incomplete?</em> &mdash; as PDF and EPUB</li>' +
      '<li>The Great Map, full resolution, ready to print</li>' +
      '<li>Then a few short notes over two weeks: one practice at a time, to test the ideas in your own life</li></ul>' +
      '<form novalidate><input type="text" name="first" placeholder="First name" autocomplete="given-name">' +
      '<input type="email" name="email" placeholder="Email address" autocomplete="email" required>' +
      '<button type="submit">Send me the free chapter</button><div class="mo-err" aria-live="polite"></div></form>' +
      '<div class="mo-fine">No noise. Unsubscribe anytime. Your email is never shared.</div>';
    var form = el.querySelector('form'), err = el.querySelector('.mo-err'), btn = el.querySelector('button');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = form.first.value.trim(), email = form.email.value.trim();
      err.textContent = '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email address.'; return; }
      btn.disabled = true; btn.textContent = 'One moment…';
      fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + KLAVIYO_COMPANY, {
        method: 'POST', headers: { 'Content-Type': 'application/json', revision: '2024-10-15' },
        body: JSON.stringify({ data: { type: 'subscription', attributes: {
          custom_source: 'Free chapter + map · ' + src,
          profile: { data: { type: 'profile', attributes: { email: email, first_name: first || undefined,
            properties: { mfw_lead_magnet: 'chapter1_map', mfw_signup_page: location.pathname } } } } },
          relationships: { list: { data: { type: 'list', id: LIST } } } } })
      }).then(function (r) {
        if (r.status !== 202) throw new Error('status ' + r.status);
        try {
          if (window.gtag) {
            gtag('event', 'conversion', { send_to: ADS_SIGNUP, value: 3.0, currency: 'USD' });
            gtag('event', 'generate_lead', { lead_source: src, method: 'free_chapter_map' });
          }
        } catch (x) {}
        el.innerHTML = '<div class="mo-eyebrow">Here you go' + (first ? ', ' + first.replace(/[<>&"]/g, '') : '') + '</div>' +
          '<h3>Your free chapter and the Great Map</h3>' +
          '<div class="mo-dl">' + FILES.map(function (f) { return '<a href="' + f[0] + '" download>' + f[1] + '</a>'; }).join('') + '</div>' +
          '<p style="margin-top:14px">One more step: we&rsquo;ve sent a short confirmation email. Click the link in it and the practice notes will start arriving &mdash; the first one with these same downloads, so you&rsquo;ll always have them.</p>' +
          '<div class="mo-fine">Not seeing it? Check Promotions or Spam for a message from info@modernfourthway.org.</div>';
      }).catch(function () {
        err.textContent = 'Something went wrong — please try again in a moment.';
        btn.disabled = false; btn.textContent = 'Send me the free chapter';
      });
    });
  }
  function init() { Array.prototype.forEach.call(document.querySelectorAll('.mfw-offer'), render); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
