'use strict';

const fs = require('fs');
var exec = require('child_process').exec;
const commands = require('./cmd');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let root = {};
let currDir = root;
let currentDir = '/root';

process.stdin.on('data', inputStdin => {
    let inputString = commands.parseInput(inputStdin);
    commands.executeInput(inputString);
});

const executeInput = inputArray => {
    inputArray.forEach(line => {
        if (commands[line.cmd]) {
            commands[line.cmd](line.args, line.name);
        } else {
            console.log('Unrecognized Command');
        }
    })
};

process.stdin.on('end', _ => {
    return;
});
