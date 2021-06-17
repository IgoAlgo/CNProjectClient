const size = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

export default theme;
