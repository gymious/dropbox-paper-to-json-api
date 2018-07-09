require('dotenv').config();

const downloadDpbMd = require('./dbp-download-md/index.js');
const mdToNestedJson = require('./md-to-json/index.js');
const mdToJson = require('./md-to-json/linear.js');
// pass your access token

function dbpMdToJson(options) {
    downloadDpbMd(options.accessToken, options.dbp_doc_id, (mdData) => {
        var nested;
        // default for nested if undefined in options arguments to be true;
        if (options.nested === undefined) {
            nested = true;
        } else {
            nested = options.nested;
        }
        
        var jsonResult;
        if (nested) {
            // convert to nested json
            jsonResult = mdToNestedJson(mdData);
        } else {
            // convert to linear json
            jsonResult = mdToJson(mdData);
        }
        // return output json 
        if (options.cb) {
            options.cb(jsonResult);
        }
    });
}

module.exports = dbpMdToJson;
