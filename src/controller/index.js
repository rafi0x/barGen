const bwipjs = require("bwip-js");
const fs = require('fs');

const controller = {};

const barGen = (text, height, dir, fileName, res) => {
    let hegt = height ? height : 10;
    bwipjs.toBuffer(
        { 
            bcid: 'code128',
            text,
            height: hegt,
            includetext: true,
            textxalign: 'center',
        },
        function (err, buffer) {
            if (err) res.json({ error: err });
            fs.writeFileSync(`${dir}/${fileName}.png`, buffer);
        }
    );
}

controller.getIndex = (req, res) => res.render('index');

controller.postIndex = (req, res) => {
    const { char, num, amount, dir, height } = req.body;
    const amnt = parseInt(amount);
    if (!num || !amount || isNaN(amnt)) res.json({ error: 'invalid inputs' });
    if (!dir) res.json({ error: 'select folder first' });
    for (let i = 1; i <= parseInt(amount); i++) {
        const serial = parseInt(num) + i;
        barGen(`${char.toUpperCase()}${serial}`, parseInt(height), dir, i, res);
    }
    return res.json({ msg: 'success' });
};

module.exports = controller;
