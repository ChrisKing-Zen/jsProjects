const regex = /(?<cal>(month|week))\S(?<freq>\d)/gm;
const str = `month_1_2_1_#no
 "week_4___5#"`;
let m;
let freq = ''
while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        z = regex.lastIndex++;
        regex.lastIndex++;
    }
    freq = [m.groups.cal,m.groups.freq]
}

console.log(freq);