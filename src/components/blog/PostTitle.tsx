import React from "react";

type PostTitleProps = {
  children: React.ReactNode;
};

const PostTitle = ({ children }: PostTitleProps) => (
  <h2 className="text-2xl font-bold text-secondary-900">{children}</h2>
);

export default PostTitle;
