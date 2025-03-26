import { useState,useEffect,useCallback,useMemo } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import UserCard from '../Components/UserCard.jsx'
import SearchBar from './SearchBar';
function UserList() {

    const [InitialUsers, setInitialUsers] = useState([]);
    const [DisplayUsers, setDisplayUsers] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://dummyjson.com/users?limit=100`)
            .then((res) => res.json())
            .then((data) => {
                setInitialUsers(data.users);
                setDisplayUsers(data.users);
                setLoading(false);
                console.log(InitialUsers);
                console.log(DisplayUsers);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);
    const Clear = () => {
        setLoading(true);
        setDisplayUsers(InitialUsers);
        setLoading(false);
    }
    

    const CallbackSearch = useCallback((text) => {


        setLoading(true);
        const lowerText = text.toLowerCase();
        const filtered = InitialUsers.filter(user =>
            user.firstName.toLowerCase().includes(lowerText) ||
            user.lastName.toLowerCase().includes(lowerText) ||
            user.address.city.toLowerCase().includes(lowerText)
        );

        const prevIds = DisplayUsers.map(u => u.id).join(",");
        const newIds = filtered.map(u => u.id).join(",");

        if (prevIds !== newIds) {
            setDisplayUsers(filtered);
        }
        setLoading(false);
        
    }, [InitialUsers]);

    const searchBarProps = useMemo(() => ({
        onSearch: CallbackSearch,
        onClear: Clear
    }), [CallbackSearch, Clear]);
    
    const renderedUserCards = useMemo(() => {
        return DisplayUsers.map((user) => (
            <UserCard key={user.id} user={user} />
        ));
    }, [DisplayUsers]);

    return (
        <>
            
            <main className="container p-5 text-center">
                <SearchBar {...searchBarProps} />
                <div className="row gx-5">
                    {!Loading && DisplayUsers.length > 0 ? (
                        renderedUserCards
                            ) : (
                        !Loading && <p> No Users Found</p>
                    )}

                </div>
            </main>
        </>
    )
}

export default UserList
