import React from "react";

type PostContentProps = {
  children: React.ReactNode;
  itemProp?: string;
};

const PostContent = ({ children, itemProp }: PostContentProps) => {
  return (
    <div className="prose prose-gray mt-8 max-w-3xl" itemProp={itemProp}>
      {children}
    </div>
  );
};

export default PostContent;
