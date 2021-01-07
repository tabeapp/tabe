//straight up yoinked from a cite
//somehow this fucks with the very nature of react
//nvm
//just need to make sure to NOT duplicate functions, cuz that is recursive in react
export const FULL_COPY = o => {
    return JSON.parse(JSON.stringify(o));
};

