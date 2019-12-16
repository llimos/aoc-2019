import {Duplex} from 'stream';

export default class IntcodeComputer extends Duplex {

    constructor(intcode, initialInput, id) {
        super ({
            decodeStrings: false,
            objectMode: true
        });
        this.intcode = intcode;
        this.pointer = 0;
        this.relativeBase = 0;
        this.input = initialInput || [];
        this.id = id;
        this.paused = true;
        this.output = [];
    }

    _write(chunk, encoding, callback) {
        this.input.push(chunk);
        if (this.paused) {
            this.doRun(true, this.input);
        }
        callback();
    }

    _read() {
        this.doRun(true, this.input);
    }

    // Non-streaming version
    run(input) {
        return this.doRun(false, input);
    }


    doRun(streaming = true, input = []) {
        this.paused = false;
        const output = [];
        input = Array.isArray(input) ? input : input !== null && input !== undefined ? [input] : [];
        // console.log(this.id, 'Running');
        while (this.intcode[this.pointer] !== 99) {
            const opcode = this.intcode[this.pointer] % 100,
            paramModes = Math.floor(this.intcode[this.pointer] / 100).toString().split('').map(p => parseInt(p)).reverse();
            // console.log(this.intcode.join(''));
            // console.log(this.pointer, opcode, paramModes, this.intcode.slice(this.pointer, this.pointer + 4).join(','));
            const getLocation = paramPosition => {
                const paramValue = this.intcode[this.pointer + paramPosition + 1];
                switch(paramModes[paramPosition]) {
                    case 0:
                    case undefined:
                        return paramValue;
                    case 1:
                        return this.pointer + paramPosition + 1;
                    case 2:
                        return this.relativeBase + paramValue;
                    default:
                        throw new Error(`Invalid param mode ${paramModes[position]}`);
                }
            }
            const getParamValue = paramPosition => this.intcode[getLocation(paramPosition)] || 0;

            if (opcode === 1) { // Add
                this.intcode[getLocation(2)] = getParamValue(0) + getParamValue(1);
                this.pointer += 4;
            } else if (opcode === 2) { // Multiply
                this.intcode[getLocation(2)] = getParamValue(0) * getParamValue(1);
                this.pointer += 4;
            } else if (opcode === 3) { // Input
                const value = input.shift();
                // If there's no input, pause the machine until we get some
                if (value === undefined) {
                    this.paused = true;
                    // console.log(this.id, 'Waiting for input')
                    // Let the caller know we're waiting for input
                    if (streaming) {
                        this.push('');
                    }
                    return {value: output, done: false};
                }
                // console.log(this.id, 'Input', this.input[0]);
                this.intcode[getLocation(0)] = value;
                this.pointer += 2;
            } else if (opcode === 4) { // Output
                // console.log(this.id, 'Output', getParamValue(0));
                if (streaming) {
                    this.push(getParamValue(0));
                } else {
                    output.push(getParamValue(0));
                }
                this.pointer += 2;
            } else if (opcode === 5) { // Jump-if-true
                if (getParamValue(0) !== 0) {
                    this.pointer = getParamValue(1);
                } else {
                    this.pointer += 3;
                }
            } else if (opcode === 6) { // Jump-if-false
                if (getParamValue(0) === 0) {
                    this.pointer = getParamValue(1);
                } else {
                    this.pointer += 3;
                }
            } else if (opcode === 7) { // Less than
                this.intcode[getLocation(2)] = getParamValue(0) < getParamValue(1) ? 1 : 0;
                this.pointer += 4;
            } else if (opcode === 8) { // Equals
                this.intcode[getLocation(2)] = getParamValue(0) === getParamValue(1) ? 1 : 0;
                this.pointer += 4;
            } else if (opcode === 9) {
                this.relativeBase += getParamValue(0);
                this.pointer += 2;
            } else {
                throw new Error(`Invalid code ${this.intcode[this.pointer]} at ${this.pointer}`);
            }
        }
        // console.log(this.id, 'End loop')
        if (this.intcode[this.pointer] === 99) {
            // console.log(this.id, 'Computer Finished');
            if (streaming) {
                this.push(null);
            }
            return {value: output, done: true};
        }
    }
}

export function compute(intcode, input) {
    return new Promise((resolve, reject) => {
        const computer = new IntcodeComputer(intcode, input);
        const output = [];
        computer.on('end', () => resolve(output));
        computer.on('error', reject);
        computer.on('data', data => output.push(data));
    });
}