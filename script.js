const username = 'hildekeyf';
const proxy = 'https://api.allorigins.win/raw?url=';
const apiURL = `https://www.instagram.com/${username}/?__a=1&__d=dis`;

const profilePicEl = document.getElementById('profilePic');
const followerCountEl = document.getElementById('followerCount');
let lastCount = null;

async function updateInstagramData() {
  try {
    const res = await fetch(proxy + encodeURIComponent(apiURL));
    const data = await res.json();
    const user = data.graphql.user;

    // Update follower count
    const count = user.edge_followed_by.count;
    if (count !== lastCount) {
      followerCountEl.textContent = count.toLocaleString();

      if (lastCount !== null && count > lastCount) {
        confettiCanvas();
      }

      lastCount = count;
    }
  } catch (err) {
    console.error('Failed to fetch Instagram data:', err);
  }
}

function confettiCanvas() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti(Object.assign({}, defaults, { particleCount: 50, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
  }, 250);
}

window.addEventListener('load', () => {
  updateInstagramData();
  setInterval(updateInstagramData, 3000);
});
