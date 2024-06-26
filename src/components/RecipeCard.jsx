import { Soup,Heart, HeartPulse } from 'lucide-react'
import { useState } from 'react';


function RecipeCard({recipe, bg, badge}) {

    const healthLabels = [recipe.healthLabels[0], recipe.healthLabels[1] ];
    const [isFavourite, setIsFavourite] = useState(localStorage.getItem('favourites')?.includes(recipe.label) );
    
    const addRecipeToFavourites = () => {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isAlreadyFavourite = favourites.some((fav) => fav.label === recipe.label);   

        if(isAlreadyFavourite) {
            favourites = favourites.filter((fav) => fav.label !== recipe.label);    // Remove the recipe we just heart-clicked on
            setIsFavourite(false);
        } else {        
            favourites.push(recipe);        // Add the recipe we just heart-clicked on
            setIsFavourite(true);
        }
        
        localStorage.setItem("favourites", JSON.stringify(favourites));     // Update local storage
    }

    return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
        <a href={`https://youtube.com/results?search_query=${recipe.label} recipe`}
         className='relative h-40' target ="_blank">
           
           <div className='skeleton absolute inset-0' />    {/* Display a skeleton in case of slow loading*/}
            <img src={recipe.image} alt="recipe image"
                className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
                onLoad={(e) => {
                    e.currentTarget.style.opacity = 1;      // show the image once it loads
                    e.currentTarget.previousElementSibling.style.display = "none";  // remove the skeleton
                }}
            />

            <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm'>
                <Soup size={"16"} /> {recipe.yield} Servings  
            </div>

            <div className='absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer'
                onClick={(e) =>{
                    e.preventDefault(); //By default it would take us to the youtube page because its inside <a>
                    addRecipeToFavourites();   
                }}
            >
                {!isFavourite && <Heart size={"16"} className='hover:fill-red-500 hover:text-red-500' />}
                {isFavourite && <Heart size={"16"} className='fill-red-500 text-red-500 hover:fill-white' />}
            </div>
        </a>

        <div className='flex mt-1'>
            <p className='font-bold tracking-wide'> {recipe.label} </p>
        </div>
        <p className='my-2'>{recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Cuisine</p>

        <div className='flex gap-2 mt-auto'>
            {
                healthLabels.map((label, index) => (
                    <div key={index} className={`flex gp-1 ${badge} items-center p-1 rounded-md`}>
                        <HeartPulse size={"16"} />
                        <span className='text-sm tracking-tighter font-semibold'>{label}</span>
                    </div>
                ))
            }

            
        </div>

    </div>
  )
}

export default RecipeCard