const BASE_URL = "http://localhost:3001/api/profiles";
const TOKEN = sessionStorage.getItem("token");

/**
 * Fetch one or all profiles from the server.
 * @param {string} id - Optional profile ID to fetch a specific profile.
 * @returns {Promise} - Promise object represents the profiles data.
 */
const get = (id) => {
    return new Promise((resolve, reject) => {
        let url = BASE_URL;
        if (id) {
            url += `?_id=${id}`;
        }

        axios({
            method: "GET",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
        .then(response => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response);
        });
    });
}

/**
 * Save or update a profile on the server.
 * @param {Object} data - Profile data to be saved or updated.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const save = (data) => {
    return new Promise((resolve, reject) => {
        let method = 'POST';
        let url = BASE_URL;

        if (data.id) {
            method = 'PATCH';
            url += `?_id=${data.id}`;
        }

        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${TOKEN}`
            }
        })
        .then(response => {
            resolve(true);
        })
        .catch(error => {
            reject(error.response);
        });
    });
}

/**
 * Delete a profile from the server.
 * @param {string} id - ID of the profile to be deleted.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const deleteProfile = (id) => {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}?_id=${id}`;

        axios({
            method: "DELETE",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
        .then(response => {
            resolve(true);
        })
        .catch(error => {
            reject(error.response);
        });
    });
}

/**
 * Fetch JSON data for avatars from the server.
 * @returns {Promise} - Promise object represents the avatar JSON data.
 */
const avatarJSON = () => {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/avatar`;

        axios({
            method: 'GET',
            url: url,
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

/**
 * Verify PIN for a specific profile.
 * @param {string} id - ID of the profile to verify PIN.
 * @param {number} pin - PIN to verify.
 * @returns {Promise} - Promise object represents the PIN verification result.
 */
const verifyPin = (id, pin) => {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/pin`;

        const data = {
            _id: id,
            pin: pin
        };

        axios({
            method: 'GET',
            url: url,
            params: data,
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