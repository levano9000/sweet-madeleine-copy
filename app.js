
/* ══ CONFIG ══ */
const BOT_TOKEN = '8783499914:AAG9YnVFb3lr954E4Y-4EtEe5h0stkoY4z8';
const CHAT_ID   = '7399321088';

const ROCKET_SVG = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="M12 15c-1.5-1.5-3-3-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>';
const SPINNER_SVG = '<span class="icon-spin" aria-hidden="true"></span>';

/* ══ FAQ ACCORDION ══ */
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (!open) btn.setAttribute('aria-expanded', 'true');
  });
});

/* ══ COOKIE BANNER ══ */
(function () {
  var KEY = 'sms_cookie_ok';
  var banner = document.getElementById('cookieBanner');
  var btn = document.getElementById('cookieAcceptBtn');
  if (!banner || !btn) return;
  var accepted = false;
  try { accepted = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!accepted) {
    setTimeout(function () { banner.classList.add('is-open'); }, 600);
  }
  btn.addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    banner.classList.remove('is-open');
  });
})();

/* ══ GLOBAL FORM STATE ══ */
var _formState = { vid: '', volume: '' };

/* ══ NAVBAR SCROLL ══ */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', function() {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ══ BURGER MENU ══ */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', function() {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(function(a) {
  a.addEventListener('click', function() {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ══ SCROLL TO FORM ══ */
function scrollToForm() {
  document.getElementById('bottomForm').scrollIntoView({ behavior: 'smooth' });
}

/* ══ FILE UPLOAD UI ══ */
function setupFileInput(inputId, btnId, labelId) {
  var input = document.getElementById(inputId);
  var btn   = document.getElementById(btnId);
  var label = document.getElementById(labelId);
  if (!input || !btn) return;
  input.addEventListener('change', function() {
    if (this.files[0]) {
      var name = this.files[0].name;
      label.textContent = name.length > 28 ? name.slice(0, 25) + '…' : name;
      btn.classList.add('has-file');
    }
  });
}
setupFileInput('fileInput',  'heroUploadBtn',   'heroFileName');
setupFileInput('fileInput2', 'bottomUploadBtn', 'bottomFileName');

/* ══ SCROLL REVEAL ══ */
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      setTimeout(function() { entry.target.classList.add('visible'); }, 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function(el, i) {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  revealObs.observe(el);
});

/* ══ PHONE AUTO-FORMAT ══ */
function formatPhone(raw) {
  var digits = raw.replace(/\D/g, '');
  // normalize 8 → 7, auto-prepend 7
  if (digits.length > 0) {
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    else if (digits[0] !== '7') digits = '7' + digits;
  }
  // build formatted string
  var d = digits;
  var out = '';
  if (d.length >= 1)  out = '+' + d[0];
  if (d.length >= 2)  out += ' (' + d.slice(1, Math.min(4, d.length));
  if (d.length >= 4)  out += ')';
  if (d.length >= 5)  out += ' ' + d.slice(4, Math.min(7, d.length));
  if (d.length >= 7)  out += '-' + d.slice(7, Math.min(9, d.length));
  if (d.length >= 9)  out += '-' + d.slice(9, Math.min(11, d.length));
  return out;
}

var mPhone = document.getElementById('mPhone');

mPhone.addEventListener('input', function(e) {
  var pos = this.selectionStart;
  var prev = this.value;
  var digits = prev.replace(/\D/g, '');
  // clamp to 11 digits
  if (digits.length > 11) digits = digits.slice(0, 11);
  var formatted = digits.length === 0 ? '' : formatPhone(digits);
  this.value = formatted;
  // try to keep cursor near end
  var newLen = formatted.length;
  var oldLen = prev.length;
  var diff = newLen - oldLen;
  try { this.setSelectionRange(pos + diff, pos + diff); } catch(ex) {}
});

mPhone.addEventListener('paste', function() {
  var self = this;
  setTimeout(function() {
    var digits = self.value.replace(/\D/g, '').slice(0, 11);
    self.value = digits.length === 0 ? '' : formatPhone(digits);
  }, 0);
});

/* ══ TELEGRAM AUTO-@ ══ */
var mTg = document.getElementById('mTg');
mTg.addEventListener('blur', function() {
  var val = this.value.trim();
  if (val && !val.startsWith('@')) {
    this.value = '@' + val;
  }
});

/* ══ MODAL ══ */
var _modalSource = '';

function openModal(source) {
  _modalSource = source;
  var vid = '', volume = '';

  if (source === 'hero') {
    vid    = document.getElementById('heroVid').value;
    volume = document.getElementById('heroVolume').value;
    _formState.vid    = vid;
    _formState.volume = volume;
  } else if (source === 'bottom') {
    vid    = document.getElementById('bottomVid').value;
    volume = document.getElementById('bottomVolume').value;
    _formState.vid    = vid;
    _formState.volume = volume;
  } else {
    // 'offer', 'nav', and other sources: use last saved state
    vid    = _formState.vid;
    volume = _formState.volume;
  }

  document.getElementById('mVid').value    = vid;
  document.getElementById('mVolume').value = volume;
  document.getElementById('mFio').value    = '';
  document.getElementById('mPhone').value  = '';
  document.getElementById('mTg').value     = '';

  document.getElementById('modalFormWrap').style.display = 'block';
  document.getElementById('modalSuccess').style.display  = 'none';
  document.getElementById('modalError').style.display    = 'none';

  var btn = document.getElementById('modalSubmitBtn');
  btn.innerHTML = ROCKET_SVG + 'Отправить заявку';
  btn.disabled = false;

  document.getElementById('modalOverlay').classList.add('open');
  // iOS fix: prevent background scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = '-' + (window.scrollY || 0) + 'px';
}

function closeModal() {
  var scrollY = parseInt(document.body.style.top || '0') * -1;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

async function submitModal() {
  var vid    = document.getElementById('mVid').value.trim();
  var volume = document.getElementById('mVolume').value.trim();
  var fio    = document.getElementById('mFio').value.trim();
  var phone  = document.getElementById('mPhone').value.trim();
  var tgRaw  = document.getElementById('mTg').value.trim();
  var errEl  = document.getElementById('modalError');
  var btn    = document.getElementById('modalSubmitBtn');

  errEl.style.display = 'none';

  if (!vid || !volume || !fio || !phone) {
    errEl.textContent = 'Пожалуйста, заполните все обязательные поля (*).';
    errEl.style.display = 'block';
    return;
  }

  // Phone validation: 10–11 digits (с кодом или без)
  var phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 12) {
    errEl.textContent = 'Введите корректный номер телефона';
    errEl.style.display = 'block';
    return;
  }

  // Ensure @ prefix on telegram
  var tg = tgRaw;
  if (tg && !tg.startsWith('@')) tg = '@' + tg;

  btn.innerHTML = SPINNER_SVG + 'Отправляем...';
  btn.disabled = true;

  var now  = new Date();
  var date = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  var time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  var file1 = document.getElementById('fileInput').files[0];
  var file2 = document.getElementById('fileInput2').files[0];
  var attachedFile = file1 || file2 || null;

  // Используем HTML-форматирование вместо Markdown (надёжнее)
  var text = [
    '📋 <b>Новая заявка — ' + date + ' в ' + time + '</b>',
    '',
    '🏷 <b>Вид:</b> ' + vid,
    '📦 <b>Объём:</b> ' + volume + ' шт',
    '👤 <b>Имя:</b> ' + fio,
    '📞 <b>Телефон:</b> ' + phone,
    tg ? '💬 <b>Telegram:</b> ' + tg : '💬 <b>Telegram:</b> не указан',
    attachedFile ? '📎 <b>Макет:</b> ' + attachedFile.name : '📎 <b>Макет:</b> не прикреплён',
  ].join('\n');

  // Fetch с таймаутом 12 сек (на мобилке без таймаута fetch зависает навсегда)
  function fetchWithTimeout(url, opts, ms) {
    var ctrl = new AbortController();
    var timer = setTimeout(function() { ctrl.abort(); }, ms);
    return fetch(url, Object.assign({}, opts, { signal: ctrl.signal }))
      .finally(function() { clearTimeout(timer); });
  }

  try {
    var res = await fetchWithTimeout(
      'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'HTML' })
      },
      12000
    );
    var data = await res.json();
    if (!data.ok) throw new Error(data.description);

    if (attachedFile) {
      var fd = new FormData();
      fd.append('chat_id', CHAT_ID);
      fd.append('caption', '📎 Макет от ' + fio);
      var isImg = attachedFile.type.startsWith('image/');
      fd.append(isImg ? 'photo' : 'document', attachedFile);
      await fetchWithTimeout(
        'https://api.telegram.org/bot' + BOT_TOKEN + '/' + (isImg ? 'sendPhoto' : 'sendDocument'),
        { method: 'POST', body: fd },
        15000
      );
    }

    document.getElementById('modalFormWrap').style.display = 'none';
    document.getElementById('modalSuccess').style.display  = 'block';
    setTimeout(closeModal, 3500);

  } catch(e) {
    var msg = e.name === 'AbortError'
      ? 'Превышено время ожидания. Проверьте соединение и попробуйте снова.'
      : 'Ошибка отправки: ' + (e.message || 'нет соединения');
    errEl.textContent = msg;
    errEl.style.display = 'block';
    btn.innerHTML = ROCKET_SVG + 'Отправить заявку';
    btn.disabled  = false;
  }
}

/* ══ UNIVERSAL CAROUSEL ══ */
function initCarousel(trackId, dotsId, cardSel, maxStops) {
  var track = document.getElementById(trackId);
  var dotsContainer = document.getElementById(dotsId);
  if (!track || !dotsContainer) return;
  var cards = Array.from(track.querySelectorAll(cardSel || ':scope > *'));
  if (cards.length < 2) return;

  var stops = [];  // scrollLeft positions

  function recomputeStops() {
    var maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    stops = [];
    if (maxStops && maxStops > 0) {
      // Distribute exactly N stops evenly across the scrollable range.
      var n = Math.min(maxStops, cards.length);
      if (n < 2) { stops.push(0); return; }
      for (var i = 0; i < n; i++) {
        stops.push((maxScroll * i) / (n - 1));
      }
      return;
    }
    // Default: one stop per card, deduplicated where multiple cards clamp to the same scrollLeft
    var seen = {};
    cards.forEach(function(c) {
      var target = Math.max(0, Math.min(c.offsetLeft - 16, maxScroll));
      var key = Math.round(target);
      if (seen[key] === undefined) {
        seen[key] = stops.length;
        stops.push(target);
      }
    });
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    stops.forEach(function(targetLeft, i) {
      var dot = document.createElement('button');
      dot.className = 'c-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.onclick = function() {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      };
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    var scrollLeft = track.scrollLeft;
    var closest = 0, minDist = Infinity;
    stops.forEach(function(s, i) {
      var dist = Math.abs(s - scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dotsContainer.querySelectorAll('.c-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === closest);
    });
  }

  function rebuild() {
    recomputeStops();
    buildDots();
    updateDots();
  }

  track.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', rebuild);

  // Initial pass after layout has settled
  rebuild();
  setTimeout(rebuild, 80);
}

// Portfolio — всегда карусель, 3 равноотстоящие точки
initCarousel('portfolioCarousel', 'portfolioDots', '.portfolio-card', 3);

// Benefits / Offer / Reviews — карусель только на мобилке
function initMobileCarousels() {
  if (window.innerWidth <= 600) {
    initCarousel('benefitsGrid',  'benefitsDots',  '.benefit-card');
    initCarousel('offerGrid',     'offerDots',      '.offer-card');
    initCarousel('reviewsGrid',   'reviewsDots',    '.review-card');
  }
}
initMobileCarousels();
window.addEventListener('resize', initMobileCarousels);

// ── Стрелки для каруселей ──
function addArrows(wrapperId, trackId, cardSel) {
  var wrapper = document.getElementById(wrapperId);
  var track = document.getElementById(trackId);
  if (!wrapper || !track) return;

  var prev = document.createElement('button');
  var next = document.createElement('button');
  prev.className = 'carr-btn carr-prev';
  next.className = 'carr-btn carr-next';
  prev.innerHTML = '&#8249;';
  next.innerHTML = '&#8250;';

  function getCards() {
    return Array.from(track.querySelectorAll(cardSel || ':scope > *'));
  }

  function updateArrows() {
    // Hide the arrows entirely when the track has no horizontal overflow
    // (e.g. benefits/offer/reviews grids on desktop where all cards already fit).
    var hasOverflow = track.scrollWidth - track.clientWidth > 4;
    if (!hasOverflow) {
      prev.style.display = 'none';
      next.style.display = 'none';
      return;
    }
    prev.style.display = '';
    next.style.display = '';
    var atStart = track.scrollLeft <= 4;
    var atEnd   = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    prev.style.opacity = atStart ? '0.25' : '1';
    prev.style.pointerEvents = atStart ? 'none' : 'auto';
    next.style.opacity = atEnd ? '0.25' : '1';
    next.style.pointerEvents = atEnd ? 'none' : 'auto';
  }

  function scroll(dir) {
    var cards = getCards();
    if (!cards.length) return;
    // Найти текущую карточку по scrollLeft
    var scrollLeft = track.scrollLeft;
    var currentIdx = 0;
    var minDist = Infinity;
    cards.forEach(function(c, i) {
      var dist = Math.abs(c.offsetLeft - (track.offsetLeft || 0) - scrollLeft);
      if (dist < minDist) { minDist = dist; currentIdx = i; }
    });
    var targetIdx = Math.max(0, Math.min(cards.length - 1, currentIdx + dir));
    var targetCard = cards[targetIdx];
    track.scrollTo({ left: targetCard.offsetLeft - (track.offsetLeft || 0), behavior: 'smooth' });
  }

  prev.onclick = function() { scroll(-1); };
  next.onclick = function() { scroll(1); };

  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);

  wrapper.style.position = 'relative';
  wrapper.appendChild(prev);
  wrapper.appendChild(next);

  // Инициализируем состояние стрелок
  setTimeout(updateArrows, 100);
}

addArrows('portfolioWrap', 'portfolioCarousel', '.portfolio-card');
addArrows('benefitsWrap',  'benefitsGrid',      '.benefit-card');
addArrows('offerWrap',     'offerGrid',          '.offer-card');
addArrows('reviewsWrap',   'reviewsGrid',        '.review-card');

/* ══ SPOTLIGHT CURSOR — purple tint on light sections, idle on dark ══ */
(function () {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  var canvas = document.getElementById('spotlight');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var mx = -9999, my = -9999;
  var onDark = false;

  function resize() {
    canvas.width  = Math.round(window.innerWidth  * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function isDarkAt(x, y) {
    // Spotlight pointer-events:none so elementFromPoint sees the real element below.
    var el = document.elementFromPoint(x, y);
    while (el && el !== document.body) {
      if (el.tagName === 'NAV' || el.tagName === 'FOOTER') return true;
      if (el.classList && (
        el.classList.contains('hero') ||
        el.classList.contains('steps-section')
      )) return true;
      el = el.parentElement;
    }
    return false;
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (mx > -1000) {
      var g = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      if (onDark) {
        // Dark sections — soft white glow that lifts the surface
        canvas.style.mixBlendMode = 'screen';
        g.addColorStop(0,   'rgba(255, 255, 255, 0.32)');
        g.addColorStop(0.45,'rgba(220, 200, 255, 0.14)');
        g.addColorStop(1,   'rgba(0, 0, 0, 0)');
      } else {
        // Light sections — pale violet tint
        canvas.style.mixBlendMode = 'multiply';
        g.addColorStop(0,   'rgba(176, 132, 224, 0.38)');  /* pale --purple-light */
        g.addColorStop(0.5, 'rgba(210, 188, 240, 0.20)');
        g.addColorStop(1,   'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    onDark = isDarkAt(mx, my);
  });
  window.addEventListener('mouseleave', function () { mx = -9999; my = -9999; });
  window.addEventListener('resize', resize);

  resize();
  requestAnimationFrame(draw);
})();

/* ══ HERO ROTATING NOUNS — per-rotator independent cycles ══ */
(function () {
  var rotators = document.querySelectorAll('.hero-rotator');
  rotators.forEach(function (rotator, rotatorIdx) {
    var words = rotator.querySelectorAll('.hero-rotator__word');
    if (words.length < 2) return;
    var i = 0;
    // Each rotator gets a slightly different interval so the two lines
    // don't tick in lockstep — feels more alive.
    var interval = 2600 + rotatorIdx * 400;
    setInterval(function () {
      var cur = words[i];
      cur.classList.remove('is-active');
      cur.classList.add('is-leaving');
      i = (i + 1) % words.length;
      var next = words[i];
      next.classList.add('is-active');
      setTimeout(function () {
        words.forEach(function (w) { if (w !== next) w.classList.remove('is-leaving'); });
      }, 600);
    }, interval);
  });
})();

/* ══ BENTO NUMBER COUNTERS ══ */
(function () {
  var nums = document.querySelectorAll('.bento-num');
  if (!nums.length || !('IntersectionObserver' in window)) {
    nums.forEach(function (el) { el.textContent = el.dataset.countTo; });
    return;
  }
  function animate(el) {
    var target = parseInt(el.dataset.countTo, 10) || 0;
    var dur = 1200;
    var t0 = performance.now();
    function step(t) {
      var p = Math.min(1, (t - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach(function (el) { io.observe(el); });
})();

/* ══ OFFER CARDS — mouse-following 3D tilt ══ */
(function () {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  var cards = document.querySelectorAll('.offer-card');
  if (!cards.length) return;
  cards.forEach(function (card) {
    var rect = null;
    var rafId = null;
    var tx = 0, ty = 0;
    function render() {
      card.style.transform = 'rotateX(' + tx.toFixed(2) + 'deg) rotateY(' + ty.toFixed(2) + 'deg) translateY(-6px)';
      rafId = null;
    }
    card.addEventListener('mouseenter', function () { rect = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', function (e) {
      if (!rect) rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      ty = (px - 0.5) * 8;
      tx = (0.5 - py) * 6;
      var thumb = card.querySelector('.offer-thumb');
      if (thumb) {
        thumb.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        thumb.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      }
      if (!rafId) rafId = requestAnimationFrame(render);
    });
    card.addEventListener('mouseleave', function () {
      rect = null;
      card.style.transform = '';
    });
  });
})();

/* ══ QUOTE FORMS — product cards, qty chips (hero + bottom) ══ */
(function () {
  function wireForm(opts) {
    var root = document.getElementById(opts.rootId);
    if (!root) return;
    var cards = root.querySelectorAll('.' + opts.cardClass);
    var chips = root.querySelectorAll('.' + opts.chipClass);
    var custom = document.getElementById(opts.volumeId);
    var vid = document.getElementById(opts.vidId);
    if (!cards.length || !chips.length || !custom || !vid) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { c.classList.remove('is-active'); });
        card.classList.add('is-active');
        vid.value = card.dataset.product;
      });
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        custom.value = chip.dataset.qty;
      });
    });

    custom.addEventListener('input', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
    });
  }

  wireForm({
    rootId: 'heroQuoteForm',
    cardClass: 'product-card',
    chipClass: 'qty-chip',
    volumeId: 'heroVolume',
    vidId: 'heroVid'
  });
  wireForm({
    rootId: 'bottomQuoteForm',
    cardClass: 'product-card-light',
    chipClass: 'qty-chip-light',
    volumeId: 'bottomVolume',
    vidId: 'bottomVid'
  });
})();
