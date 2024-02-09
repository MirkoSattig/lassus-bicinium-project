import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathToKernScores = `${__dirname}/../lassus-bicinia/kern/`;
const biciniumYamlPath = `${__dirname}/../content/bicinia/`;

const metadata = {
    "01-beatus-vir": {
        youtubeId: "yn9Mjzy4LYg",
    },
    "02-beatus-homo": {
        youtubeId: "wj_amDCDJZA",
    },
    "03-oculus-non-vidit": {
        youtubeId: "WKGZrdvp_CM",
    },
    "04-justus-cor-suum-tradet": {
        youtubeId: "wkJxdxX9rUc",
    },
    "05-exspectatio-justorum": {
        youtubeId: "Kn5_VzzVJ_c",
    },
    "06-qui-sequitur-me": {
        youtubeId: "MQ7Qx5kbH_E",
    },
    "07-justi-tulerunt-spolia": {
        youtubeId: "JNxP7XS98x0",
    },
    "08-sancti-mei": {
        youtubeId: "9zMsQANKhcw",
    },
    "09-qui-vult-venire-post-me": {
        youtubeId: "QK5at2mV5rI",
    },
    "10-serve-bone": {
        youtubeId: "5Cb3d69pbuM",
    },
    "11-fulgebunt-justi": {
        youtubeId: "rB_Hbrb7wO4",
    },
    "12-sicut-rosa": {
        youtubeId: "ADsX997bsLg",
    },
};

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

    const config = {
        id,
        nr: parseInt(referenceRecords.ONM, 10),
        title: referenceRecords['OTL@@LA'],
        localRawFile: `/kern/lassus-bicinia/${id}.krn`,
        youtubeId: metadata[id]?.youtubeId ?? null,
    };

    const configFilename = `${id}.yaml`;
    fs.writeFileSync(`${biciniumYamlPath}${configFilename}`, yaml.dump(config, {
        indent: 4,
        lineWidth: -1,
        sortKeys: true,
    }));
 
});
