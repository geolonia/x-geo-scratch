import React from 'react';
import {FormattedMessage} from 'react-intl';

import geolonia2scratchIconURL from './geolonia2scratch.png';
import geolonia2scratchInsetIconURL from './geolonia2scratch-small.png';

const translationMap = {
    'ja': {
        'gui.extension.geolonia2scratch.description': '地図を操作する。'
    },
    'ja-Hira': {
        'gui.extension.geolonia2scratch.description': 'ちずをそうさする'
    }
};

const entry = {
    name: 'Geolonia2Scratch',
    extensionId: 'geolonia2scratch',
    extensionURL: 'https://champierre.github.io/geolonia2scratch/geolonia2scratch.mjs',
    collaborator: 'champierre',
    iconURL: geolonia2scratchIconURL,
    insetIconURL: geolonia2scratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Geolonia2Scratch Blocks."
            description="Description for Geolonia2Scratch Blocks."
            id="gui.extension.geolonia2scratch.description"
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
