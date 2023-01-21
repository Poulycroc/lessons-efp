const fs = require('fs');

fs.readFile('./path/img.png', (error, data) => {
  if (error) {
    console.log({ error });
    return;
  }

  console.log({ data });
})
