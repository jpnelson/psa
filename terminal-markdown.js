const mdTerminal = require('marked');
const TerminalRenderer = require('marked-terminal');

mdTerminal.setOptions({
    renderer: new TerminalRenderer(),
});

module.exports = function (markdown) {
    console.log(mdTerminal(markdown));
}