const config = require("./config")
const package = require("./package")

const colors = require("colors")
const fs = require("fs")
const glob = require("glob")
const path = require("path")

const appName = package.name.toUpperCase()
const appVersion = package.version

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

const showMenu = function(menuTitle, menuOptions, message) {
	console.clear()
	console.log( menuTitle )

	menuOptions.unshift( {
		"label": "Home",
		"action": showMainMenu
	} )
	menuOptions.push({
		"label": "Quit",
		"action": quit
	} )

	for( var i = 0; i < menuOptions.length; i++ ) {
		var optionNumber = i + 1
		var optionLabel = menuOptions[i].label
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
					return menuOption.label.toLowerCase() == input.toLowerCase()
				}
				else
					return input == index + 1
			});

			if( !selectedOption.length ) {
				var message = colors.red(colors.bold("Error:"), "You entered an invalid option (" + input.toLowerCase() + ")")
				return showMenu(menuTitle, menuOptions.filter(function(menuOption) {
					return menuOption.label.toLowerCase() != "home" && menuOption.label.toLowerCase() != "quit"
				}), message)
			}

			selectedOption[0].action()
		}
	)
}

const showMainMenu = function() {
	const mainMenuTitle = colors.bold.blue.underline(appName) + "\n"
	const mainMenuOptions = [
		{
			"label": "Movies",
			"action": showMoviesMenu
		},
		{
			"label": "TV",
			"action": showTVMenu
		}
	]
	showMenu( mainMenuTitle, mainMenuOptions )
}

const showMoviesMenu = function() {
	const moviesMenuTitle = colors.bold.blue.underline(appName + ": Movies") + "\n"
	const moviesMenuOptions = []
	const moviesSources = config.sources.filter(function(source){
		return source.type.toLowerCase() == "movies"
	})

	var test;
	moviesSources.forEach(function(moviesSource){
		var moviesInfos = glob.sync(moviesSource.path + "/**/*.json")

		moviesInfos.forEach(function(movieInfo){
			var movie = require(movieInfo)
			
			var movieMenuOption = {
				"label": movie.title,
				"action": function() {
					showMovie(movie)
				}
			}
			
			moviesMenuOptions.push(movieMenuOption)
		})
	})

	showMenu(moviesMenuTitle, moviesMenuOptions)
}

const showMovie = function(movie) {
	const movieMenuTitle = colors.bold.blue.underline(appName + ": " + movie.title + "\n")
	const movieMenuOptions = [
		{
			"label": "Watch Movie",
			"action": quit
		}
	]

	showMenu(movieMenuTitle, movieMenuOptions)
}

const showTVMenu = function() {
	const tvMenuTitle = colors.bold.blue.underline(appName + ": TV") + "\n"
	const tvMenuOptions = [
		{
			"label": "Seinfeld",
			"action": quit
		}
	]
	showMenu(tvMenuTitle, tvMenuOptions)
}

const quit = function() {
	console.clear()
	process.exit()
}

showMainMenu()