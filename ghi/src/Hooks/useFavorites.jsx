import { createContext, useContext } from "react";
import { useLocalStorage } from 'usehooks-ts'


export const getBreweryName = async (yelp_id) => {
    const yelpURL = `${process.env.REACT_APP_YELP_API_SERVICE_API_HOST}/api/brewery?yelp_id=${yelp_id}`
    const response = await fetch(yelpURL);
    if (response.ok) {
        let breweryData = await response.json();
        return breweryData.name
    } else {
        console.error(`🛑🛑 ERROR getting brewery name |`, response)
        return "🤷🏻‍♀️ NO ONE KNOWS";
    }
}


export const FavoritesContext = createContext({
    userFavorites: [],
    setUserFavorites: () => null,
});
FavoritesContext.displayName = 'FavoritesContext';


export const FavoritesProvider = ({ children }) => {
    const [userFavorites, setUserFavorites] = useLocalStorage("userFavorites", []);

    return (
        <FavoritesContext.Provider value={{ userFavorites, setUserFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};


export const useFavoritesContext = () => useContext(FavoritesContext);


export function useFavorites() {
    const { setUserFavorites } = useFavoritesContext();

    async function getFavorites(userID, token) {
        const favoritesURL = `${process.env.REACT_APP_FAVORITES_SERVICE_API_HOST}/favorites/${userID}`
        const config = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(favoritesURL, config);
        if (response.ok) {
            let data = await response.json();

            let promises = data.map(async (data) => {
                data["name"] = await getBreweryName(data["yelp_id"])
            })
            //!! need to await all promises before or data is incomplete
            await Promise.all(promises)
            setUserFavorites(data)
        } else {
            console.error(`getFavorites FAIL >>>`, response);
        }
    }

    return [getFavorites];
}