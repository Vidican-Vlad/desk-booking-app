function isStringInvalid (string, l = 4)
{
    if(!string || (typeof string != 'string' && !(string instanceof String)) || string.trim().length < l)
        {
            return true;
        }
    return false;
}

module.exports = isStringInvalid;
