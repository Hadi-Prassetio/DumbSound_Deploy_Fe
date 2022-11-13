/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main: '#EE4622',
        base: '#161616',
        btn: '#F58033',
        inpt: '#766C6C',
        txt: '#433434',
        auth: '#D2D2D2',
        pholder: '#B1B1B1',
        profile: '#613D2B'
       
      },
      backgroundImage: {
        'hero': "url('../public/user.png')",
      },
      container:{
        center: true,
        padding: '1rem'
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    },
    fontFamily:{
      mainFont : ['Abhaya Libre']
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
