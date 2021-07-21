const phoneRoutes = (app, fs) => {
    // variables
    const dataPath = './data/phones.json';
  
    // READ
    app.get('/api/phones', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = phoneRoutes;