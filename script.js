setInterval(function() {
  fetch('https://api.instagram.com/v1/users/self')
    .then(response => response.json())
    .then(data => {
      document.getElementById('followers').textContent = data.data.counts.followed_by;
    })
    .catch(err => console.error('Error fetching followers:', err));
}, 5000);  // Every 5 seconds
