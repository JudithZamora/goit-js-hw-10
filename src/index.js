// cat-api.js

// Función para hacer una petición HTTP a la colección de razas
function fetchBreeds() {
    const breedSelect = document.querySelector('select.breed-select');
    const loader = document.querySelector('p.loader');
  
    breedSelect.style.display = 'none';
    loader.style.display = 'block';
  
    return fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(data => {
        breedSelect.innerHTML = '';
        data.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.innerText = breed.name;
          breedSelect.appendChild(option);
        });
  
        breedSelect.style.display = 'block';
        loader.style.display = 'none';
  
        return data;
      })
      .catch(error => {
        breedSelect.style.display = 'none';
        loader.style.display = 'none';
        showError(error.message);
        throw error;
      });
  }
  
  // Función para hacer una petición HTTP de información sobre un gato por su raza
  function fetchCatByBreed(breedId) {
    const catInfo = document.querySelector('div.cat-info');
    const loader = document.querySelector('p.loader');
  
    catInfo.style.display = 'none';
    loader.style.display = 'block';
  
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`)
      .then(response => response.json())
      .then(data => {
        const cat = data[0];
        catInfo.innerHTML = `
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
          <img src="${cat.url}" alt="Cat Image">
        `;
  
        catInfo.style.display = 'block';
        loader.style.display = 'none';
  
        return cat;
      })
      .catch(error => {
        catInfo.style.display = 'none';
        loader.style.display = 'none';
        showError(error.message);
        throw error;
      });
  }
  
  // Función para mostrar un error
  function showError(errorMessage) {
    const errorElement = document.querySelector('p.error');
    errorElement.innerText = errorMessage;
    errorElement.style.display = 'block';
  }
  
  export { fetchBreeds, fetchCatByBreed };
  