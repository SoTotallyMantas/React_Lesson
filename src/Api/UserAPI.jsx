export const FavoriteGet = async (userId) => {
    if (!userId) {
        throw new Error("UserId is required");

    }

    try {
        const response = await fetch(`http://localhost:3000/favorites?userId=${userId}&_=${new Date().getTime()}`, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        
        const favorites = await response.json();
        
        return favorites;

    } catch (error){
        throw error;
    }
}
export const FavoriteDelete = async (userId, recipeId) => {
    if (!userId || !recipeId) {
        throw new Error("Bad Details");
    }
    try {
        const response = await fetch(`http://localhost:3000/favorites`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, recipeId }),
        })
        const data = await response.json();
        if (response.ok) {
            return data.message;
        }
       

    } catch (error) {
        throw error;
    }
}
export const FavoritePost = async (userId, recipeId) => {
    if (!userId || !recipeId) {
        throw new Error("Bad Details");
    }
    try {
        const response = await fetch(`http://localhost:3000/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, recipeId }),
        })
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        else {
            return data.message;
        }

    } catch (error) {
        throw error;
    }
}

export const LoginEndpoint= async (username, password) => {

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        }
        else {
            return { success: false, message: data.message || "Invalid Details" }
        }
    }
    catch (error) {
        console.error('Error', error);
        return { success: false, message: "Failed to Login" };
    }
    
};

export const RegisterEndpoint = async (username,password) => {

    try {

        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        }
        else {
            return { success: false, message: data.message || "Error" }
        }
    }
        catch (error) {
            console.error('Error', error);
            return { success: false, message: "Failed to Register" };
        }
};