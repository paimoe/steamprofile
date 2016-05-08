var request = require('request-promise'),
    cheerio = require('cheerio'),
    defer = require('deferred'),
    steam_sc = require('./showcases.js');

var DATA = {};

// Selectors
var CSS = {
    name: '.actual_persona_name',
    level: '.persona_level span',
    showcases: '.profile_customization',
}

// Download page
function page_main(profile_url) {
    var def = defer();
    request(profile_url).then(function (body) {
        var $ = cheerio.load(body);
        
        // Select
        DATA['username'] = $(CSS.name).text().trim();
        DATA['level'] = parseInt($(CSS.level).text());
        
        // Showcases
        var showcases = $(CSS.showcases);
        showcases.each(function(i, e) {
            var name = $(e).find('.profile_customization_header').text().replace(' ', '').trim();
            // If we have a supported showcase
            if (name in steam_sc) {
                DATA[name] = steam_sc[name](e);
            } else {
                //console.log('No showcase parser for "' + name + '"');
            }
        });
        
        def.resolve(DATA);
    });
    return def.promise;
}

exports.get = page_main;

if (require.main === module) {
    
    // URL to steam profile
    var profile_url = process.argv[2];
    if (profile_url === undefined) {
        console.error('ERROR: No profile_url passed');
        process.exit();
    }
    
    // Check if we wanna output
    if (process.argv[3] !== undefined) {
        var output_dest = process.argv[3];
    }
    
    page_main(profile_url).then(function(result) {
        console.log(result);
    })
}
