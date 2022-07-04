import React from 'react';
import {FormattedMessage} from 'react-intl';

import geoScratchIconURL from './geo-scratch.png';
import geoScratchInsetIconURL from './geo-scratch-small.png';

const translationMap = {
    'ja': {
        'gui.extension.geo-scratch.description': '地図を操作する。'
    },
    'ja-Hira': {
        'gui.extension.geo-scratch.description': 'ちずをそうさする'
    }
};

const entry = {
    name: 'Geo Scratch',
    extensionId: 'geo-scratch',
    extensionURL: 'https://champierre.github.io/geolonia2scratch/geo-scratch.mjs',
    collaborator: 'Geolonia',
    iconURL: geoScratchIconURL,
    insetIconURL: geoScratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Geo Scratch Blocks."
            description="Description for Geo Scratch Blocks."
            id="gui.extension.geo-scratch.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/champierre/geolonia2scratch/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
