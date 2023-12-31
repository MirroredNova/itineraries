export const themeMui = {
  palette: {
    primary: {
      main: '#1A458F',
      light: '#3497F5',
    },
    secondary: {
      main: '#333333',
      light: '#FFFFFF',
    },
    accent: {
      main: '#FFB922',
      dark: '#D7970C',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFB922 !important',
          color: '#333333',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333 !important',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#000000 !important',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
  },
};
