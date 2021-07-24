const phoneRoutes = (app, fs) => {
   // variables
   const dataPath = './data/phones.json';
  
    // refactored helper methods
    const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }
  
        callback(returnJson ? JSON.parse(data) : data);
      });
    };
  
    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
          throw err;
        }
  
        callback();
      });
    };

   
    // READ - all phones
    app.get('/api/phones', (req, res) => {
      readFile(data => {
        // let newData = data.filter(phone=> phone !== null)
        res.send(data);
      }, true);
    });

    // READ - single phone
    app.get('/api/phone/:id', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        } 

        let newData = JSON.parse(data)

        let phoneSelected = newData.filter(phone =>
          req.params.id == phone.id
          )
        console.log("phone selected", phoneSelected)
  
        res.send(phoneSelected);
      });
    });   

    // CREATE
      app.post('/api/phones', (req, res) => {
        readFile(data => {
          
          // add the new phone
          req.body.id = data.length
          req.body.imageFileName="IPhone_7.png"
          data.push(req.body)

          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).redirect("/");
          });
        }, true);
      });

      // // UPDATE
      // app.put('/api/phones/:id', (req, res) => {
      //   readFile(data => {
      //     // add the new phone
      //     const phoneId = req.params['id'];
      //     data[phoneId] = req.body;

      //     writeFile(JSON.stringify(data, null, 2), () => {
      //       res.status(200).send(`phone id:${phoneId} updated`);
      //     });
      //   }, true);
      // });

      // DELETE
      app.delete('/api/phones/:id', (req, res) => {
        console.log("delete reached")
        readFile(data => {
          // delete the phone
          const phoneId = req.params['id'];
          delete data[phoneId];
      });

  };


  module.exports = function routes (app, fs) {
    phoneRoutes(app, fs)
  }

