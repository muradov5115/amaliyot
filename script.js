const FORM = document.getElementById('login-form');
const USER = document.getElementById('username');
const PASS = document.getElementById('password');
const MSG = document.getElementById('message');
const LOGIN_BTN = document.getElementById('login-btn');
const DEMO_BTN = document.getElementById('demo-btn');
const WELCOME = document.getElementById('welcome');
const LOGOUT = document.getElementById('logout');
const CORRECT_USERNAME = 'astro@mars.space';
const CORRECT_PASSWORD = 'Mars2025!';
zconst MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 30;
let lockTimeout = null;
function setMessage(text, color = '#ffb3a0') {
  MSG.style.color = color;
  MSG.textContent = text;
}
function lockForm(seconds) {
  LOGIN_BTN.disabled = true;
  USER.disabled = true;
  PASS.disabled = true;
  setMessage(`Ko'p xatolik: forma ${seconds} soniya bloklandi`);
  let remaining = seconds;
  lockTimeout = setInterval(() => {
    remaining--;
    setMessage(`Ko'p xatolik: forma ${remaining} soniya bloklandi`);
    if (remaining <= 0) {
      clearInterval(lockTimeout);
      unlockForm();
    }
  }, 1000);
}
function unlockForm() {
  LOGIN_BTN.disabled = false;
  USER.disabled = false;
  PASS.disabled = false;
  attempts = 0;
  setMessage('', '#a0e6a8');
}
function isValidInput(v) {
  return typeof v === 'string' && v.trim().length >= 3;
}
FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  if (LOGIN_BTN.disabled) return;
  const u = USER.value.trim();
  const p = PASS.value;
  if (!isValidInput(u) || !isValidInput(p)) {
    setMessage('Iltimos foydalanuvchi va parolni toʻgʻri kiriting.');
    return;
  }
  if (u === CORRECT_USERNAME && p === CORRECT_PASSWORD) {
    setMessage('Muvoffaqiyat! Tizimga kirdingiz...', '#a0e6a8');
    showWelcome();
  } else {
    attempts++;
    setMessage(`Noto'g'ri foydalanuvchi yoki parol. (${attempts}/${MAX_ATTEMPTS})`);
    if (attempts >= MAX_ATTEMPTS) {
      lockForm(LOCK_SECONDS);
    }
  }
});
DEMO_BTN.addEventListener('click', () => {
  USER.value = CORRECT_USERNAME;
  PASS.value = CORRECT_PASSWORD;
  setMessage('Demo ma\'lumot qo\'yildi — "Kirish" tugmasini bosing.', '#a0e6a8');
});
function showWelcome() {
  document.querySelector('.login-form').classList.add('hidden');
  WELCOME.classList.remove('hidden');
  setTimeout(() => {
    WELCOME.querySelector('p').textContent = 'Asosiy sahifa yuklandi — bu demo. (Bu yerga haqiqiy redirect qo\'ying)';
  }, 1200);
}
LOGOUT && LOGOUT.addEventListener('click', () => {
  WELCOME.classList.add('hidden');
  document.querySelector('.login-form').classList.remove('hidden');
  USER.value = '';
  PASS.value = '';
  setMessage('', '#a0e6a8');
  unlockForm();
});
setMessage('', '#a0e6a8');