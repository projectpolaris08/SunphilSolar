import React from "react";
import { Helmet } from "react-helmet";

const Cookies: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Cookies Policy | SunPhil Solar</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          This Cookie Policy explains how Sunphil Solar uses cookies and similar
          technologies to recognize you when you visit our website. It explains
          what these technologies are and why we use them, as well as your
          rights to control our use of them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why do we use cookies?
        </h2>
        <p>
          We use cookies for several reasons. Some cookies are required for
          technical reasons in order for our website to operate, and we refer to
          these as "essential" or "strictly necessary" cookies. Other cookies
          enable us to track and target the interests of our users to enhance
          the experience on our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How can you control cookies?
        </h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie preferences through your browser settings.
          Please note that if you choose to reject cookies, you may not be able
          to use some functionality of our website.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
