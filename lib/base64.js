exports.encode = function (input) {
  return new Buffer(input+'').toString('base64');
}
