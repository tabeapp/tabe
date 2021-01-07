//straight up yoinked from a cite
//somehow this fucks with the very nature of react
//nvm
//just need to make sure to NOT duplicate functions, cuz that is recursive in react
export const FULL_COPY = o => {
    let newO, i;

    if(typeof o === 'function')
        return undefined;
    else if(typeof o !== 'object')
        return o;
    if(!o)
        return o;

    if('[object Array]' === Object.prototype.toString.apply(o)){
        newO = [];
        for (i = 0; i < o.length; i += 1)
            if(typeof o[i] !== 'function')
                newO[i] = FULL_COPY(o[i]);
        return newO;
    }

    newO = {};
    for(i in o){
        if(o.hasOwnProperty(i))
            if(typeof o[i] !== 'function')
                newO[i] = FULL_COPY(o[i]);
    }
    return newO;
};
