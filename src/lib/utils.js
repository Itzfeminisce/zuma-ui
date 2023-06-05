export const fetchGoogleFonts = function () {
  return new Promise((res, rej) => {
    const link = document.createElement("style");
    link.rel = "stylesheet";
    link.className = "dependency";
    link.crossorigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.body.appendChild(link);
    res(link);
  });
};

export const fetchTailwind = function () {
  return new Promise((res, rej) => {
    const link = document.createElement("script");
    link.src =
      "https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio";
      
    link.className = "dependency";
    link.async = false;
    document.body.appendChild(link);
    res(link);
  });
};
export const fetchFontAwesome = function () {
  return new Promise((res, rej) => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    
    link.rel = "stylesheet";
    link.className = "dependency";
    link.crossorigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.body.appendChild(link);
    res(link);
  });
};

export const fetchAnimateCss = function () {
  return new Promise((res, rej) => {
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    link.className = "dependency";
    link.referrerPolicy = "no-referrer";
    document.body.appendChild(link);
    res(link);
  });
};

export const color = {
  primary500: "blue-500",
  primary700: "blue-700",
  primary300: "blue-300",
  primary100: "blue-100",
  blue500: "blue-500",
  blue300: "blue-300",
  black: "black",
  white: "white",
  grey500: "grey-500",
  grey300: "grey-300",
};
