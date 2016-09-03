const colors = require("colors")
const package = require("./package")

const appName = package.name.toUpperCase()
const appVersion = package.version
const mediaOptions = [ "Quit" ]

console.clear = function () {
	return process.stdout.write("\033c")
}

var originalConsoleError = console.error;
console.error = function(message) {
	originalConsoleError( colors.red( colors.bold("Error:"), message) )
}

console.prompt = function ( message, callback ) {
	process.stdout.write(message)

	process.stdin.resume()
	process.stdin.setEncoding("utf8")
	process.stdin.on("data", function(data) {
		process.stdin.pause()
		callback(data)
	})
}

var showMenu = function(menuTitle, menuOptions, message) {
	console.clear()
	console.log( menuTitle )

	for( var i = 0; i < menuOptions.length; i++ ) {
		var optionNumber = i + 1
		var optionLabel = menuOptions[i]
		console.log( "%s. %s", optionNumber, optionLabel )
	}

	console.log()

	if(message)
		console.log(message)

	console.prompt(
		"Pick a menu option: ",
		function(input) {
			if( isNaN(input) ) {
				var message = colors.red(colors.bold("Error:"), "You must enter a number.")
				return showMenu(menuTitle, menuOptions, message)
			}

			var selectedOptionNumber = Number(input)
			if( selectedOptionNumber < 1 || selectedOptionNumber > menuOptions.length ) {
				var message = colors.red(colors.bold("Error:"), "You entered an invalid option.")
				return showMenu(menuTitle, menuOptions, message)
			}

			var selectedMenu = menuOptions[selectedOptionNumber - 1]
			console.log( "You selected %s", selectedMenu )
			process.exit()
		}
	)
}

var mainMenuTitle = colors.bold.blue.underline(appName, `v${appVersion}`, "\n")
var mainMenuOptions = mediaOptions
showMenu( mainMenuTitle, mainMenuOptions )