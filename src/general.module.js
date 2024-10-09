function dateCreator() {
    const now = new Date();
    return [
        ('0' + (now.getMonth() + 1)).slice(-2), // Month (MM)
        ('0' + now.getDate()).slice(-2),        // Day (DD)
        now.getFullYear()                       // Year (YYYY)
    ].join('/');
}



// Export the functions using module.exports
module.exports = {
    dateCreator
};