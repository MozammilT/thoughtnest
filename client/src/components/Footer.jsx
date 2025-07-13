import { useTheme } from "../context/ThemeContext.jsx";

function Footer() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];
  const date = new Date().getFullYear();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div
        className={`flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-t border-gray-500/30  ${
          darkMode ? "text-gray-400/80" : "text-gray-500"
        }`}
      >
        <div>
          <img
            className="w-34 md:w-50"
            src={darkMode ? "/logo_dark1.png" : "/main.png"}
            alt="dummyLogoColored"
          />
          <p className="max-w-[410px] mt-6">
            ThoughtNest is your space to share ideas, tell stories, and connect
            with curious minds from around the world
          </p>
        </div>
        <div className="flex flex-wrap justify-around w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3
                className={`font-semibold text-base md:mb-5 mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p
        className={`py-4 text-center text-sm md:text-base ${
          darkMode ? "text-gray-400/90" : "text-gray-500/80"
        }`}
      >
        {`Copyright ${date} © ThoughtNest pvt. ltd.`}
      </p>
    </div>
  );
}

export default Footer;
