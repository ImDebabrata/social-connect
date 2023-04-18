import PostBox from "@/components/postbox/PostBox";
import React, { useEffect, useState } from "react";
import PostViewer from "@/components/postviewer/PostViewer";
import { useDispatch } from "react-redux";
import { useAllPostsQuery } from "@/redux/apiSlice";

const Home = () => {
  const { data, isLoading, isError, refetch } = useAllPostsQuery({});

  return (
    <div>
      <PostBox refetch={refetch} />
      {/* <PostViewer /> */}
      {/* mapping post according to the number of posts */}
      {data?.posts.map((post: any) => {
        return <PostViewer key={post._id} {...post} />;
      })}
    </div>
  );
};

export default Home;
