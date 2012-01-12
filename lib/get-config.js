var siteConfig;

try {
    siteConfig = require('../config');
} catch(e) {
    throw new Error('Could not load site config.')
}

module.exports = siteConfig;