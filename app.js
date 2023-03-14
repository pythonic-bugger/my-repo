const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/v2/sites/71/blogs/3189", (req,res) => {
    const fooResponse = {
        foo: "bar",
        some: "thing"
      };
  
    res.json(fooResponse);
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));