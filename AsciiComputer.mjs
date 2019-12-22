import IntcodeComputer from './IntcodeComputer.mjs';

function fromAscii(input) {
    return input.split('').map(a => a.charCodeAt(0));
}

function toAscii(output) {
    if (Array.isArray(output)) {
        return output.map(toAscii).join('');
    }
    return output <= 255 ? String.fromCharCode(output) : output;
}

export default class AsciiComputer extends IntcodeComputer {
    constructor(intcode, input) {
        super(intcode, input ? fromAscii(input) : input);
    }

    _write(chunk, encoding, callback) {
        super._write(fromAscii(chunk), encoding, callback);
    }

    run(input) {
        const result = this.doRun(false, input ? fromAscii(input) : input);
        return {
            ...result,
            value: toAscii(result.value)
        };
    }

    push(output) {
        return super.push(String.fromCharCode(output));
    }
    
}

export function compute(intcode, input) {
    return new AsciiComputer(intcode).run(input).value;
}