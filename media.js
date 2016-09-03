const appName = "Media"
const appVersion = "0.0.8"

console.clear = function () {
	return process.stdout.write('\033c');
}

console.clear()
console.log( appName, `v${appVersion}` )