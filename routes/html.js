
module.exports = function (app) {
  
  app.get("/", (req, res) => {

    var hbsObject = {
      burger: "test",
      devoured: true
    };
    res.render("workout-list", hbsObject);
  });


  app.post("/submit", (req, res) => {
    console.log(req.body);

    db.notes.insert(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  });

  app.get("/all", (req, res) => {
    db.notes.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });

  app.get("/find/:id", (req, res) => {
    db.notes.findOne(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });

  app.post("/update/:id", (req, res) => {
    db.notes.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });

  app.delete("/delete/:id", (req, res) => {
    db.notes.remove(
      {
        _id: mongojs.ObjectID(req.params.id)
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });

  app.delete("/clearall", (req, res) => {
    db.notes.remove({}, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  });
}