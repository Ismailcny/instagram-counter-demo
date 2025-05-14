const user = 'hildekeyf';
const proxy = 'https://api.allorigins.win/raw?url=';
const url = `https://www.instagram.com/${user}/?__a=1&__d=dis`;
const profilePic = document.getElementById('profilePic');
const followerEl = document.getElementById('followerCount');
let lastCount = 0;

// Initialize QR code
new QRCode(document.getElementById('qrCode'), {
  text: `https://instagram.com/${user}`,
  width: 80, height: 80
});

// Fetch and update follower data
async function updateData() {
  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    const json = await res.json();
    // GraphQL path: graphql.user.edge_followed_by.count
    const count = json.graphql.user.edge_followed_by.count;
    const picUrl = json.graphql.user.profile_pic_url_hd;
    
    // Update profile pic
    profilePic.src = picUrl;
    
    // Update follower count
    if (count !== lastCount) {
      followerEl.textContent = count;
      followerEl.style.transform = 'scale(1.2)';
      startConfetti();
      setTimeout(() => {
        stopConfetti();
        followerEl.style.transform = 'scale(1)';
      }, 4000);
      lastCount = count;
    }
  } catch (e) {
    console.error('Error fetching Instagram data', e);
  }
}

// Poll every 3 seconds
setInterval(updateData, 3000);
window.addEventListener('load', updateData);
