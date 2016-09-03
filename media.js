const colors = require("colors")
const package = require("./package")

const appName = package.name.toUpperCase()
const appVersion = package.version
const mediaOptions = [ "Movies" ]

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
		callback(data.trim())
	})
}

var showMenu = function(menuTitle, menuOptions, message) {
	console.clear()
	console.log( menuTitle )

	menuOptions.push("Quit")

	for( var i = 0; i < menuOptions.length; i++ ) {
		var optionNumber = i + 1
		var optionLabel = menuOptions[i]
		console.log( "%s. %s", optionNumber, optionLabel )
	}

	console.log()

	if(message)
		console.log(message)

	console.prompt(
		"#> ",
		function(input) {
			var selectedOption = menuOptions.filter(function(menuOption, index) {
				if( isNaN(input) ){
					return menuOption.toLowerCase() == input.toLowerCase()
				}
				else
					return input == index + 1
			});

			if( !selectedOption.length ) {
				var message = colors.red(colors.bold("Error:"), "You entered an invalid option (" + input.toLowerCase() + ")")
				return showMenu(menuTitle, menuOptions.filter(function(menuOption) {
					return menuOption.toLowerCase() != "quit"
				}), message)
			}

			console.log( "You selected %s", selectedOption[0] )
			process.exit()
		}
	)
}

var mainMenuTitle = colors.bold.blue.underline(appName) + "\n"
var mainMenuOptions = mediaOptions
showMenu( mainMenuTitle, mainMenuOptions )