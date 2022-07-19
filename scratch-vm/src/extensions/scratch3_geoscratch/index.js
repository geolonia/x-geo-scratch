const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const {openReverseGeocoder} = require('@geolonia/open-reverse-geocoder');

let extensionURL = 'https://geolonia.github.io/x-geo-scratch/geoscratch.mjs';

const blockIconURI = 'data:image/png;base64,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';

const Message = {
}
const AvailableLocales = ['en', 'ja', 'ja-Hira'];

class Scratch3GeoscratchBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Geo Scratch';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'geoscratch';
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    constructor (runtime) {
        this.runtime = runtime;

        this.addr = {
            code: '',
            prefecture: '',
            city: ''
        };
        this.center = {lng: 0, lat: 0};
        this.features = [];
        this.loaded = false;

        let script = document.createElement('script');
        script.src = 'https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY';
        document.head.appendChild(script);
    }

    getInfo () {
        this._locale = this.setLocale();

        return {
            id: Scratch3GeoscratchBlocks.EXTENSION_ID,
            name: Scratch3GeoscratchBlocks.EXTENSION_NAME,
            extensionURL: Scratch3GeoscratchBlocks.extensionURL,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'displayMap',
                    blockType: BlockType.COMMAND,
                    text: '地図を経度 [LNG] 緯度 [LAT] ズーム [ZOOM] で表示',
                    arguments: {
                        LNG: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        LAT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        ZOOM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'flyTo',
                    blockType: BlockType.COMMAND,
                    text: '経度 [LNG] 緯度 [LAT] ズーム [ZOOM] にジャンプ',
                    arguments: {
                        LNG: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 139.74
                        },
                        LAT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 35.65
                        },
                        ZOOM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'bearingTo',
                    blockType: BlockType.COMMAND,
                    text: '地図を [DEGREE] 度回転する',
                    arguments: {
                        DEGREE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 25
                        }
                    }
                },
                {
                    opcode: 'moveVertical',
                    blockType: BlockType.COMMAND,
                    text: '地図を縦に [DISTANCE] ピクセル移動する',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'moveHorizontal',
                    blockType: BlockType.COMMAND,
                    text: '地図を横に [DISTANCE] ピクセル移動する',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    }
                },
                {
                    opcode: 'getPref',
                    blockType: BlockType.REPORTER,
                    text: '都道府県名'
                },
                {
                    opcode: 'getCity',
                    blockType: BlockType.REPORTER,
                    text: '市区町村名'
                },
                {
                    opcode: 'getLat',
                    blockType: BlockType.REPORTER,
                    text: '緯度'
                },
                {
                    opcode: 'getLng',
                    blockType: BlockType.REPORTER,
                    text: '経度'
                },
                {
                    opcode: 'getName',
                    blockType: BlockType.REPORTER,
                    text: '場所の名前'
                }
            ],
            menus: {
            }
        };
    }

    displayMap(args) {
        return new Promise((resolve) => {
            let mapContainer = document.getElementById('geolonia');
            if (mapContainer) {
                mapContainer.parentNode.removeChild(mapContainer);
            } else {
                mapContainer = document.createElement("div");
                mapContainer.id = 'geolonia';
                mapContainer.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0px; background-color: rgb(255, 255, 255);");
            }

            let canvas = document.getElementsByTagName('canvas')[0];
            canvas.setAttribute("style", "opacity: 0.5; height: 360px; width: 480px; position: absolute; top: 0px; left: 0px;");
            canvas.parentNode.parentNode.prepend(mapContainer);

            if (document.getElementById('geolonia-map')) {
                mapContainer.removeChild(document.getElementById('geolonia-map'))
            }

            const div = document.createElement("div");
            div.id = 'geolonia-map';
            div.setAttribute("style", "width:100%;height:100%;");
            div.dataset.navigationControl = 'off';

            mapContainer.appendChild(div);

            this.map = {};
            this.map = new window.geolonia.Map({
                container: '#geolonia-map',
                style: 'https://raw.githubusercontent.com/geolonia/scratch-style/main/style.json',
                center: [args.LNG, args.LAT],
                zoom: args.ZOOM,
                pitch: 0
            });

            this.map.once('load', () => {
                this.map.on('moveend', (e) => {
                    this.center = this.map.getCenter()

                    openReverseGeocoder(Object.values(this.center)).then(res => {
                        this.addr = res;
                    });

                    this.features = this.map.queryRenderedFeatures(this.map.project(this.center), {
                        layers: ['poi']
                    });
                });

                const resizeObserver = new ResizeObserver(entries => {
                    this.map.resize();
                });

                resizeObserver.observe(mapContainer);

                this.loaded = true;

                resolve();
            });
        });
    }

    flyTo (args) {
        if (!this.loaded) {
            console.error('まず地図を表示してください。');
            return;
        }

        const promise = new Promise((resolve) => {
            this.map.flyTo({center: [args.LNG, args.LAT], zoom: args.ZOOM});

            this.map.once('moveend', () => {
                resolve();
            });
        });

        return promise;
    }

    zoomTo (args) {
        if (!this.loaded) {
            console.error('まず地図を表示してください。');
            return;
        }

        return new Promise((resolve) => {
            this.map.easeTo({
                zoom: this.map.getZoom() + parseFloat(args.ZOOM),
                easing: this.easing
            });

            this.map.once('moveend', () => {
                resolve();
            });
        });
    }

    bearingTo (args) {
        if (!this.loaded) {
            console.error('まず地図を表示してください。');
            return;
        }

        return new Promise((resolve) => {
            this.map.easeTo({
                bearing: this.map.getBearing() - args.DEGREE,
                easing: this.easing
            });

            this.map.once('moveend', () => {
                resolve();
            });
        });
    }

    moveVertical (args) {
        if (!this.loaded) {
            console.error('まず地図を表示してください。');
            return;
        }

        const promise = new Promise((resolve) => {
            this.map.panBy([0, args.DISTANCE], {
                easing: this.easing
            });

            this.map.once('moveend', () => {
                resolve();
            });
        });

        return promise;
    }

    moveHorizontal (args) {
        if (!this.loaded) {
            console.error('まず地図を表示してください。');
            return;
        }

        const promise = new Promise((resolve) => {
            this.map.panBy([args.DISTANCE, 0], {
                easing: this.easing
            });

            this.map.once('moveend', () => {
                resolve();
            });
        });

        return promise;
    }

    getLat () {
        return `${this.center.lat.toFixed(4)}`;
    }

    getLng () {
        return `${this.center.lng.toFixed(4)}`;
    }

    getPref () {
        return this.addr.prefecture;
    }

    getCity () {
        return this.addr.city;
    }

    getName () {
        for (let i = 0; i < this.features.length; i++) {
            if (this.features[i].layer.type === 'symbol' && this.features[i].properties.name) {
                return this.features[i].properties.name;
            }
        }

        return '';
    }

    easing (t) {
        return t * (2 - t);
    }

    setLocale () {
        let locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        }
        return 'en';
    }
}

exports.blockClass = Scratch3GeoscratchBlocks; // loadable-extension needs this line.
module.exports = Scratch3GeoscratchBlocks;
