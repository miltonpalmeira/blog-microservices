'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from '../CommentCreate/CommentCreate';
import CommentList from '../CommentList/CommentList';

interface Post {
  id: string;
  title: string;
  comments: { id: string; content: string }[];
}

const PostList = () => {
  const [posts, setPosts] = useState<{ [key: string]: Post }>({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
