var request = require('request-promise'),
    cheerio = require('cheerio'),
    steam_sc = require('./showcases.js');
    
console.log('SteamProfile\n###################');

// URL to steam profile
var profile_url = process.argv[2];
if (profile_url === undefined) {
    console.error('ERROR: No profile_url passed');
    process.exit();
}

var DATA = {'url': profile_url};

// Selectors
var CSS = {
    name: '.actual_persona_name',
    level: '.persona_level span',
    showcases: '.profile_customization_header',
}

// Download page
function page_main() {
    request(profile_url).then(function (body) {
        var $ = cheerio.load(body);
        
        // Select
        DATA['username'] = $(CSS.name).text().trim();
        DATA['level'] = parseInt($(CSS.level).text());
        
        // Showcases
        var showcases = $(CSS.showcases);
        showcases.each(function(i, e) {
            var name = $(e).text().replace(' ', '').trim();
            // If we have a supported showcase
            if (name in steam_sc) {
                DATA[name] = steam_sc[name]($(e).parent());
            } else {
                console.log('No showcase parser for "' + name + '"');
            }
        });
        
        console.log(DATA);
    })
}

page_main();

// Output