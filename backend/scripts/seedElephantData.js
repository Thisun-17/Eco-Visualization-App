const mongoose = require('mongoose');
require('dotenv').config();

// Make sure we're using the same model definition
const elephantSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 1990,
    max: 2030
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  nationalPark: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true,
    min: 0
  },
  area_km2: {
    type: Number,
    required: true,
    min: 0
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
      min: 5.5,
      max: 10.0
    },
    longitude: {
      type: Number,
      required: true,
      min: 79.5,
      max: 82.0
    }
  },
  province: {
    type: String,
    enum: ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'],
    required: true
  }
}, {
  timestamps: true
});

const ElephantData = mongoose.model('ElephantData', elephantSchema);

const sriLankanElephantData = [
  {
    year: 2024,
    region: "Yala National Park",
    nationalPark: "Yala National Park",
    population: 350,
    area_km2: 979,
    coordinates: { latitude: 6.3725, longitude: 81.5185 },
    province: "Southern"
  },
  {
    year: 2024,
    region: "Udawalawe National Park",
    nationalPark: "Udawalawe National Park", 
    population: 250,
    area_km2: 308,
    coordinates: { latitude: 6.4414, longitude: 80.8949 },
    province: "Sabaragamuwa"
  },
  {
    year: 2024,
    region: "Minneriya National Park",
    nationalPark: "Minneriya National Park",
    population: 200,
    area_km2: 89,
    coordinates: { latitude: 8.0167, longitude: 80.8833 },
    province: "North Central"
  },
  {
    year: 2024,
    region: "Kaudulla National Park", 
    nationalPark: "Kaudulla National Park",
    population: 180,
    area_km2: 69,
    coordinates: { latitude: 8.1167, longitude: 80.8500 },
    province: "North Central"
  },
  {
    year: 2023,
    region: "Yala National Park",
    nationalPark: "Yala National Park",
    population: 340,
    area_km2: 979,
    coordinates: { latitude: 6.3725, longitude: 81.5185 },
    province: "Southern"
  },
  {
    year: 2023,
    region: "Udawalawe National Park",
    nationalPark: "Udawalawe National Park",
    population: 245,
    area_km2: 308,
    coordinates: { latitude: 6.4414, longitude: 80.8949 },
    province: "Sabaragamuwa"
  }
];

const seedElephantDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔄 Connected to MongoDB for seeding...');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    // Clear existing elephant data
    const deletedCount = await ElephantData.deleteMany({});
    console.log(`🗑️ Cleared ${deletedCount.deletedCount} existing records`);
    
    // Insert sample data
    console.log('📝 Inserting new elephant data...');
    const insertedData = await ElephantData.insertMany(sriLankanElephantData);
    console.log(`✅ Successfully seeded ${insertedData.length} elephant records`);
    
    // Verify the data was inserted
    const totalCount = await ElephantData.countDocuments();
    console.log(`📊 Total records in database: ${totalCount}`);
    
    // Show sample data
    const sampleRecord = await ElephantData.findOne();
    console.log('📋 Sample record:', {
      year: sampleRecord.year,
      region: sampleRecord.region,
      population: sampleRecord.population,
      province: sampleRecord.province
    });
    
    // Display summary by province
    const summary = await ElephantData.aggregate([
      {
        $group: {
          _id: '$province',
          totalPopulation: { $sum: '$population' },
          parkCount: { $addToSet: '$nationalPark' }
        }
      }
    ]);
    
    console.log('\n📊 Data Summary by Province:');
    summary.forEach(item => {
      console.log(`   ${item._id}: ${item.totalPopulation} elephants in ${item.parkCount.length} parks`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🔗 Test your API: http://localhost:3000/api/elephants');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('Full error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedElephantDatabase();