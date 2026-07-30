import Image from "next/image";
import React from "react";

export const WhatIsSection = () => {
  return (
    <section className="what-is-section">
      <div className="container">
        <h2>What Is a Venture Studio?</h2>
        <p>
          A venture studio (also known as a startup studio or startup factory)
          is an organization that systematically builds startups by combining
          internal teams, funding, and operational support. Instead of waiting
          for entrepreneurs to pitch ideas, studios generate and validate ideas
          in-house, then assemble founding teams to bring them to life.
          <br />
          <br />
          This hands-on model allows studios to reduce the risk of failure,
          speed up the go-to-market process, and build more resilient, scalable
          companies.
        </p>
      </div>
      <Image
        src="/images/what-is-single-insight.webp"
        width={1512}
        height={400}
        alt="What Is a Venture Studio?"
      />
    </section>
  );
};
