import React from "react";

type PostMetaProps = {
  children: React.ReactNode;
};

const PostMeta = ({ children }: PostMetaProps) => {
  return (
    <div className="mt-4 text-sm text-gray-500">
      {children}
    </div>
  );
};

export default PostMeta;
