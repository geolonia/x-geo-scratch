import React from 'react';
import {FormattedMessage} from 'react-intl';

import geoscratchIconURL from './geoscratch.png';
import geoscratchInsetIconURL from './geoscratch-small.png';

const translationMap = {
    'ja': {
        'gui.extension.geoscratch.description': '地図を操作する。'
    },
    'ja-Hira': {
        'gui.extension.geoscratch.description': 'ちずをそうさする'
    }
};

const entry = {
    name: 'Geo Scratch',
    extensionId: 'geoscratch',
    extensionURL: 'https://geolonia.github.io/x-geo-scratch/geoscratch.mjs',
    collaborator: 'Geolonia',
    iconURL: geoscratchIconURL,
    insetIconURL: geoscratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Geo Scratch Blocks."
            description="Description for Geo Scratch Blocks."
            id="gui.extension.geoscratch.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/geolonia/x-geo-scratch/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
