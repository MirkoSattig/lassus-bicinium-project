import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathToKernScores = `${__dirname}/../lassus-bicinia/kern/`;
const biciniumYamlPath = `${__dirname}/../content/bicinia/`;

function getIdFromFilename(path) {
    return path.split(/[\\\/]/).pop().replace(/\..+$/, '');
}

function parseHumdrumReferenceRecords(humdrum) {
    let lines = humdrum.split(/\r?\n/);
    let output = {};
    for (let i = 0; i < lines.length; i++) {
        const matches = lines[i].match(/^!!!\s*([^:]+)\s*:\s*(.*)\s*$/);
        if (matches) {
            const existingValue = output[matches[1]];
            if (Array.isArray(existingValue)) {
                output[matches[1]].push(matches[2])
            } else if (!Array.isArray(existingValue) && typeof existingValue !== 'undefined') {
                output[matches[1]] = [existingValue, matches[2]]
            } else {
                output[matches[1]] = matches[2];
            }
        }
    }
    return output;
}

function getFiles(directory, fileList) {
    fileList = fileList || [];
    let files = fs.readdirSync(directory);
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    for (let i in files) {
        const name = `${directory}/${files[i]}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, fileList);
        } else {
            fileList.push(name);
        }
    }
    return fileList;
}

execSync(`mkdir -p ${biciniumYamlPath}`);

getFiles(pathToKernScores).forEach(file => {
    const id = getIdFromFilename(file);
    console.log(id);

    const kern = fs.readFileSync(file, 'utf8');
    const referenceRecords = parseHumdrumReferenceRecords(kern);
    console.log(referenceRecords);

    const config = {
        id,
        nr: parseInt(referenceRecords.ONM, 10),
        title: referenceRecords['OTL@@LA'],
        localRawFile: `/kern/lassus-bicinia/${id}.krn`,
    };

    const configFilename = `${id}.yaml`;
    fs.writeFileSync(`${biciniumYamlPath}${configFilename}`, yaml.dump(config, {
        indent: 4,
        lineWidth: -1,
        sortKeys: true,
    }));
 
});
