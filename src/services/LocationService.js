import Location from "../domain/Location.js";

export default class LocationService {
    async getLocations() {
        const response = await fetch("http://localhost:8080/location");
        const responseJson = await response.json();

        return responseJson.map(location => new Location(location.id, location.name));
    }
}