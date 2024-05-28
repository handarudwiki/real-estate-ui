import { useState } from "react";
import "./searchbar.scss";

const types = ["buy", "rent"];

export default function SearchBar() {
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }));
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button
                        key={type}
                        className={query.type === type ? "active" : ""}
                        onClick={() => switchType(type)} // Corrected onClick
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form action="">
                <input type="text" name="location" id="location" placeholder="city location"/>
                <input type="number" name="minPrice" min={0} max={100000000} placeholder="min price" />
                <input type="number"  name="maxPrice" min={0} max={100000000} placeholder="max price"/>
                <button>
                    <img src="/search.png" alt="" />
                </button>
            </form>
        </div>
    );
}
