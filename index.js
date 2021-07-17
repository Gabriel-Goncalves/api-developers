const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const developerRoute = require('./routes/developer');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());

app.use('/developer', developerRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
