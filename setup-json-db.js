var fs = require('fs'),
    path = require('path'),
    dbFilePath = path.join(__dirname, 'db.json'),
    dbContent = {
      people: [
        {
          id: 1,
          name: 'Foo Bar',
          mail: 'foo@bar.io'
        },
        {
          id: 2,
          name: 'Bar oof',
          mail: 'oof@rab.io'
        }
      ]
    };

fs.exists(dbFilePath, function(exists) {
  if (! exists) {
    fs.writeFile(dbFilePath, JSON.stringify(dbContent), {encoding: 'utf-8'});
  }
});