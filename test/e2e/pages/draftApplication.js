
function etpageFlow(I) {
    I.amOnPage('/');
    I.see('Make a claim to an employment tribunal');
    I.click('Start now');
    I.see('Before you continue');
    I.click('Continue');
}


function singleClaimSelfFlow(I) {
    etpageFlow()
    I.see('Are you making your claim yourself or are you a ‘representative’ making a claim for someone else?');
    I.checkOption('#lip-or-representative');
    I.see('Are you making a ‘single’ claim on your own or a ‘multiple’ claim alongside other people?');
    I.checkOption('#single-or-multiple-claim');
    I.click('Continue');
    I.see("Are you making a claim against more than 1 'respondent'?");
    I.checkOption('more_than_one_respondent-2');
    I.click('Continue');
    I.see("Do you have an ‘Acas early conciliation certificate’ for each respondent you're making a claim against?");
    I.checkOption('#acas-single');
    I.click('Continue');
    I.see("What type of claim do you want to make?");
    I.checkOption('#typeOfClaim');
    //place holder
    I.click('Continue');
}

function multipleClaimSelfFlow(I) {
    etpageFlow()
    I.see('Are you making your claim yourself or are you a ‘representative’ making a claim for someone else?');
    I.checkOption('#lip-or-representative');
    I.see('Are you making a ‘single’ claim on your own or a ‘multiple’ claim alongside other people?');
    I.checkOption('#single-or-multiple-claim-2');
    I.click('Continue');
    //placeholder
}

function singleClaimRepFlow(I) {
    etpageFlow()
    I.see('Are you making your claim yourself or are you a ‘representative’ making a claim for someone else?');
    I.checkOption('#lip-or-representative-2');
    // not working beyond this point locally
}

function multipleClaimRepFlow(I) {
    etpageFlow()
    I.see('Are you making your claim yourself or are you a ‘representative’ making a claim for someone else?');
    I.checkOption('#lip-or-representative-2');
    // not working beyond this point locally
}
