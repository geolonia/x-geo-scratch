const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');
const geolonia = require('@geolonia/embed');
const blockIconURI = 'data:image/png;base64,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';

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

        let script = document.createElement('script');
        script.src = 'https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY';
        document.body.appendChild(script);

        const div = document.createElement("div");
        div.id = 'map';
        div.className = 'geolonia';
        div.dataset.style = 'geolonia/basic';
        div.dataset.key = 'YOUR-API-KEY';

        div.setAttribute("style", "width:480px;height:360px;opacity:0.5;position:absolute;top:0px;");
        let canvas = document.getElementsByTagName('canvas')[1];
        canvas.parentNode.appendChild(div);

        this.map = new global.geolonia.Map('#map');
    }

    getInfo () {
        this._locale = this.setLocale();

        return {
            id: Scratch3Geolonia2ScratchBlocks.EXTENSION_ID,
            name: Scratch3Geolonia2ScratchBlocks.EXTENSION_NAME,
            extensionURL: Scratch3Geolonia2ScratchBlocks.extensionURL,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'panBy',
                    blockType: BlockType.COMMAND,
                    text: 'x方向に [X] y方向に [Y] 移動する',
                    arguments: {
                      X: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 100
                      },
                      Y: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 0
                      }
                    }
                },
                {
                    opcode: 'panTo',
                    blockType: BlockType.COMMAND,
                    text: "経度 [LNG] 緯度 [LAT] に移動",
                    arguments: {
                      LNG: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 139.74
                      },
                      LAT: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 35.65
                      }
                    }
                },
                {
                    opcode: 'setZoom',
                    blockType: BlockType.COMMAND,
                    text: "ズームレベル [ZOOM] にする",
                    arguments: {
                      ZOOM: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                      }
                    }
                },
            ],
            menus: {
            }
        };
    }

    panBy(args) {
      this.map.panBy([args.X, -args.Y]);
    }

    panTo(args) {
      this.map.panTo([args.LNG, args.LAT]);
    }

    setZoom(args) {
      this.map.setZoom(args.ZOOM);
    }

    setLocale() {
      let locale = formatMessage.setup().locale;
      if (AvailableLocales.includes(locale)) {
        return locale;
      } else {
        return 'en';
      }
    }
}

exports.blockClass = Scratch3Geolonia2ScratchBlocks; // loadable-extension needs this line.
module.exports = Scratch3Geolonia2ScratchBlocks;
