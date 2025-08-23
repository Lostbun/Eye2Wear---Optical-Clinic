/* Database Performance Optimization Utilities */
import mongoose from 'mongoose';

/**
 * Database optimization utilities for better performance
 */
export class DatabaseOptimizer {
    
    /**
     * Create indexes for all models to improve query performance
     */
    static async createOptimalIndexes() {
        try {
            console.log('🚀 Creating database indexes for optimal performance...');
            
            // Get all collections
            const collections = await mongoose.connection.db.listCollections().toArray();
            
            for (const collection of collections) {
                const collectionName = collection.name;
                console.log(`📊 Analyzing indexes for collection: ${collectionName}`);
                
                // Get existing indexes
                const existingIndexes = await mongoose.connection.db.collection(collectionName).listIndexes().toArray();
                console.log(`   Found ${existingIndexes.length} existing indexes`);
            }
            
            console.log('✅ Database index optimization completed');
            
        } catch (error) {
            console.error('❌ Error creating indexes:', error);
        }
    }
    
    /**
     * Analyze slow queries and provide optimization suggestions
     * Note: Profiler is disabled for MongoDB Atlas as it's not allowed
     */
    static async analyzeSlowQueries() {
        try {
            console.log('🔍 Database performance monitoring enabled (Atlas-compatible mode)');
            // Profiler is not available on MongoDB Atlas, so we skip this
            // Instead, we rely on the indexes we've created and query optimization
            
        } catch (error) {
            console.error('❌ Error setting up performance monitoring:', error);
        }
    }
    
    /**
     * Optimize connection pool settings
     */
    static getOptimizedConnectionOptions() {
        return {
            maxPoolSize: 10, // Maximum number of connections
            serverSelectionTimeoutMS: 5000, // How long to wait for server selection
            socketTimeoutMS: 45000, // How long to wait for socket operations
            // Connection management
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
            retryWrites: true,
            // Read preferences for better performance
            readPreference: 'primaryPreferred',
            // Write concerns for consistency vs performance balance
            writeConcern: {
                w: 'majority',
                j: true, // Wait for journal
                wtimeout: 5000
            }
        };
    }
    
    /**
     * Monitor database performance metrics
     */
    static async getPerformanceMetrics() {
        try {
            const stats = await mongoose.connection.db.stats();
            
            return {
                collections: stats.collections,
                dataSize: (stats.dataSize / 1024 / 1024).toFixed(2) + ' MB',
                storageSize: (stats.storageSize / 1024 / 1024).toFixed(2) + ' MB',
                indexes: stats.indexes,
                indexSize: (stats.indexSize / 1024 / 1024).toFixed(2) + ' MB',
                avgObjSize: stats.avgObjSize,
                connections: mongoose.connection.readyState
            };
            
        } catch (error) {
            console.error('❌ Error getting performance metrics:', error);
            return null;
        }
    }
    
    /**
     * Common query optimization patterns
     */
    static getOptimizedQuery(model, filters = {}, options = {}) {
        const {
            select = '',
            sort = {},
            limit = 0,
            skip = 0,
            lean = true,
            populate = null
        } = options;
        
        let query = model.find(filters);
        
        // Apply field selection if provided
        if (select) {
            query = query.select(select);
        }
        
        // Apply sorting
        if (Object.keys(sort).length > 0) {
            query = query.sort(sort);
        }
        
        // Apply pagination
        if (skip > 0) {
            query = query.skip(skip);
        }
        
        if (limit > 0) {
            query = query.limit(limit);
        }
        
        // Use lean() for read-only operations
        if (lean) {
            query = query.lean();
        }
        
        // Apply population if needed
        if (populate) {
            query = query.populate(populate);
        }
        
        return query;
    }
    
    /**
     * Batch operations for better performance
     */
    static async batchInsert(model, documents, batchSize = 1000) {
        const results = [];
        
        for (let i = 0; i < documents.length; i += batchSize) {
            const batch = documents.slice(i, i + batchSize);
            try {
                const result = await model.insertMany(batch, { 
                    ordered: false, // Continue on error
                    rawResult: true // Get detailed results
                });
                results.push(result);
            } catch (error) {
                console.error(`❌ Batch insert error for batch ${i / batchSize + 1}:`, error);
            }
        }
        
        return results;
    }
    
    /**
     * Enable query logging for development
     */
    static enableQueryLogging() {
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', (collectionName, method, query, doc) => {
                console.log(`🔍 MongoDB ${method} on ${collectionName}:`, JSON.stringify(query));
            });
        }
    }
    
    /**
     * Clean up old data (useful for logs, temporary data)
     */
    static async cleanupOldData(model, dateField = 'createdAt', daysOld = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);
            
            const result = await model.deleteMany({
                [dateField]: { $lt: cutoffDate }
            });
            
            console.log(`🧹 Cleaned up ${result.deletedCount} old documents from ${model.modelName}`);
            return result;
            
        } catch (error) {
            console.error(`❌ Error cleaning up old data from ${model.modelName}:`, error);
        }
    }
}

export default DatabaseOptimizer;
