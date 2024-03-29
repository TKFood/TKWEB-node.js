var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'j', password: 'j', displayName: 'j', emails: [ { value: 'j@example.com' } ] }
  , { id: 3, username: 'eb', password: 'eb', displayName: 'eb', emails: [ { value: 'eb@example.com' } ] }
  , { id: 4, username: 'moc', password: 'moc', displayName: 'moc', emails: [ { value: 'moc@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
