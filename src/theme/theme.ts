// theme.ts

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    grey: string;
    lightGrey: string;
    lightBlue: string;
    shadowBlue: string;
  };
  gradient: {
    colors: string[];
    lightColors: string[];
    locations: number[];
  }
  fonts: {
    regular: string;
  };
}

const g_THEME: Theme = {
  colors: {
    primary: 'rgba(172, 224, 246, 0.38)',
    secondary: 'rgba(78, 105, 242, 1)',
    error: 'rgba(249, 58, 58, 0.67)',
    grey: 'rgba(0, 0, 0, 0.3)',
    lightGrey: 'rgba(60, 60, 60, 0.13)',
    lightBlue: 'rgba(172, 224, 246, 0.17)',
    shadowBlue: 'rgba(177, 205, 253, 1)',
  },
  gradient: {
    colors: ["#8A8FFF", "#98D8FD", "white"],
    lightColors: ['rgba(138, 143, 255, 0.22)', 'rgba(152, 216, 253, 0.35)', 'rgba(255, 255, 255, 0.46)'],
    locations: [0, 0.95, 1],
  },
  fonts: {
    regular: 'MergeOne-Regular',
  },
};

export default g_THEME;