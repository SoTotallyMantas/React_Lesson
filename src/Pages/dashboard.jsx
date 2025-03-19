import { NavLink } from 'react-router';
function dashboard() {




    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div className="card m-5 p-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Dashboard</h5>
                        <NavLink to="/dashboard/recipe" className="btn btn-primary m-3 w-100">
                            Recipe
                        </NavLink>
                        <NavLink to="/dashboard/Favorites" className="btn btn-primary m-3 w-100">
                            Favorites
                        </NavLink>
                    </div>
                    
                </div>
            </main>
        </>
    )
}

export default dashboard
