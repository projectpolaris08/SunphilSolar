import React from "react";

type PostContentProps = {
  children: React.ReactNode;
};

const PostContent = ({ children }: PostContentProps) => {
  return (
    <div className="prose prose-gray mt-8 max-w-3xl">
      {children}
    </div>
  );
};

export default PostContent;
