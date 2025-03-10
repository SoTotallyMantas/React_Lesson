import { Link } from 'react-router';
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export const RecipeCard = ({ id, recipe: initialRecipe }) => {
    const [recipe, setRecipe] = useState(initialRecipe);
    useEffect(() => {
        if (!recipe) {
            fetch(`https://dummyjson.com/recipes/${id}`)
                .then(res => res.json())
                .then((data) => {
                    console.log("Fetched Data", data);
                    setRecipe(data);
                });
        }
    }, [id, initialRecipe]);
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

                    </Card.Body>
                </Card>
                </div>    
        

        </>
    );

}

export default RecipeCard;