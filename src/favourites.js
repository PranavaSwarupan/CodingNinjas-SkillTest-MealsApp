const favouriteMeals = document.getElementById('favouriteMeals');
let myFavourites = JSON.parse(localStorage.getItem('myFavourites')) || [];

updateFavouriteList();

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
}

function removeFromFavourites(meal) {
    myFavourites = myFavourites.filter(fav => fav.idMeal !== meal.idMeal);
    updateFavouriteList();
    // Update local storage after removal
    localStorage.setItem('myFavourites', JSON.stringify(myFavourites));
}
