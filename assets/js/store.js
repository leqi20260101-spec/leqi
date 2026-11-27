// 공통 기능: 쇼핑몰 설정, 장바구니, 가격 표시, 상품 이미지, 헤더/푸터

const SHOP = {
  name: 'LEQI',
  shippingFee: 3000,
  freeShippingMin: 50000,
  // ↓ 실제 운영 전 반드시 입력해야 하는 사업자 정보 (전자상거래법 표시 의무)
  company: '[상호명 입력]',
  ceo: '[대표자명 입력]',
  bizNo: '[사업자등록번호 입력]',
  mailOrderNo: '[통신판매업 신고번호 입력]',
  address: '[사업장 주소 입력]',
  phone: '[고객센터 번호 입력]',
  email: '[이메일 입력]',
  privacyOfficer: '[개인정보보호책임자 입력]',
  csHours: '평일 10:00 – 17:00 (점심 12:00 – 13:00, 주말·공휴일 휴무)',
  bank: '[은행명] [계좌번호] (예금주: [예금주])',
};

/* ---------- 저장소 (localStorage 사용 불가 시 메모리로 대체) ---------- */
const memoryStore = {};
const storage = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return key in memoryStore ? memoryStore[key] : fallback;
    }
  },
  set(key, value) {
    memoryStore[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* 무시 */ }
  },
  remove(key) {
    delete memoryStore[key];
    try { localStorage.removeItem(key); } catch (e) { /* 무시 */ }
  },
};

/* ---------- 유틸 ---------- */
const won = (n) => n.toLocaleString('ko-KR') + '원';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const getParam = (name) => new URLSearchParams(location.search).get(name);
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const finalPrice = (p) => p.salePrice ?? p.price;
const discountRate = (p) => (p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0);
const categoryLabel = (key) => (CATEGORIES.find((c) => c.key === key) || {}).label || '';
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- 장바구니 ---------- */
const CART_KEY = 'leqi_cart';

const Cart = {
  items() { return storage.get(CART_KEY, []); },
  save(items) { storage.set(CART_KEY, items); updateCartBadge(); },
  add({ id, color, size, qty }) {
    const items = this.items();
    const key = `${id}|${color}|${size}`;
    const found = items.find((i) => i.key === key);
    if (found) found.qty = Math.min(found.qty + qty, 99);
    else items.push({ key, id, color, size, qty });
    this.save(items);
  },
  setQty(key, qty) {
    const items = this.items();
    const item = items.find((i) => i.key === key);
    if (item) item.qty = Math.max(1, Math.min(99, qty));
    this.save(items);
  },
  remove(key) { this.save(this.items().filter((i) => i.key !== key)); },
  clear() { this.save([]); },
  count() { return this.items().reduce((s, i) => s + i.qty, 0); },
  // 장바구니 상품 + 금액 계산 (존재하지 않는 상품은 제외)
  detail() {
    const lines = this.items()
      .map((i) => ({ ...i, product: findProduct(i.id) }))
      .filter((i) => i.product)
      .map((i) => ({ ...i, unit: finalPrice(i.product), total: finalPrice(i.product) * i.qty }));
    const subtotal = lines.reduce((s, l) => s + l.total, 0);
    const shipping = subtotal === 0 || subtotal >= SHOP.freeShippingMin ? 0 : SHOP.shippingFee;
    return { lines, subtotal, shipping, total: subtotal + shipping };
  },
};

function updateCartBadge() {
  const badge = $('#cart-count');
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.hidden = n === 0;
}

/* ---------- 상품 이미지 (사진이 없을 때 표시할 일러스트) ---------- */
const SHAPES = {
  tee: '<path d="M140 90 L175 75 Q200 98 225 75 L260 90 L320 140 L290 182 L265 162 L265 400 L135 400 L135 162 L110 182 L80 140 Z"/>',
  knit: '<path d="M140 90 L175 75 Q200 98 225 75 L260 90 L300 130 L330 330 L295 336 L265 190 L265 400 L135 400 L135 190 L105 336 L70 330 L100 130 Z"/><path d="M135 385 H265" class="line"/>',
  coat: '<path d="M145 80 L180 70 L200 125 L220 70 L255 80 L300 120 L330 400 L295 406 L270 200 L272 440 L128 440 L130 200 L105 406 L70 400 L100 120 Z"/><path d="M200 125 V440" class="line"/><circle cx="210" cy="200" r="4" class="dot"/><circle cx="210" cy="260" r="4" class="dot"/><circle cx="210" cy="320" r="4" class="dot"/>',
  pants: '<path d="M140 80 L260 80 L278 440 L216 440 L200 190 L184 440 L122 440 Z"/><path d="M140 100 H260" class="line"/>',
  skirt: '<path d="M155 110 L245 110 L295 390 L105 390 Z"/><path d="M155 130 H245 M175 130 L160 390 M200 130 V390 M225 130 L240 390" class="line"/>',
  dress: '<path d="M165 80 L185 74 Q200 92 215 74 L235 80 L242 175 L300 430 L100 430 L158 175 Z"/><path d="M158 180 H242" class="line"/>',
  cap: '<path d="M120 270 Q120 160 205 160 Q290 160 290 270 Z"/><path d="M110 270 H340 Q340 298 290 298 H110 Z"/><circle cx="205" cy="160" r="7" class="dot"/>',
  bag: '<path d="M160 210 Q160 130 200 130 Q240 130 240 210" class="handle"/><path d="M115 210 L285 210 L300 410 L100 410 Z"/>',
};

