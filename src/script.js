const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favouriteMeals = document.getElementById('favouriteMeals');
let myFavourites = [];

searchInput.addEventListener('input', debounce(searchMealSuggestions, 300));

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function searchMealSuggestions() {
    const query = searchInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals || [];
            updateSearchSuggestions(meals);
        });
}

function updateSearchSuggestions(meals) {
    searchResults.innerHTML = '';
    meals.forEach(meal => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.innerText = meal.strMeal;
        suggestionItem.addEventListener('click', () => {
            searchInput.value = meal.strMeal;
            searchMeal();
        });
        searchResults.appendChild(suggestionItem);
    });
}

function searchMeal() {
    const query = searchInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals || [];
            displaySearchResults(meals);
        });
}

function displaySearchResults(meals) {
    // Clear existing search results
    searchResults.innerHTML = '';

    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strMeal}</p>
            <button class="fav-btn">Add to Favourites</button>
        `;
        const favBtn = mealItem.querySelector('.fav-btn');
        favBtn.addEventListener('click', () => addToFavourites(meal));
        mealItem.addEventListener('click', () => viewMealDetails(meal.idMeal));
        searchResults.appendChild(mealItem);
    });
}

function addToFavourites(meal) {
    if (!myFavourites.some(fav => fav.idMeal === meal.idMeal)) {
        myFavourites.push(meal);
        updateFavouriteList();
    }
}

function updateFavouriteList() {
    favouriteMeals.innerHTML = '';
    myFavourites.forEach(favMeal => {
        const favItem = document.createElement('li');
        favItem.innerHTML = `
            <span>${favMeal.strMeal}</span>
            <button class="remove-btn">Remove</button>
        `;
        const removeBtn = favItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => removeFromFavourites(favMeal));
        favouriteMeals.appendChild(favItem);
    });
    // Save favourites to local storage for persistence
    localStorage.setItem('myFavourites', JSON.stringify(myFavourites));
}

function removeFromFavourites(meal) {
    myFavourites = myFavourites.filter(fav => fav.idMeal !== meal.idMeal);
    updateFavouriteList();
}

function viewMealDetails(mealId) {
    window.location.href = `meal.html?id=${mealId}`;
}

// Initial load: Retrieve and display favourites from local storage
myFavourites = JSON.parse(localStorage.getItem('myFavourites')) || [];
updateFavouriteList();
