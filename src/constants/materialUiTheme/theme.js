import { createMuiTheme } from "@material-ui/core";

const PRIMARY = "#ffffff";
const SECONDARY = "#C93832";

const THEME = {
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    },
    background: {
      default: "#e7e7e7",
      paper: "#e7e7e7",
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    // Style sheet name ⚛️
    // MuiSelect:{
    //   outlined: {
    //     background: '#886a00 !important',
    //     borderColor: '#ffc700 !important',
    //     borderWidth: '2px !important',
    //     padding: '0.25em 0.75em',
    //     transition: '1s lineal !important',
    //     '&:hover': {
    //       borderColor:  '#ffc700 !important',
    //       borderWidth: '2px !important',
    //       transition: '1s lineal !important',
    //       // borderStyle: 'solid !important',
    //     },
    //     '&:focus': {
    //       borderColor:  '#ffc700 !important',
    //       borderWidth: '2px !important',
    //       transition: '1s lineal !important',
    //       // borderStyle: 'solid !important',
    //     },

    //   }
    // },
    MuiButton: {
      root: {
        textTransform: "none"
      },
    },
    MuiFormControlLabel: {
      label: {
        color: SECONDARY,
      },
    },
    MuiAppBar: {
        colorPrimary: {
            backgroundColor: "transparent",
        },
        root: {
            boxShadow: 'unset',
        }
    },
    MuiDivider: {
      root: {
        backgroundColor: SECONDARY
      }
    },
    MuiCheckbox: {
      "root": {
        "&$disabled": {
          color: 'red'
        }  
      }
    },
  }
};

export const DefaultTheme = createMuiTheme({
  ...THEME,
});