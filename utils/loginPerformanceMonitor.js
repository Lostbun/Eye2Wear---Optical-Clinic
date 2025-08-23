// Login Performance Monitor Utility
import mongoose from 'mongoose';
import { performance } from 'perf_hooks';

export const monitorLoginPerformance = async (email) => {
  const startTime = performance.now();
  
  try {
    // Test query performance
    const result = await mongoose.connection.db.collection('patientaccounts')
      .findOne({ patientemail: email }, { projection: { patientpassword: 1, patientemail: 1 } });
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`🔍 Login Query Performance:
    📧 Email: ${email}
    ⏱️  Query Time: ${duration.toFixed(2)}ms
    ✅ Found User: ${result ? 'Yes' : 'No'}
    📊 Performance: ${duration < 50 ? '🟢 Excellent' : duration < 100 ? '🟡 Good' : '🔴 Needs Optimization'}`);
    
    return { duration, found: !!result };
  } catch (error) {
    console.error('❌ Login performance monitoring failed:', error);
    return { duration: 0, found: false, error: error.message };
  }
};

export const monitorCategoryFetchPerformance = async (collectionName) => {
  const startTime = performance.now();
  
  try {
    // Test category fetch performance
    const result = await mongoose.connection.db.collection(collectionName)
      .find({})
      .sort({ [`${collectionName.replace('ies', 'y')}id`]: -1 })
      .limit(10)
      .toArray();
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`🔍 Category Fetch Performance:
    📦 Collection: ${collectionName}
    ⏱️  Query Time: ${duration.toFixed(2)}ms
    📊 Items Found: ${result.length}
    🚀 Performance: ${duration < 100 ? '🟢 Excellent' : duration < 200 ? '🟡 Good' : '🔴 Needs Optimization'}`);
    
    return { duration, count: result.length };
  } catch (error) {
    console.error('❌ Category fetch performance monitoring failed:', error);
    return { duration: 0, count: 0, error: error.message };
  }
};

export const generatePerformanceReport = (loginTimes, categoryTimes) => {
  const avgLoginTime = loginTimes.reduce((sum, time) => sum + time, 0) / loginTimes.length;
  const avgCategoryTime = categoryTimes.reduce((sum, time) => sum + time, 0) / categoryTimes.length;
  
  console.log(`
📈 PERFORMANCE SUMMARY REPORT
═════════════════════════════
🔐 Average Login Time: ${avgLoginTime.toFixed(2)}ms
📦 Average Category Fetch: ${avgCategoryTime.toFixed(2)}ms
🎯 Target Performance: <100ms
📊 Status: ${avgLoginTime < 100 && avgCategoryTime < 100 ? '🟢 OPTIMAL' : '🟡 REVIEW NEEDED'}
`);
};
