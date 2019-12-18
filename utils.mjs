export function lcm(values) {
    // First, factorize the values
    const primeFactors = values.map(factorize);
    console.log(primeFactors)

    // Any prime factors that exist in more than one set can be removed (once)
    for (let i=0; i<primeFactors.length; i++) {
        for (let j=i+1; j<primeFactors.length; j++) {
            for (value of primeFactors[i]) {
                const pos = primeFactors[j].indexOf(value);
                if (pos > -1) {
                    primeFactors[j].splice(pos, 1);
                }
            }
        }
    }
    console.log(primeFactors)
    return primeFactors.flat().reduce((acc,fac) => acc * fac, 1);
}

export function factorize(num) {
    for (let i=2; i<num/3; i++) {
        if (num % i === 0) {
            return [...factorize(i), ...factorize(num / i)];
        }
    }
    // It's already prime
    return [num];
}