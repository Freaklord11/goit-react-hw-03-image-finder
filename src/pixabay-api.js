import axios from "axios";

export const BASE_URL="https://pixabay.com/api/";
const API_KEY ="43131178-8f47b4cc11bf7557a74691bd4";

export const getAPI = async (query, page) => {
    const URL =`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientayion=horizontal&per_page=12`;

    const response = axios.get(URL);

    return response.data;
}