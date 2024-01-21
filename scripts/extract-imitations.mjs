import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { v5 as uuidv5 } from 'uuid';

const UUID_NAMESPACE = '6d4614bf-f8ee-4144-a245-47ae10e59ac0';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathToKernScores = `${__dirname}/../lassus-bicinia/kern/`;
const imitationAnnotationsFile = `${__dirname}/../lassus-bicinia/imitations.yaml`;
const imitationsKernPath = `${__dirname}/../kern/imitations/`;
const imitationsYamlPath = `${__dirname}/../content/imitations/`;

function getIdFromFilename(path) {
    return path.split(/[\\\/]/).pop().replace(/\..+$/, '');
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

function tokenIsDataRecord(token, includeNullToken = false) {
    return !token.startsWith('!') && !token.startsWith('*') && !token.startsWith('=') && !(!includeNullToken && token === '.');
}

function escapeShell(cmd) {
    return '"' + cmd.replace(/(["$`\\])/g, '\\$1') + '"';
}

function getImitationInterval(firstVoiceStartToken, secondVoiceStartToken) {
    const kern = `**kern
${firstVoiceStartToken}
${secondVoiceStartToken}
*-`;
    const result = execSync(`echo ${escapeShell(kern)} | mint`).toString().trim();;
    return result.split('\n')[2];
}

execSync(`rm -rf ${imitationsKernPath}`);
execSync(`mkdir -p ${imitationsKernPath}`);
execSync(`rm -rf ${imitationsYamlPath}`);
execSync(`mkdir -p ${imitationsYamlPath}`);

const imitationAnnotations = yaml.load(fs.readFileSync(imitationAnnotationsFile, 'utf8'));

getFiles(pathToKernScores).forEach(file => {
    const id = getIdFromFilename(file);
    console.log(id);
    const annotations = imitationAnnotations[id];
    if (annotations) {
        const kern = execSync(`cat ${file} | beat -ca -A 0`).toString().trim();
        annotations.forEach(annotation => {
            const {upper, lower} = annotation;
            const upperStartBeat = upper[0];
            const upperEndBeat = upper[1];
            const lowerStartBeat = lower[0];
            const lowerEndBeat = lower[1];
            const lines = kern.split('\n');
            let upperStartLineIndex = null;
            let upperEndLineIndex = null;
            let lowerStartLineIndex = null;
            let lowerEndLineIndex = null;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (tokenIsDataRecord(line)) {
                    const tokens = line.split('\t');
                    const beat = parseFloat(tokens[4]);
                    if (beat === upperStartBeat) {
                        upperStartLineIndex = i;
                    }
                    if (beat === upperEndBeat) {
                        upperEndLineIndex = i;
                    }
                    if (beat === lowerStartBeat) {
                        lowerStartLineIndex = i;
                    }
                    if (beat === lowerEndBeat) {
                        lowerEndLineIndex = i;
                    }                    
                }
            }
            if (upperStartLineIndex && upperEndLineIndex && lowerStartLineIndex && lowerEndLineIndex) {
                const startLine = Math.min(upperStartLineIndex, lowerStartLineIndex) + 1;
                const endLine = Math.max(upperEndLineIndex, lowerEndLineIndex) + 1;

                const startBeat = Math.min(upperStartBeat, lowerStartBeat);
                const endBeat = Math.max(upperEndBeat, lowerEndBeat);

                const imitationKern = execSync(`cat ${file} | myank -I -l ${startLine}-${endLine} --hide-starting --hide-ending`).toString().trim();
                const imitationFilename = `${uuidv5(imitationKern, UUID_NAMESPACE)}.krn`;
                fs.writeFileSync(`${imitationsKernPath}${imitationFilename}`, imitationKern);

                const imitationId = `${id}-${startBeat}`;

                const upperVoiceIsFirst = upperStartBeat < lowerStartBeat;
                const firstVoiceStartToken = lines[upperVoiceIsFirst ? upperStartLineIndex : lowerStartLineIndex].split('\t')[upperVoiceIsFirst ? 2 : 0];
                const secondVoiceStartToken = lines[upperVoiceIsFirst ? lowerStartLineIndex : upperStartLineIndex].split('\t')[upperVoiceIsFirst ? 0: 2];

                const config = {
                    id: imitationId,
                    biciniumId: id,
                    startBeat,
                    endBeat,
                    upperStartBeat,
                    upperEndBeat,
                    lowerStartBeat,
                    lowerEndBeat,
                    upperStartLineIndex,
                    upperEndLineIndex,
                    lowerStartLineIndex,
                    lowerEndLineIndex,
                    filename: imitationFilename,
                    interval: getImitationInterval(firstVoiceStartToken, secondVoiceStartToken),
                };

                const configFilename = `${imitationId}.yaml`;
                fs.writeFileSync(`${imitationsYamlPath}${configFilename}`, yaml.dump(config, {
                    indent: 4,
                    lineWidth: -1,
                    sortKeys: true,
                }));

                console.log(config);
            }
        });
    }
});
