const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const {openReverseGeocoder} = require('@geolonia/open-reverse-geocoder');

let extensionURL = 'https://champierre.github.io/geolonia2scratch/geolonia2scratch.mjs';

const Message = {
}
const AvailableLocales = ['en', 'ja', 'ja-Hira'];

class Scratch3Geolonia2ScratchBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Geolonia2Scratch';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'geolonia2scratch';
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

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }

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
            id: Scratch3Geolonia2ScratchBlocks.EXTENSION_ID,
            name: Scratch3Geolonia2ScratchBlocks.EXTENSION_NAME,
            extensionURL: Scratch3Geolonia2ScratchBlocks.extensionURL,
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
                    text: "経度 [LNG] 緯度 [LAT] ズーム [ZOOM] にジャンプ",
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
                    opcode: 'getPref',
                    blockType: BlockType.REPORTER,
                    text: "都道府県名"
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

    getPref () {
        return this.addr.prefecture;
    }

    setLocale () {
        let locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        }
        return 'en';
    }
}

exports.blockClass = Scratch3Geolonia2ScratchBlocks; // loadable-extension needs this line.
module.exports = Scratch3Geolonia2ScratchBlocks;
