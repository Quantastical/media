const config = require("./config")
const package = require("./package")

const colors = require("colors")
const fs = require("fs")
const glob = require("glob")
const path = require("path")

const appName = package.name.toUpperCase()
const appVersion = package.version

var state = {}

const screens = {
	home: "Home",
	movies: "Movies",
	tv: "TV",
	quit: "Quit"
}

const filters = {
	titles: "Titles",
	genres: "Genres",
	years: "Years",
	tags: "Tags",
	people: "People"
}

console.clear = function () {
	return process.stdout.write("\033c")
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

const center = function(text) {
	var leftMargin = Math.floor((process.stdout.columns - text.length) / 2)
	return " ".repeat(leftMargin) + text
}

const load = function() {
	console.clear()

	console.log("\n\n" + center("Loading..."))

	// var movieJSONs = glob.sync("/Volumes/Shared/Movies/**/*.json")
	var movieJSONs = glob.sync("/Users/Quantastical/Desktop/Movies/**/*.json")
}

const render = function(screen) {
	console.clear()

	const mainMenu = [screens.home, screens.movies, screens.tv, screens.quit]
	console.log("\n" + center(mainMenu.join("   ")) + "\n")

	switch(screen.toUpperCase()) {
		case "MOVIES":
			//var filtersMenu = [filters.titles, filters.genres, filters.years, filters.tags, filters.people]
			//console.log(center(filtersMenu.join("   ")) + "\n")

			state.movies = []
			//var movieJSONs = glob.sync("/Users/Quantastical/Desktop/Movies/**/*.json")
			var movieJSONs = glob.sync("/Volumes/Shared/Movies/**/*.json")
			movieJSONs.forEach(function(movieJSON){
				var movie = require(movieJSON)
				state.movies.push(movie)
			})

			state.movies.forEach(function(movie, index){
				var listNumber = index + 1
				console.log( "%s. %s", listNumber, movie.title )
			})
		break;
	}

	console.log()

	console.prompt(
		"#> ",
		function(input) {

			input.toUpperCase
			switch(input.toUpperCase()) {
				case "HOME": return render(screens.home)
				case "QUIT": return quit()
				case "MOVIES": return render(screens.movies)
				default:  return render(screen)
			}
		}
	)
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

const showHomeScreen = function() {
	showScreen(homeScreen)
}

const showMoviesScreen = function() {
	const moviesFilters = []
	const moviesMenu = "Titles   Years   Genres"

	var leftMargin = Math.floor((process.stdout.columns - moviesMenu.length) / 2)

	const moviesHeader = " ".repeat(leftMargin) +
		colors.white.underline("T") + colors.gray("itles") + "   " +
		colors.white.underline("Y") + colors.gray("ears") + "   " +
		colors.white.underline("G") + colors.gray("enres")

	const moviesScreen = {
		menu: moviesHeader
	}

	showScreen(moviesScreen)
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

load()
render(screens.home)