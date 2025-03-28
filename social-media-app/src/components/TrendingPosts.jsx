import React, { useEffect, useState } from "react";
import { getUserPosts } from "../services/api";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getUserPosts(1);  // Fetch John Doe's posts
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Trending Posts</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Post ID: {post.id}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;
