const URLUSER = "http://localhost:3001/api";

/**
 * Fetches a list of country names from a REST API.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of country names.
 */
const countriesJSON = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                const countriesData = res.data;
                const countryNames = countriesData.map(country => country.name.common);
                countryNames.sort();
                resolve(countryNames);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};

/**
 * Sends a POST request to register a user.
 * 
 * @param {Object} data - The user data to be registered.
 * @returns {Promise} A promise that resolves if the registration is successful, otherwise rejects with an error.
 */
const register = (data) => {
    return new Promise((resolve, reject) => {
        
        const url = URLUSER + '/users';

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data);
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

/**
 * Sends a POST request to log in a user.
 * 
 * @param {Object} data - The user login data.
 * @returns {Promise} A promise that resolves if the login is successful, otherwise rejects with an error.
 */
const login = (data) => {
    return new Promise((resolve, reject) => {
        
        const url = URLUSER + "/session"

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data);
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

/**
 * Verifies the PIN for administrative access.
 * 
 * @param {number} pin - The PIN to verify.
 * @returns {Promise} A promise that resolves if the PIN is valid for administrative access, otherwise rejects with an error.
 */
const verifyPinAdmin = (pin) => {
    return new Promise((resolve, reject) => {
        const uri = `http://localhost:3001/api/users/pin?pin=${pin}`;

        axios({
            method: 'GET',
            url: uri,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}