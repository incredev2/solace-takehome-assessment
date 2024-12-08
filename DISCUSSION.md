# Discussion

## Performance Optimizations

### Database Queries
Currently, the advocates API endpoint makes two separate database queries:
1. One to get the total count of records (for pagination)
2. Another to get the actual paginated data

This could be optimized by combining these into a single query using a Common Table Expression (CTE).
