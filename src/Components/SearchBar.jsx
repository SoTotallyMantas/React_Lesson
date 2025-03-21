import React ,{ useState, memo } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import Button from 'react-bootstrap/Button';
const SearchBar = ({onSearch,onClear}) => {
    const [search, setSearch] = useState("");
    function handleChange(e) {
        setSearch(e.target.value);
    }
    function handleClear() {
        setSearch("");
        onClear();
    }

    return (
        <>
            <div className="row ">
                <h1 className="text-start">SearchBar</h1>
                <div className="col-9">
                    <input value={search} type="text" className="form-control p-3" id="searchbar" placeholder="John Smith" onChange={handleChange} />
                </div>
                <div className="col-3 align-self-start gap-2">
                    <Button className="me-1 " variant="primary" size="lg" onClick={() => onSearch(search) }>Search</Button>
                    <Button className="ms-1 " variant="secondary" size="lg" onClick={handleClear}>Clear</Button>
                </div>
            </div>
        </>
    );
}

export default React.memo(SearchBar);
