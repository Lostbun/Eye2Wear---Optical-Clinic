/**
 * Pagination middleware for handling large datasets efficiently
 */

export const createPaginationController = (model, defaultSelect = '', defaultSort = {}) => {
    return async (req, res) => {
        try {
            // Extract pagination parameters
            const page = parseInt(req.query.page) || 1;
            const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100 items per page
            const skip = (page - 1) * limit;
            
            // Extract other query parameters
            const select = req.query.select || defaultSelect;
            const sortBy = req.query.sortBy || Object.keys(defaultSort)[0] || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            const search = req.query.search || '';
            
            // Build filter object
            let filter = {};
            
            // Add search functionality if search term provided
            if (search) {
                filter.$or = [
                    // Add text search if text index exists
                    { $text: { $search: search } },
                    // Fallback to regex search on name fields
                    ...(model.schema.paths.name ? [{ name: { $regex: search, $options: 'i' } }] : []),
                    ...(model.schema.paths.email ? [{ email: { $regex: search, $options: 'i' } }] : [])
                ];
            }
            
            // Add additional filters from query parameters
            Object.keys(req.query).forEach(key => {
                if (!['page', 'limit', 'select', 'sortBy', 'sortOrder', 'search'].includes(key)) {
                    if (model.schema.paths[key]) {
                        filter[key] = req.query[key];
                    }
                }
            });
            
            // Build sort object
            const sort = { [sortBy]: sortOrder };
            
            // Execute query with pagination
            const [data, totalCount] = await Promise.all([
                model.find(filter)
                    .select(select)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                model.countDocuments(filter)
            ]);
            
            // Calculate pagination metadata
            const totalPages = Math.ceil(totalCount / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;
            
            res.json({
                success: true,
                data,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    limit,
                    hasNextPage,
                    hasPrevPage,
                    nextPage: hasNextPage ? page + 1 : null,
                    prevPage: hasPrevPage ? page - 1 : null
                }
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching data',
                error: error.message
            });
        }
    };
};

/**
 * Advanced search controller with multiple field support
 */
export const createAdvancedSearchController = (model, searchFields = []) => {
    return async (req, res) => {
        try {
            const { query, page = 1, limit = 10 } = req.query;
            
            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }
            
            const skip = (page - 1) * limit;
            
            // Create search filter for multiple fields
            const searchFilter = {
                $or: searchFields.map(field => ({
                    [field]: { $regex: query, $options: 'i' }
                }))
            };
            
            const [results, totalCount] = await Promise.all([
                model.find(searchFilter)
                    .skip(skip)
                    .limit(parseInt(limit))
                    .lean(),
                model.countDocuments(searchFilter)
            ]);
            
            res.json({
                success: true,
                data: results,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    limit: parseInt(limit)
                }
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Search error',
                error: error.message
            });
        }
    };
};

/**
 * Bulk operations controller for efficient data handling
 */
export const createBulkController = (model) => {
    return {
        // Bulk insert
        bulkInsert: async (req, res) => {
            try {
                const { documents } = req.body;
                
                if (!Array.isArray(documents) || documents.length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Documents array is required'
                    });
                }
                
                // Process in batches of 1000
                const batchSize = 1000;
                const results = [];
                
                for (let i = 0; i < documents.length; i += batchSize) {
                    const batch = documents.slice(i, i + batchSize);
                    const result = await model.insertMany(batch, { ordered: false });
                    results.push(...result);
                }
                
                res.json({
                    success: true,
                    message: `Successfully inserted ${results.length} documents`,
                    insertedCount: results.length
                });
                
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Bulk insert error',
                    error: error.message
                });
            }
        },
        
        // Bulk update
        bulkUpdate: async (req, res) => {
            try {
                const { filter, update } = req.body;
                
                const result = await model.updateMany(filter, update);
                
                res.json({
                    success: true,
                    message: `Updated ${result.modifiedCount} documents`,
                    matchedCount: result.matchedCount,
                    modifiedCount: result.modifiedCount
                });
                
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Bulk update error',
                    error: error.message
                });
            }
        },
        
        // Bulk delete
        bulkDelete: async (req, res) => {
            try {
                const { filter } = req.body;
                
                const result = await model.deleteMany(filter);
                
                res.json({
                    success: true,
                    message: `Deleted ${result.deletedCount} documents`,
                    deletedCount: result.deletedCount
                });
                
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Bulk delete error',
                    error: error.message
                });
            }
        }
    };
};

export default {
    createPaginationController,
    createAdvancedSearchController,
    createBulkController
};
