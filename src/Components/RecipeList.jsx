import {useEffect,useState,useCallback,memo, useMemo } from 'react'
import AlertDismissible from '../Components/Alert.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { usePagination } from '../Context/PaginationContext.jsx'
import Pagination from 'react-bootstrap/Pagination';

const PaginationButtons = memo(({page,TotalPages,setPage,GoBack,GoForward}) =>(
    <Pagination size="lg">

        <Pagination.Prev onClick={GoBack} disabled={page === 1} />
        <Pagination.Item active={1 === page} onClick={() => setPage(1)} >
            1
        </Pagination.Item>

        {page > 3 && <Pagination.Ellipsis disabled />}

        {Array.from({ length: 5 }, (_, i) => page - 2 + i)
            .filter(p => p > 1 && p < TotalPages)
            .map(p => (
                <Pagination.Item key={p} active={p === page} onClick={() => setPage(p)}>
                    {p}

                </Pagination.Item>
            ))}

        {page < TotalPages - 2 && <Pagination.Ellipsis disabled />}


        {TotalPages > 1 && (
            <Pagination.Item active={TotalPages === page} onClick={() => setPage(TotalPages)} >
                {TotalPages}
            </Pagination.Item>
        )}
        <Pagination.Next onClick={GoForward} disabled={page === TotalPages} />

    </Pagination>
));

export const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const { page, setPage } = usePagination();
    const [cache, setCache] = useState({});
    
    const [TotalPosts, setTotalPosts] = useState(0);
    const [TotalPages, setTotalPages] = useState(0);

    const memoizedCache = useMemo(() => cache, [cache]);

    useEffect(() => {
        if (memoizedCache[page]) {
            setRecipes(memoizedCache[page]);
            setLoading(false);
        } else {

            
            fetch(`https://dummyjson.com/recipes?limit=5&skip=${(page - 1) * 5}`)
                .then((res) => res.json())
                .then((data) => {
                    setRecipes(data.recipes);
                    setCache(prevCache => ({ ...prevCache, [page]: data.recipes }));
                    setTotalPosts(data.total);
                    setLoading(false);
                })
                .catch((err) => {
                    setMessage("Error loading recipes");
                    setLoading(false);
                });
        }
       
    },[page,memoizedCache]);

    useEffect(() => {
        
            setTotalPages(TotalPosts > 0 ? Math.ceil(TotalPosts / 5) : 1)
        
    }, [TotalPosts]);


    const GoBack = useCallback(() => {
        if (page != 1) {
            setPage(page - 1)
        }

    }, [page, setPage]);
    const GoForward = useCallback(() => {
        if (page < TotalPages) {
            setPage(page + 1);
        }
    },[page,TotalPages, setPage]);



    return (
        <>
            
            
            <AlertDismissible variant="info" heading="Loading" message="" show={loading} setShow={setLoading} />
            
                { !loading && recipes.length > 0 ? (
                recipes.map((recipe) => 

                        <RecipeCard key={recipe.id} recipe={recipe} />)
                    ) : (
                        !loading && <p> No Recipes Found</p>
                    
            )}
            <div className="col-md-6 offset-md-2">
                <PaginationButtons page={page} TotalPages={TotalPages} setPage={setPage} GoBack={GoBack} GoForward={GoForward} />
            </div>
            
        </>
    );



}
export default RecipeList;
