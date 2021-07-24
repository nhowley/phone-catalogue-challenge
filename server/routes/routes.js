// load up our shiny new route for phones
const phoneRoutes = require('./phones');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('Welcome to your rest API');
  });

  // run our phone route module here to complete the wire up
  phoneRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;




