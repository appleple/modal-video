
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 8080
    },
    "files": [
      "./js/*.js",
      "./css/*.css"
    ],
    "startPath": "/test/index.html",
    "server": true,
    // "proxy": {
    //   target: "modalvideo.dev",
    //   ws: true
    // },
    "port": 80,
    "open": "external"
};
