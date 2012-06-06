exports.encode = function (input) {
    if (typeof (input) === 'number') {
        input = input.toString();
    }

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        output = "",
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        i = 0;

    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & (keyStr.length - 1);

        if (isNaN(chr2)) {
            enc3 = enc4 = keyStr.length;
        } else if (isNaN(chr3)) {
            enc4 = keyStr.length;
        }

        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return output;
}
