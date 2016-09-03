const colors = require("colors")

const appName = "Media"
const appVersion = "0.0.9"

console.clear = function () {
	return process.stdout.write("\033c");
}

console.clear()
console.log( colors.bold.blue.underline(appName, `v${appVersion}`) )