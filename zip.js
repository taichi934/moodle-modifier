const zip = require('bestzip');
let destination = `./release/moodle_modifier`;
if (process.argv.length >= 3) {
    destination += `_${process.argv[2]}`;
}
destination += '.zip';
zip({
    source: [
        'manifest.json',
        'dist/*',
        'src/css/*',
        'src/images/*',
        'src/popup/*',
        'rules.json',
    ],
    destination,
});
