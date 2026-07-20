const openCard = document.getElementById('openCard');
const invitation = document.getElementById('invitation');
const scrollHint = document.querySelector('.scroll-hint');
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
const toast = document.getElementById('toast');
const countdown = document.getElementById('countdown');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

openCard.addEventListener('click', () => {
  invitation.classList.remove('hidden');
  scrollHint.classList.add('visible');
  openCard.textContent = 'أهلاً بكم في فرحتنا 🤍';
  openCard.disabled = true;
  setTimeout(() => invitation.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
  createPetals(24);
});

function updateCountdown() {
  const target = new Date(countdown.dataset.date).getTime();
  const distance = target - Date.now();

  if (distance <= 0) {
    countdown.innerHTML = '<p style="grid-column:1/-1;font-size:1.3rem">اليوم موعد فرحتنا 🤍</p>';
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  document.getElementById('days').textContent = String(Math.floor(distance / day)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((distance % day) / hour)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((distance % hour) / minute)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

musicBtn.addEventListener('click', async () => {
  const hasSource = music.querySelector('source');
  if (!hasSource) {
    showToast('أضف ملف music.mp3 لتفعيل الموسيقى');
    return;
  }

  try {
    if (music.paused) {
      await music.play();
      musicBtn.classList.add('playing');
      musicBtn.textContent = '♪';
    } else {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '♫';
    }
  } catch {
    showToast('تعذّر تشغيل الموسيقى');
  }
});

document.getElementById('addCalendar').addEventListener('click', () => {
  const start = '20260802T163000Z';
  const end = '20260802T193000Z';
  const title = encodeURIComponent('حفل زفاف صهيب وأريج');
  const details = encodeURIComponent('يسعدنا حضوركم ومشاركتكم فرحتنا');
  const location = encodeURIComponent('قاعات الكرم للإحتفالات، Army St, Zarqa');
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  window.open(url, '_blank', 'noopener');
});

function createPetals(count) {
  const container = document.querySelector('.petals');
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = i % 2 ? '✦' : '❀';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${10 + Math.random() * 16}px`;
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petal.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 13000);
  }
}
