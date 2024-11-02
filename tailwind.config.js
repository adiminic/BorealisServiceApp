module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          base: {
            100: '#1C1C1C',
            200: '#585757',
            300: '#969696',
            400: '#000000',
            500: '#000000',
            600: '#FFFFFF'
          },
          primary: {
            100: '#004289',
            200: '#0F5096'
          },
          error: '#EF4147',
          bg: {
            100: '#FEFEFE',
            200: '#F8F8F8',
            300: '#EFEFEF'
          }
        }
      },
    },
    plugins: [],
  };