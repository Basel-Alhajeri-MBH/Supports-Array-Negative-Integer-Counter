(function () {
    // ...[[(C) Basel Alhajri MBH]][-1]
    'use strict';
    const mon = Object.create(null);
    const pro = new Proxy(Array.prototype, {
        get(t, p, r) {
            if (typeof p === "symbol") return;
            p = +p;
            return !isNaN(p) &
                Number.isInteger(p) &
                    p < 0 & r.length > 0 &
                    -p <= r.length ?
                r[r.length+p]: undefined;
        }
    });
    for (let p of Object.getOwnPropertyNames(
        Object.getPrototypeOf(
            Array.prototype)))
        mon[p] = Array.prototype[p];
    Object.setPrototypeOf(mon, Object.create(pro));
    Object.setPrototypeOf(Array.prototype, mon);


    //-------------

    let test = false; // turn it to true for tests

    if (test) {
        const {log} = console;
        let array = Array.from({length: 10}, (_, i) => ++i);
        let tests = [
            'array',
            'array[1]',
            'array[-1]',
            'array[-5]',
            'array[-100]',
            'delete array[-1]',
            '1 in array',
            '(-3) in array',
            'array.hasOwnProperty(3)',
            'array.hasOwnProperty(-5)',
            'array[0] = -1',
            'array[-2] = -9',
            '[...array.keys()]',
            '[...array.values()]',
            'Object.getOwnPropertyNames(array)'
        ];
        alert(array);
        let i = 1;
        for (let example of tests)
            try {
            log(`${i++}. ${example}:`, Function('array', 'return '+ example)(array));
        } catch(e) {
            log(`${i}. ${example}: throws %c${e}`, 'color: red;');
        }
    }
})();￼Enter
