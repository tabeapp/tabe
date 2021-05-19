//just need to make sure to NOT duplicate functions, cuz that is recursive in react
import moment from 'moment';

export const FULL_COPY = o => {
    return JSON.parse(JSON.stringify(o));
};

//90 => 1:30
export const SEC_TO_TIME = seconds => {
    seconds = Math.floor(seconds);
    let m = Math.floor(seconds/60);
    let s = seconds%60;
    if(s < 10)
        s = '0' + s;
    return m + ':' + s;
};

export const INCH_TO_HEIGHT = inches => {
    inches = Math.floor(inches);
    let f = Math.floor(inches/12);
    let i = inches%12;
    return {feet: f, inches: i};
}

export const ROUND_5 = num => {
    return Math.round(num/5)*5;
};

export const PAST_DATE_FORMAT = (timestamp, now) => {

    const days = moment(now).diff(timestamp /** 1000*/, 'days');


    if(days > 0)
        return moment(timestamp).format('MMMM D YYYY, h:mma');

    const scales = ['days', 'hours', 'minutes', 'seconds'];

    for (let i=0; i < scales.length; i++){
        const scale = scales[i];
        const diff = moment(now).diff(timestamp /** 1000*/, scale);
        if(diff > 0)
            return diff + scale.charAt(0);
    }

    return 0 + scales[scales.length - 1].charAt(0);
};

//ughh... we're gonna have to do kg/lb here eventually aren't we
export const FORMAT_WEIGHT = parseInt;
