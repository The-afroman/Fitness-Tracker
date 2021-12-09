'use strict'

module.exports = {
    Profile: Profile,
    ProfileToList: ProfileToList
}

/**
 * Creates a profile Object containing a id, first name and last name
 */
function Profile(obj) {
    let profile = null
    profile = {
     userid: obj.userid,
     first_name: obj.first_name,
     last_name: obj.last_name
    }

    if (profile == null) {
        throw new ProfileFormatException(obj)
    }

    return profile
}

/**
 * error message to invalid Profile creation
 * @param {*} value 
 */
function ProfileFormatException(value) {
    this.value = JSON.stringify(value);
    this.message = 'does not conform to the expected format for a profile';
    this.toString = function() {
        return this.value + ' ' + this.message;
    };
}

/**
 * stores and returns profile into a list format
 */

function ProfileToList(profile) {
    if (profile == null) {
        throw new profileFormatException(profile)
    }

    return [profile.userid, profile.first_name, profile.last_name]
}