
const parseInput = str => {
    let input = str.split("\n");
    let output = [];
    for (let i = 0; i < input.length; i++) {
        let line = input[i].split(' '),
            arg = [],
            name = '',
            cmd;
        if (line[0].length === 0)
            continue;
        // parse line
        for (let j = 0; j < line.length; j++) {
            // if is a command 
            if (commands[line[j]]) {
                cmd = line[j];
            } else if (line[j].indexOf("-") === 0) {
                arg.push(line[j].slice(1, 2))
            } else if (!name) {
                // only use one string as name when is not a recognized command or argument
                name = line[j];
            }
        }
        output.push({
            cmd: cmd,
            arg: arg,
            name: name
        });
    }
    return output;
}

const quit = _ => {
    console.log('shut down')
    process.exit();
};

const pwd = _ => {
    console.log(currentDir);
};

const ls = (arg) => {
    console.log(currDir)
    for (var prop in currDir) {
        if (arg && arg.indexOf('r') >= 0 && typeof(currDir[prop]) === 'object') {
            recursive.push(prop)
        }
    }

};

const mkdir = (arg, name) => {
    if (name > 100) {
        console.log("Name Invalid")
    } else if (currDir[name]) {
        console.log("Directory Already Exists")
    } else {
        currDir[name] = {
            '..': currDir
        }
    }
};

const touch = (arg, name) => {
    if (name.length === 0 || name >= 100) {
        console.log("Name Invalid")
    } else if (currDir[name]) {
        console.log("Directory Already Exists")
    } else {
        currDir[name] = 'name';
    }
};

const cd = (args, url) => {
    let dir = url.split('/'),
        newDir = currentDir.split('/'),
        error = false,
        currDirObj = currDir;

    for (let i = 0; i < dir.length; i++) {
        if (currDirObj[dir[i]]) {
            currDirObj = currDirObj[dir[i]];
        } else if (dir[i] === '') {
            continue;
        } else {
            error = true;
            console.log("Directory Not Found" + dir[i])
            break;
        }
        if (dir[i] === '..') {
            newDir.pop();
        } else {
            newDir.push(dir[i]);
        }
    }
    if (!error) {
        currDir = currDirObj;
        currentDir = newDir.join('/');
    }
};

const commands = {
    pwd: pwd,
    ls: ls,
    mkdir: mkdir,
    touch: touch,
    cd: cd,
    quit: quit,
    parseInput
}
module.exports = commands;
