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

// Write to file
const writeFile = (path, content) => {
    rl.question(
        clc
            .xterm(250)
            .bold(
                "\n👶  Do you want to change the file name? Hit 'Enter' key to skip the step, or type a new name: "
            ),
        answerName => {
            if (answerName === "") {
                fs.writeFile(
                    `${path}filteredJSON.json`,
                    JSON.stringify(content),
                    function(err) {
                        if (err) return console.log(err);
                        console.log(clc.xterm(78).bold(sucsessMsg));
                    }
                );
                rl.close();
            } else {
                fs.writeFile(
                    `${path}${answerName}.json`,
                    JSON.stringify(content),
                    function(err) {
                        if (err) return console.log(err);
                        console.log(clc.xterm(78).bold(sucsessMsg));
                    }
                );
                rl.close();
            }
        }
    );
};

const pathThenNameThenSave = filteredArray => {
    rl.question(
        clc
            .xterm(250)
            .bold(
                `\n💾  Your file will be saved into ${clc.xterm(222)(
                    process.cwd()
                )}. Do you want to change the path? y or n ('Enter' key to skip): `
            ),
        answerOutput => {
            // Write to file
            if (answerOutput === "n" || answerOutput === "") {
                writeFile("", filteredArray);
            } else {
                rl.question(
                    clc
                        .xterm(244)
                        .bold(`\nEnter a new path to save your awesome JSON: `),
                    answerPathToFile => {
                        writeFile(`${answerPathToFile}/`, filteredArray);
                    }
                );
            }
        }
    );
};

const filterImageSizes = (array, size) => {
    let sizesArray = size.replace(/\s/g, "").split(",");
    let filteredImages = [];

    array.forEach((item, i) => {
        filteredImages.push([]);

        item.images.forEach((item, j) => {
            sizesArray.map(sizeItem => {
                if (item.size === sizeItem) {
                    return filteredImages[i].push(item);
                }
            });
        });

        item.images = [];
        item.images.push(filteredImages[i]);
        item.images = item.images.reduce((a, b) => a.concat(b), []);
    });
};

rl.question(
    clc.xterm(244).bold("📁  Pleas enter a path to the file: "),
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
                    .bold("\n⚙️  Add keys separating words with commas: "),
                answerParam => {
                    const filtered = data.map((item, i) => {
                        return answerParam
                            .replace(/\s/g, "")
                            .split(",")
                            .reduce(
                                (obj, key) => ({
                                    ...obj,
                                    [key]: data[i][key]
                                }),
                                {}
                            );
                    });

                    if (answerParam.includes("images")) {
                        let imageSizes = data[0].images.filter(item => {
                            if (item.order === 1) {
                                return item;
                            }
                        });
                        console.log(
                            clc.xterm(172)(
                                "\nChoose image sizes to keep in the JSON file ↴\n"
                            )
                        );
                        console.log(
                            imageSizes
                                .map(item => {
                                    return item.size;
                                })
                                .toString()
                                .replace(/,[s]*/g, ", ")
                        );
                        rl.question(
                            clc
                                .xterm(244)
                                .bold(
                                    "\n🖼  Add image sizes separating numbers with commas: "
                                ),
                            answerSizes => {
                                filterImageSizes(filtered, answerSizes);

                                pathThenNameThenSave(filtered);
                            }
                        );
                    } else {
                        pathThenNameThenSave(filtered);
                    }
                }
            );
        });
    }
);
