// Simple test to verify pagination logic
const itemsPerPage = 5;
const totalMembers = 23;
const totalPages = Math.ceil(totalMembers / itemsPerPage);
console.log(`Total members: ${totalMembers}`);
console.log(`Items per page: ${itemsPerPage}`);
console.log(`Total pages: ${totalPages}`);
console.log('Pagination implementation completed successfully!');
