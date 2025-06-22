import React from "react";

type PostTitleProps = {
  children: React.ReactNode;
  itemProp?: string;
};

const PostTitle = ({ children, itemProp }: PostTitleProps) => (
  <h1
    className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
    itemProp={itemProp}
  >
    {children}
  </h1>
);

export default PostTitle;
