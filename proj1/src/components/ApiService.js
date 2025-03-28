import axios from "axios";

const BASE_URL = "http://20.244.56.144/test/primes";  // Replace with your actual API
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUwMDIzLCJpYXQiOjE3NDMxNDk3MjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjljOTljMWI0LWQ3MGQtNGY5Yi04YzE3LTEyM2I1MjU5Zjg3MiIsInN1YiI6ImthcnVwcGFzYW15LnAuY3NlLjIwMjJAc25zY3Qub3JnIn0sImNvbXBhbnlOYW1lIjoiaW5zdGEiLCJjbGllbnRJRCI6IjljOTljMWI0LWQ3MGQtNGY5Yi04YzE3LTEyM2I1MjU5Zjg3MiIsImNsaWVudFNlY3JldCI6InN5R2lXQWV4Tk9vWGJWR1MiLCJvd25lck5hbWUiOiJLYXJ1cHBhc2FteSIsIm93bmVyRW1haWwiOiJrYXJ1cHBhc2FteS5wLmNzZS4yMDIyQHNuc2N0Lm9yZyIsInJvbGxObyI6IjcxMzUyMkNTMDYxIn0.cOZFeVenOZsd_pnRxRwNcQFp3pa72mjItWKd9a8WuB8";  // Replace with your token

// 🔥 Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    console.log("Token Expiry Time:", new Date(expiryTime).toLocaleString());
    console.log("Current Time:", new Date(currentTime).toLocaleString());

    if (currentTime > expiryTime) {
      console.log("Token expired!");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Invalid token format or parsing error:", error);
    return true;  // Treat as expired if parsing fails
  }
};

export const fetchNumbers = async (type) => {
  try {
    if (isTokenExpired(TOKEN)) {
      console.error("Token is expired. Please regenerate a new token.");
      return [];  // Return empty data if the token is expired
    }

    console.log(`Fetching ${type}...`);

    const response = await axios.get(`${BASE_URL}/${type}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    console.log(`API Response for ${type}:`, response);

    if (response.status === 200 && response.data.numbers) {
      console.log("Data:", response.data.numbers);
      return response.data.numbers;
    } else {
      console.log(`No data received for ${type}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error.response?.data || error);
    return [];
  }
};
