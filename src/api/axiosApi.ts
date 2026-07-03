import axios from "axios";

export const axiosApi = axios.create({
  baseURL:
    "https://js-31-kanimetov-default-rtdb.europe-west1.firebasedatabase.app/",
});
