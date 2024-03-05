const BASE_URL = "http://localhost:3001/api/videos";
const TOKEN = sessionStorage.getItem("token");

/**
 * Fetch one video or the playlist from the server.
 * @param {string} id - Optional video ID to fetch a specific video.
 * @returns {Promise} - Promise object represents the videos data.
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
 * Save or update a video on the server.
 * @param {Object} data - video data to be saved or updated.
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
 * Delete a video from the server.
 * @param {string} id - ID of the video to be deleted.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const deletevideo = (id) => {
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