import { useParams} from "react-router";
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { NavLink , useNavigate} from 'react-router';
import FavIcon from '/favorite.png'
import UnFavIcon from '/favorited.png'
import { FavoriteDelete, FavoritePost,FavoriteGet } from '../Api/UserAPI.jsx';
import {useAuth } from '../Context/AuthContext.jsx'
export const RecipeDetail = () => {
    let { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipes] = useState({});
    const [Favorited, setFavorited] = useState(false);
    const { user, Favorites, updateFavorites } = useAuth();
    const [FavoriteApiCall, setFavoriteApiCall] = useState(false);
    useEffect(() =>
    {
        fetch(`https://dummyjson.com/recipes/${recipeId}`)
            .then(res => res.json())
            .then((data) => {
                console.log("Fetched Data", data);
                setRecipes(data);
            });
    }, [recipeId])
    useEffect(() => {
        if (!Favorites) return;
        const parsedRecipeId = Number(recipeId);
        const favorite = Favorites.find((fav) => fav.recipeId === parsedRecipeId);
        setFavorited(!!favorite); 
    }, [Favorites, recipeId]); 
    const ToggleFavorite = async () => {
        if (FavoriteApiCall) return;
        setFavoriteApiCall(true);

        try {
            if (!Favorited) {
                await FavoritePost(user.id, recipeId);

            }
            else {
                await FavoriteDelete(user.id, recipeId);
            }

            await updateFavorites(user.id);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setFavoriteApiCall(false);
        }
    }
    

    return (
        <>
            <main className="container-fluid mt-3 ">
                <div className="row  ">
                    
                    <div className="col-5">
                        <img className="img-fluid rounded object-fit-contain" src={recipe.image}  />

                    </div>
                    
                    <div className="col">
                    <h2> Ingredients</h2>
                        <ul className="list-group list-group-flush">
                            {recipe.ingredients?.map((ingredient, index) =>
                                <li className="list-group-item" key={index}>{ingredient}</li>
                            )}
                        </ul>
                    
                    


                   
                    <h2> Instructions</h2>
                    <ul className="list-group list-group-flush">
                        {recipe.instructions?.map((instruction, index) =>
                            <li className="list-group-item" key={index}>{instruction}</li>
                        )}
                        </ul>
                    </div>
                </div>
                <div className="row mt-3 mb-5">
                    <div className="col-7 ">
                            <h1 className="mb-2">{recipe.name}</h1>
                        <table className="table  table-hover">
                            <tbody>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Difficulty:</strong></td>
                                    <td className="text-start fs-4">{recipe.difficulty}</td>
                                </tr>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Preparation Time:</strong></td>
                                    <td className="text-start fs-4">{recipe.prepTimeMinutes} minutes</td>
                                </tr>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Cooking Time:</strong></td>
                                    <td className="text-start fs-4">{recipe.cookTimeMinutes} minutes</td>
                                </tr>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Calories per Serving:</strong></td>
                                    <td className="text-start fs-4">{recipe.caloriesPerServing}</td>
                                </tr>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Servings:</strong></td>
                                    <td className="text-start fs-4">{recipe.servings}</td>
                                </tr>
                                <tr>
                                    <td className="text-start w-25 fs-5"><strong>Cuisine:</strong></td>
                                    <td className="text-start fs-4">{recipe.cuisine}</td>
                                </tr>
                            </tbody>
                        </table>
                            
                        
                       <h3>Tags:</h3>
                        <Stack direction="horizontal" gap={2}>
                            {recipe.tags?.map((tag, index) =>
                                <Badge key={index} pill bg="success" className="ps-3 pe-3   fs-5" >{ tag}</Badge>
                            )}
                        </Stack>
                            
                       
                    </div>

                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                
                                <button onClick={() => navigate(-1)} className="btn btn-primary w-50">
                                    Go Back
                                </button>

                                <a>
                                    {Favorited ? (
                                        <img onClick={ToggleFavorite} className="img-fluid" src={UnFavIcon} style={{ maxHeight: '20%', maxWidth: '20%' }} />
                                    ) :
                                    (
                                            <img onClick={ToggleFavorite} className="img-fluid" src={FavIcon} style={{ maxHeight: '20%', maxWidth: '20%' }} />
                                    )}
                                </a>
                            </div>

                        </div>
                    </div>

                 
                   
                </div>
               
            </main>
        </>
    );
}
export default RecipeDetail;