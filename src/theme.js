export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F5F0F8",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#241C2C",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#F6E6FF",
      100: "#ECCCFE",
      200: "#BF99FD",
      300: "#AC66FC",
      400: "#8E33FB",
      500: "#9800FA",
      600: "#8000BC",
      700: "#42007D",
      800: "#12003F",
      900: "#0F0019",
    },
  };
  
  // mui theme 
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // valorile paletei pentru dark mode
              primary: {
                dark: colorTokens.primary[500],
                main: colorTokens.primary[500],
                light: colorTokens.primary[100],
              },
              neutral: {
                dark: colorTokens.primary[200],
                main: colorTokens.grey[300],
                mediumMain: colorTokens.grey[100],
                medium: colorTokens.grey[200],
                light: colorTokens.grey[600],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // valorile paletei pentru light mode
              primary: {
                dark: colorTokens.primary[500],
                main: colorTokens.primary[300],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[900],
                main: colorTokens.grey[700],
                mediumMain: colorTokens.grey[700],
                medium: colorTokens.grey[500],
                light: colorTokens.grey[100],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 13,
        h1: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Ubuntu", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };