//straight up yoinked from a cite
//somehow this fucks with the very nature of react
//nvm
//just need to make sure to NOT duplicate functions, cuz that is recursive in react
export const FULL_COPY = o => {
    return JSON.parse(JSON.stringify(o));
};

//90 => 1:30
export const SEC_TO_TIME = seconds => {
    let m = Math.floor(seconds/60);
    let s = seconds%60;
    if(s < 10)
        s = '0' + s;
    return m + ':' + s;
};

