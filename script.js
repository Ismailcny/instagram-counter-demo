async function updateCount() {
  try {
    const res = await fetch('data/followers.json');
    const data = await res.json();
    const countEl = document.getElementById('followerCount');
    let last = parseInt(countEl.textContent.replace(/,/g,'')) || 0;
    countEl.textContent = data.followers.toLocaleString();
    if (data.followers > last) {
      startConfetti();
      setTimeout(stopConfetti, 3000);
    }
  } catch (e) {
    console.error(e);
  }
}
window.addEventListener('load', () => {
  updateCount();
  setInterval(updateCount, 300000); // every 5 minutes
});