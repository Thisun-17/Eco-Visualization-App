const mongoose = require('mongoose');
require('dotenv').config();

async function debugDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔍 Connected to MongoDB. Debugging database contents...\n');
    
    // Get database name
    const dbName = mongoose.connection.name;
    console.log(`📊 Database name: ${dbName}`);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length === 0) {
      console.log('❌ No collections found - database is empty!');
    } else {
      for (const collection of collections) {
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        console.log(`   - ${collection.name}: ${count} documents`);
        
        if (count > 0) {
          const sample = await mongoose.connection.db.collection(collection.name).findOne();
          console.log(`     Sample document:`, JSON.stringify(sample, null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

debugDatabase();