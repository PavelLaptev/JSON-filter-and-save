const readline = require("readline");
var fs = require("fs");
var clc = require("cli-color");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const helloMsg =
    "\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ JSON FIlter and Save ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\n";
const sucsessMsg =
    "\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ Your JSON file is ready! 🎉 ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\n";

console.log(clc.bold(helloMsg));

rl.question(
    clc.xterm(244).bold("📁  Pleas enter a path to the file: "),
    answerPath => {
        fs.readFile(answerPath, "utf8", function(err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            data = JSON.parse(data);

            const iconsPaths = data.icons.map(item => {
                return item.icon.paths.join().replace(/,/g, " ");
            });

            const iconsNames = data.icons.map(item => {
                return item.properties.name;
            });

            const iconsArray = {};

            data.icons.map((item, i) => {
                iconsArray[iconsNames[i]] = iconsPaths[i];
            });

            fs.writeFile(
                `iconsArray.json`,
                JSON.stringify(iconsArray),
                function(err) {
                    if (err) return console.log(err);
                    console.log(clc.xterm(78).bold(sucsessMsg));
                }
            );
            rl.close();
        });
    }
);
