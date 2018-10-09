const readline = require("readline");
var fs = require("fs");
var clc = require("cli-color");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const helloMsg =
    "\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ JSON FIlter and Save ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\n";
const sucsessMsg =
    "\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍ Your JSON file is ready bro! 🎉 ㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\nㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ\n";

console.log(clc.xterm(132).bold(helloMsg));

// Write to file
writeFile = (path, content) => {
    rl.question(
        clc.xterm(250)(
            "\nDo you want to change the file name?\nHit 'Enter' key to skip the step, or type a new name: "
        ),
        answerName => {
            if (answerName === "") {
                fs.writeFile(
                    `${path}filteredJSON.json`,
                    JSON.stringify(content),
                    function(err) {
                        if (err) return console.log(err);
                        console.log(clc.bold(sucsessMsg));
                    }
                );
                rl.close();
            } else {
                fs.writeFile(
                    `${path}${answerName}.json`,
                    JSON.stringify(content),
                    function(err) {
                        if (err) return console.log(err);
                        console.log(clc.bold(sucsessMsg));
                    }
                );
                rl.close();
            }
        }
    );
};

rl.question(
    clc.xterm(244).bold("Pleas enter a path to the file: "),
    answerPath => {
        fs.readFile(answerPath, "utf8", function(err, data) {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            data = JSON.parse(data);
            console.log(
                clc.xterm(172)("\nChoose keys to keep in the JSON file ↴\n")
            );

            // Try to get the first JSON lavel
            try {
                console.log(Object.keys(data[0]));
            } catch (error) {
                console.log(Object.keys(data));
            }

            // Second question
            rl.question(
                clc
                    .xterm(244)
                    .bold("\nAdd keys separating words with commas: "),
                answerParam => {
                    // Create filtered JSON
                    const filtered = data.map((item, i) => {
                        return answerParam
                            .replace(/\s/g, "")
                            .split(",")
                            .reduce(
                                (obj, key) => ({ ...obj, [key]: data[i][key] }),
                                {}
                            );
                    });

                    rl.question(
                        clc.xterm(250)(
                            `\nYour file will be saved into ${clc.xterm(222)(
                                process.cwd()
                            )}. Do you want to change the path? y or n: `
                        ),
                        answerOutput => {
                            // Write to file
                            if (answerOutput == "n") {
                                writeFile("", filtered);
                            } else {
                                rl.question(
                                    clc
                                        .xterm(244)
                                        .bold(
                                            `\nEnter a new path to save your awesome JSON: `
                                        ),
                                    answerPathToFile => {
                                        writeFile(
                                            `${answerPathToFile}/`,
                                            filtered
                                        );
                                    }
                                );
                            }
                        }
                    );
                }
            );
        });
    }
);
