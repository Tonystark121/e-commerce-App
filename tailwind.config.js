import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        myColor: 'linear-gradient(159deg, rgb(255, 207, 255), rgb(140, 199, 255))'
      }
    },
  },
  plugins: [],
});
