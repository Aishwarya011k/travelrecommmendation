 const searchBtn = document.getElementById('btn');
    const clearBtn = document.getElementById('clearBtn');
    const searchInput = document.getElementById('search-text');
    const resultsDiv = document.getElementById('results');

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      resultsDiv.innerHTML = '';

      if (!query) return;

      fetch('travel.json')
        .then(res => res.json())
        .then(data => {
          let result = null;

          for (let country of data.countries) {
            for (let city of country.cities) {
              if (city.name.toLowerCase().includes(query)) {
                result = city;
                break;
              }
            }
            if (result) break;
          }

          if (!result) {
            result = data.temples.find(t => t.name.toLowerCase().includes(query)) ||
                     data.beaches.find(b => b.name.toLowerCase().includes(query));
          }

          if (result) {
            resultsDiv.innerHTML = `
              <div class="card">
                <img src="${result.imageUrl}" alt="${result.name}">
                <div class="card-content">
                  <h3>${result.name}</h3>
                  <p>${result.description}</p>
                  <button onclick="alert('Visiting ${result.name}')">Visit</button>
                </div>
              </div>
            `;
          } else {
            resultsDiv.innerHTML = `<p>No matching destination found.</p>`;
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          resultsDiv.innerHTML = `<p>Error loading data.</p>`;
        });
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      resultsDiv.innerHTML = '';
    });