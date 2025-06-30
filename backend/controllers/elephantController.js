const Elephant = require('../models/Elephant');

// Get all elephant data
exports.getAllElephants = async (req, res) => {
  try {
    const elephants = await Elephant.find().sort({ year: -1 });
    res.json({
      success: true,
      data: elephants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add new elephant data
exports.createElephant = async (req, res) => {
  try {
    const elephant = new Elephant(req.body);
    await elephant.save();
    res.status(201).json({
      success: true,
      data: elephant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get elephant data by region
exports.getElephantsByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const elephants = await Elephant.find({ 
      region: new RegExp(region, 'i') 
    }).sort({ year: -1 });
    
    res.json({
      success: true,
      data: elephants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};