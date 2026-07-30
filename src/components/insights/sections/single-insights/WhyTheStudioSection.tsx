import Image from "next/image";

export const WhyTheStudioSection = () => {
  const data = [
    {
      title: "1. Validated Ideas, Not Just Inspiration",
      desc: "Venture studios don’t chase inspiration—they pursue validated opportunity. Every idea goes through a rigorous process of market analysis, feasibility testing, and customer feedback before a single line of code is written. This means startups launched from studios have a higher chance of product-market fit from the start.",
    },
    {
      title: "2. All-in-One Support",
      desc: "Traditional startups often struggle to find the right co-founders, advisors, and early hires. Venture studios eliminate this bottleneck by offering access to in-house expertise, including product designers, engineers, marketers, and legal teams. This allows founders to focus on building, not just surviving.",
    },
    {
      title: "3. Faster and More Cost-Efficient Launches",
      desc: "Because studios have repeatable processes, tools, and networks in place, startups can go from idea to MVP (Minimum Viable Product) in a fraction of the time it would take independently. This speed is critical in fast-moving markets where timing can make or break a business.",
    },
    {
      title: "4. Built-in Funding Pipeline",
      desc: "Most venture studios provide early-stage funding or have direct access to an investor network. This reduces the need for endless pitching and allows teams to stay focused on execution during the critical early months.",
    },
    {
      title: "5. Aligned Incentives",
      desc: "Venture studios share equity with the founding team, meaning everyone has skin in the game. This creates an environment where collaboration and commitment thrive, and where long-term success is prioritized over short-term wins.",
    },
  ];
  return (
    <section className="why-the-studio-section">
      <div className="container">
        <h3>Why the Studio Model Works</h3>
        {data.map((item, index) => (
          <div key={index} className="why-the-studio-item">
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      <Image
        src="/images/why-the-studio-image.webp"
        width={1512}
        height={400}
        alt="Why the Studio Model Works"
      />
    </section>
  );
};
