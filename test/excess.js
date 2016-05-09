var test = require('tape');
var finished = require('../');
var lines = [
    'TAP version 13',
    '# wait',
    'ok 1 first thing',
    'ok 2 second thing',
    '1..2',
    '# tests 2',
    '# pass  1',
    '# fail  1',
    'ok 3 third thing'
];

test(function (t) {
    t.plan(3);
    var done = false;
    
    var stream = finished({ wait: 250 }, function (results) {
        t.equal(done, true);

        t.equal(results.pass, 2);
        t.equal(results.ok, true);
    });
    
    var iv = setInterval(function () {
        if (lines.length === 0) {
            clearInterval(iv);
            done = true;
        }
        
        var line = lines.shift();
        stream.write(line + '\n');
    }, 25);
});
