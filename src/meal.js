const mealDetails = document.getElementById('mealDetails');
const params = new URLSearchParams(window.location.search);
const mealId = params.get('id');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        mealDetails.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
        `;
    });
