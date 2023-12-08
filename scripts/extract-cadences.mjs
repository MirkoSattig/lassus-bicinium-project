import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { v5 as uuidv5 } from 'uuid';

const UUID_NAMESPACE = '6d4614bf-f8ee-4144-a245-47ae10e59ac0';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathToKernScores = `${__dirname}/../lassus-bicinia/kern/`;
const cadenceAnnotationsFile = `${__dirname}/../lassus-bicinia/cadences.yaml`;
const cadencesKernPath = `${__dirname}/../kern/cadences/`;
const cadencesYamlPath = `${__dirname}/../content/cadences/`;

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

export function tokenIsDataRecord(token, includeNullToken = false) {
    return !token.startsWith('!') && !token.startsWith('*') && !token.startsWith('=') && !(!includeNullToken && token === '.');
}

execSync(`rm -rf ${cadencesKernPath}`);
execSync(`mkdir -p ${cadencesKernPath}`);
execSync(`rm -rf ${cadencesYamlPath}`);
execSync(`mkdir -p ${cadencesYamlPath}`);

const cadenceAnnotations = yaml.load(fs.readFileSync(cadenceAnnotationsFile, 'utf8'));

getFiles(pathToKernScores).forEach(file => {
    const id = getIdFromFilename(file);
    console.log(id);
    const annotations = cadenceAnnotations[id];
    if (annotations) {
        const kern = execSync(`cat ${file} | beat -ca -A 0`).toString().trim();
        annotations.forEach(annotation => {
            const [startBeat, endBeat, ultima] = annotation;
            const lines = kern.split('\n');
            let startLineIndex = null;
            let endLineIndex = null;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (tokenIsDataRecord(line)) {
                    const tokens = line.split('\t');
                    const beat = parseFloat(tokens[4]);
                    if (beat === startBeat) {
                        startLineIndex = i;
                    }
                    if (beat === endBeat) {
                        endLineIndex = i;
                        break;
                    }
                }
            }
            if (startLineIndex && endLineIndex) {
                const startLine = startLineIndex + 2;
                const endLine = endLineIndex + 2;

                const cadenceKern = execSync(`cat ${file} | myank -I -l ${startLine}-${endLine} --hide-starting --hide-ending`).toString().trim();
                const cadenceFilename = `${uuidv5(cadenceKern, UUID_NAMESPACE)}.krn`;
                fs.writeFileSync(`${cadencesKernPath}${cadenceFilename}`, cadenceKern);

                const config = {
                    biciniumId: id,
                    startBeat,
                    endBeat,
                    startLine,
                    endLine,
                    ultima,
                    filename: cadenceFilename,
                };

                const configFilename = `${id}-${endBeat}.yaml`;
                fs.writeFileSync(`${cadencesYamlPath}${configFilename}`, yaml.dump(config, {
                    indent: 4,
                    lineWidth: -1,
                    sortKeys: true,
                }));

                console.log(config);
            }
        });
    }
});
