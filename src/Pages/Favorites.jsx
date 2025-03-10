import { useEffect, useState } from 'react';
import { FavoriteGet } from '../Api/UserAPI.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
function favorites() {
    const [Favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user?.id) return;
            try {
                const data = await FavoriteGet(user.id);
                setFavorites(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
         fetchFavorites();
        
    },[user])



    return (
        <>
            <main className="container mt-5 text-center min-vh-100">
                <div className="row gx-5">
                    
                        <h1 className="text-center" >Favorites</h1>
                        {!loading && Favorites.length > 0 ? (
                            Favorites.map((favorite) =>

                                <RecipeCard key={favorite.recipeId} id={favorite.recipeId } />)
                        ) : (
                            !loading && <p> No Recipes Found</p>

                        )}
                   
                </div>
            </main>
        </>
    )
}

export default favorites