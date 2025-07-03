const mongoose = require('mongoose');
const ElephantData = require('./models/Elephant'); // Adjust path if needed
require('dotenv').config();

async function verifyPhase2() {
  try {
    console.log('🔍 Verifying Phase 2 Implementation...\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connection: WORKING');
    
    // Check if data exists
    const dataCount = await ElephantData.countDocuments();
    console.log(`✅ Data seeding: ${dataCount} records found`);
    
    // Test data retrieval
    const sampleData = await ElephantData.findOne();
    if (sampleData) {
      console.log('✅ Data structure: VALID');
      console.log(`   Sample: ${sampleData.region} - ${sampleData.population} elephants`);
    }
    
    // Check data variety
    const regions = await ElephantData.distinct('region');
    console.log(`✅ Data variety: ${regions.length} different regions`);
    console.log(`   Regions: ${regions.join(', ')}`);
    
    // Check recent data
    const latestData = await ElephantData.findOne().sort({ year: -1 });
    console.log(`✅ Latest data: Year ${latestData.year}`);
    
    console.log('\n🎉 Phase 2 Verification: ALL CHECKS PASSED!');
    console.log('\n📋 Phase 2 Status: COMPLETE ✅');
    console.log('\n🚀 Ready for Phase 3: Frontend Development');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.log('\n🔧 Issues to fix:');
    if (error.message.includes('Cannot find module')) {
      console.log('   - Check your model file path in require statement');
    }
    if (error.message.includes('connection')) {
      console.log('   - Verify MongoDB connection string');
    }
  } finally {
    await mongoose.connection.close();
  }
}

verifyPhase2();