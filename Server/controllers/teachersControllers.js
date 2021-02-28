const Teachers = require("../models/teacher");

const teacherData = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await Teachers.findById(id);
    if (!user) {
      throw new Error("No data found");
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getTeachersDetails = (req, res) => {
  //console.log(req.query.q);
  if(req.query.page){
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.next = {
    page: page + 1,
    limit: limit,
  };

  results.prev = {
    page: page - 1,
    limit: limit,
  };

  Teachers.find()
    .then((teachers) => {
      results.length = teachers.length;
      results.current = teachers.slice(startIndex, endIndex);

      res.json(results);
    })

    .catch((err) => res.status(500).json("Error" + err));
  }
  else if(req.query.q) {
    Teachers.find({name : req.query.q}).then((result)=>res.json(result))
    .catch((err)=>res.status(203).json({ERROR:"USER NAME NOT DEFINED"}))
  }
};


module.exports = { teacherData, getTeachersDetails };