function productImage(product, colorHex) {
  if (product.image) {
    return `<img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">`;
  }
  const fill = colorHex || product.colors[0].hex;
  return `<svg class="product-svg" viewBox="0 0 400 500" role="img" aria-label="${escapeHtml(product.name)}" style="--fill:${fill}">${SHAPES[product.shape] || SHAPES.tee}</svg>`;
}

function priceHtml(p) {
  if (p.salePrice) {
    return `<span class="price"><span class="discount">${discountRate(p)}%</span> ${won(p.salePrice)} <del>${won(p.price)}</del></span>`;
  }
  return `<span class="price">${won(p.price)}</span>`;
}

function productCard(p) {
  const tags = [p.isNew ? '<span class="tag">NEW</span>' : '', p.isBest ? '<span class="tag tag-dark">BEST</span>' : ''].join('');
  return `
    <a class="card" href="product.html?id=${p.id}">
      <div class="card-img">${productImage(p)}</div>
      <div class="card-body">
        <div class="swatches">${p.colors.map((c) => `<i style="background:${c.hex}" title="${c.name}"></i>`).join('')}</div>
        <h3 class="card-title">${escapeHtml(p.name)}</h3>
        ${priceHtml(p)}
        <div class="tags">${tags}</div>
      </div>
    </a>`;
}

/* ---------- 토스트 알림 ---------- */
function toast(message, link) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.innerHTML = escapeHtml(message) + (link ? ` <a href="${link.href}">${escapeHtml(link.text)}</a>` : '');
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ---------- 헤더 / 푸터 ---------- */
function renderLayout() {
  const header = $('#site-header');
  if (header) {
    const current = getParam('cat');
    const nav = [{ key: 'new', label: 'NEW' }, { key: 'best', label: 'BEST' }, ...CATEGORIES]
      .map((c) => `<a href="shop.html?cat=${c.key}" class="${current === c.key ? 'active' : ''}">${c.label}</a>`)
      .join('');
    header.innerHTML = `
      <div class="notice-bar">${won(SHOP.freeShippingMin)} 이상 구매 시 무료배송 · 신규 회원 10% 할인</div>
      <div class="header-inner container">
        <a href="index.html" class="logo">${SHOP.name}</a>
        <nav class="main-nav" aria-label="카테고리">${nav}</nav>
        <a href="cart.html" class="cart-link" aria-label="장바구니">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1.2 12H6.2L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span id="cart-count" class="badge" hidden>0</span>
        </a>
      </div>`;
  }

  const footer = $('#site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-top">
          <a href="index.html" class="logo">${SHOP.name}</a>
          <div class="footer-links">
            <a href="policy.html#terms">이용약관</a>
            <a href="policy.html#privacy"><strong>개인정보처리방침</strong></a>
            <a href="policy.html#shipping">배송·교환·반품 안내</a>
          </div>
        </div>
        <div class="footer-cols">
          <div>
            <h4>고객센터</h4>
            <p class="cs-phone">${SHOP.phone}</p>
            <p>${SHOP.csHours}</p>
            <p>${SHOP.email}</p>
          </div>
          <div>
            <h4>입금 계좌</h4>
            <p>${SHOP.bank}</p>
          </div>
          <div class="biz-info">
            <h4>사업자 정보</h4>
            <p>상호명 ${SHOP.company} · 대표자 ${SHOP.ceo}</p>
            <p>사업자등록번호 ${SHOP.bizNo} · 통신판매업신고 ${SHOP.mailOrderNo}</p>
            <p>주소 ${SHOP.address}</p>
            <p>개인정보보호책임자 ${SHOP.privacyOfficer}</p>
          </div>
        </div>
        <p class="copyright">© ${new Date().getFullYear()} ${SHOP.name}. All rights reserved.</p>
      </div>`;
  }
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', renderLayout);
