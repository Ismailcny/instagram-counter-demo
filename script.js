const followerCountElement = document.getElementById('followerCount');
let currentFollowers = 1200;

// simulate or replace fetchFollowerCount with real API call
async function fetchFollowerCount() {
  // Demo: simulate random followers
  return currentFollowers + Math.floor(Math.random() * 5);
}

function animateCount(newCount) {
  followerCountElement.style.transform = 'scale(1.2)';
  setTimeout(() => followerCountElement.style.transform = 'scale(1)', 300);
}

async function updateFollowerCount() {
  const newCount = await fetchFollowerCount();
  if (newCount > currentFollowers) {
    currentFollowers = newCount;
    followerCountElement.textContent = currentFollowers;
    animateCount(currentFollowers);
    startConfetti();
    setTimeout(stopConfetti, 4000);
  } else {
    followerCountElement.textContent = currentFollowers;
  }
}

setInterval(updateFollowerCount, 3000);
window.onload = () => updateFollowerCount();
