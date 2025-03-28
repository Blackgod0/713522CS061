import axios from "axios";

const BASE_URL = "http://20.244.56.144/test/posts/150/comments";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};

export const getPostComments = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};
