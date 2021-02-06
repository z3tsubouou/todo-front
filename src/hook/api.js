import axios from "axios";

export default async function api({ method, url, data, token }) {
    const header = token
        ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
        : {
              "Content-Type": "application/json",
          };

    const options = {
        method: method,
        url: `http://localhost:8000${url}`,
        headers: header,
        data,
    };

    const result = await axios.request(options);

    return result.data;
}
