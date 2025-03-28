import React, { useEffect, useState } from "react";
import { getPostComments } from "../services/api";

const Feed = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getPostComments(150);  // Fetch comments for Post ID 150
      setComments(data.comments);
    };
    fetchComments();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Feed</h2>
      <div className="list-group">
        {comments.map((comment) => (
          <div key={comment.id} className="list-group-item">
            <strong>Comment ID:</strong> {comment.id} <br />
            <strong>Content:</strong> {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
