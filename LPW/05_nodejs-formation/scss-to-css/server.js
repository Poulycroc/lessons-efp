const sass = require("node-sass");
const fs = require("fs");

sass.render(
  {
    file: "./assets/scss/app.scss",
    // outputStyle: "compact",
  },
  function (error, result) {
    if (error) {
      console.log({ error });
    } else {
      fs.writeFile("./public/css/style.css", result.css, function () {
        console.log("voila c'est ok");
      });
    }
  }
);
