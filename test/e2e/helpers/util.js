
const env = process.env.RUNNING_ENV || 'aat';

const getSolicitorLoginDetails = () => {
    if (!process.env.PASSWORD-SOLICITOR) {
        throw new Error('You need to set USERNAME-SOLICITOR and PASSWORD-SOLICITOR env variables');
    }
    return {
        username: process.env.USERNAME-SOLICITOR,
        password: process.env.PASSWORD-SOLICITOR
    };
};

const getCaseWorkerLoginDetails = () => {
    if (!process.env.PASSWORD-CASEWORKER) {
        throw new Error('You need to set USERNAME-CASEWORKER and PASSWORD-CASEWORKER env variables');
    }
    return {
        username: process.env.USERNAME-CASEWORKER,
        password: process.env.PASSWORD-CASEWORKER
    };
};

module.exports = {
    getSolicitorLoginDetails,
    getCaseWorkerLoginDetails,
    createCaseInCcd,
    updateCaseInCcd,
    getBaseUrl,
    firstLetterToCaps
};
