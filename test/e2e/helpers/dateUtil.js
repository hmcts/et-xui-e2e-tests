const date = require('moment');

function createSolicitorReference() {

    return date().valueOf();
}

function getFastTrackHearingDate() {

    return date().add(1*7,'d').format('DD-MM-YYYY');
}

function getStandardHearingDate() {

    return date().add(1 * 7, 'd').format('DD-MM-YYYY');
}


module.exports = { createSolicitorReference, getFastTrackHearingDate, getStandardHearingDate};
