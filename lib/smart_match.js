
/**
 * Variables are in the format of:
 *   - %s => an unnamed variable
 *   - %(name)s => a named variable, in this case "name" is the name
 *   - %()s => another format of an unnamed variable
 */

var findVariables = function(string) {
  var variables = [];
  var regexp = /(?:%[(]([^)]*)[)]s)|(?:%()s)/g;
  var unnamedVariables = 0;
  var reMatch;

  while ((reMatch = regexp.exec(string)) !== null) {
    variables.push(reMatch[1] || (unnamedVariables++));
  }

  return variables;
};

var parsingRegexp = function(matchString) {
  var variableSplitRegexp = /(?:%[(][^)]*[)]s)|(?:%s)/;
  var parts = matchString.split(variableSplitRegexp);
  var escapedParts = parts.map(function(part) {
    return part.split('').map(function(char) { return "[" + char + "]"; }).join('');
  });

  return new RegExp("^" + escapedParts.join("(.*)") + "$", "g");
};

var parseGivenString = function(givenString, matchString) {
  var variables = findVariables(matchString);
  var regexp = parsingRegexp(matchString);
  var match;
  var keyValues = {};

  if ((match = regexp.exec(givenString)) !== null) {
    match.shift();
    while(match.length && variables.length) {
      keyValues[variables.shift()] = match.shift();
    }
  }

  return keyValues;
};

var givenStringMatches = function(givenString, matchString) {
  var regexp = parsingRegexp(matchString);
  return !!regexp.exec(givenString);
};

var standardizePercentS = function(str) {
  var regexp = /(?:%s)|(?:%[(][)]s)/g;
  var parts = str.split(regexp);
  var unnamedVariables = 0;
  var output = [];

  for(var i = 0, len = parts.length; i < len; i++) {
    if (i !== 0) {
      output.push("%(" + (unnamedVariables++) + ")s");
    }
    output.push(parts[i]);
  }

  return output.join('');
};

var generateRedirectUrl = function(keyValues, redirectUrl) {
  var urlPattern = standardizePercentS(redirectUrl);
  var variables = findVariables(redirectUrl);

  variables.forEach(function(variableName) {
    urlPattern = urlPattern.replace("%("+variableName+')s', keyValues[variableName] || '');
  });

  return urlPattern;
};

var getExternalVariables = function(redirectUrl, parsedKeyValues) {
  var keyValues = {};
  var variables = findVariables(redirectUrl);

  variables.forEach(function(variableName) {
    switch(variableName) {
      case 'easter_egg':
        keyValues[variableName] = "bunny, bunny, bunny";
        break;
      case 'copy_of_test':
        keyValues[variableName] = parsedKeyValues['test'];
        break;
      default:
    }
  });

  return keyValues;
};

var smartMatch = function(givenString, matchString, redirectUrl) {
  var url;
  var keyValues;
  var parsedKeyValues;
  var externalKeyValues;

  if (givenStringMatches(givenString, matchString)) {
    parsedKeyValues = parseGivenString(givenString, matchString);
    externalKeyValues = getExternalVariables(redirectUrl, parsedKeyValues);

    keyValues = Object.assign({}, externalKeyValues, parsedKeyValues);
    url = generateRedirectUrl(keyValues, redirectUrl);
  }

  return url;
};

/* given string is the right part of 'go/something'
/* the match string is the item in the db that the matches the given string */
/* redirect URL is the output URL pattern for that match string */
module.exports = smartMatch;
