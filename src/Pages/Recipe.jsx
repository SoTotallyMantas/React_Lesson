import RecipeList from '../Components/RecipeList'
function Recipe() {




    return (
        <>
            <main className="container mt-5 text-center min-vh-100">
                <div className="row gx-5">
                    <h1>Recipe</h1>
                    <RecipeList/>
                </div>
            </main>
        </>
    )
}

export default Recipe
