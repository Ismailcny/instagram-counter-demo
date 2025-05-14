setInterval(function() {
    fetch('data/followers.json')  // This assumes the followers.json file is inside a "data" folder.
      .then(response => response.json())
      .then(data => {
          document.getElementById('followers').textContent = data.followers_count;
      })
      .catch(err => console.error('Error fetching followers:', err));
}, 5000);  // Update every 5 seconds
