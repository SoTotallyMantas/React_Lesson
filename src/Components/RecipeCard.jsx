import { Link } from 'react-router';
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import FavIcon from '/favorite.png'
import UnFavIcon from '/favorited.png'
import { FavoriteDelete, FavoritePost, FavoriteGet } from '../Api/UserAPI.jsx';
import { useAuth } from '../Context/AuthContext.jsx'
export const RecipeCard = ({ id, recipe: initialRecipe }) => {

    const [recipe, setRecipe] = useState(initialRecipe);
    const [Favorited, setFavorited] = useState();
    
    const { user, Favorites, updateFavorites } = useAuth();
    const [FavoriteApiCall, setFavoriteApiCall] = useState(false);
    const recipeId = recipe?.id || id; 

    useEffect(() => {
        if (!initialRecipe) {
            fetch(`https://dummyjson.com/recipes/${id}`)
                .then(res => res.json())
                .then((data) => {
                    
                    setRecipe(data);
                });
        }
    }, [id, initialRecipe]);
   
    useEffect(() => {
        if (!Favorites || !recipeId) return;

        const favorite = Favorites.find((fav) => fav.recipeId === recipeId);
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

            const updatedFavorites = await FavoriteGet(user.id);
            updateFavorites(updatedFavorites);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setFavoriteApiCall(false);
        }
    }

    if (!recipe) {
        return <p>Loading recipe...</p>;
    }
    return (
        <>

                <div className="col-6 col-md-4 mb-5 mt-5">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={recipe.image} style={{ maxwidth:"200px", maxheight:"200px"}} />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>

                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Rating: {recipe.rating} | Review Count: {recipe.reviewCount}</ListGroup.Item>
                        <ListGroup.Item>Prep Time: {recipe.prepTimeMinutes} | Cook Time: {recipe.cookTimeMinutes}</ListGroup.Item>
                        <ListGroup.Item>Difficulty: {recipe.difficulty} | cuisine: {recipe.cuisine}</ListGroup.Item>
                        <ListGroup.Item>servings: {recipe.servings}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link as={Link}  to={`/dashboard/recipe/${recipe.id}`}>
                            Details
                        </Card.Link>
                        <a>
                            {Favorited ? (
                                <img onClick={ToggleFavorite} className="img-fluid" src={UnFavIcon} style={{ maxHeight: '20%', maxWidth: '20%' }} />
                            ) :
                                (
                                    <img onClick={ToggleFavorite} className="img-fluid" src={FavIcon} style={{ maxHeight: '20%', maxWidth: '20%' }} />
                                )}
                        </a>

                    </Card.Body>
                </Card>
                </div>    
        

        </>
    );

}

export default RecipeCard;