# fracta assessment

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###
This project bacically a sample of single page application which gets and displays a geojson data. Project draws lines on a map for 
showing pipes in an area by using Vuejs. There is a file called package.json which defines the packages to download from npm repositories.

Prettier is added to the project for some additional rules and configurations.

Project has two main directories:
	-public: Where json data and index.html are located.
	-src: All implementations are placed with subdirectories.
	

We start with main.js and create vue object. This object uses "App" component as the main entrance to the app.
App component has controll buttons and a map component in its template section.
App component gets the sample data by using axios request. Axios is a promise-based http client for browsers. The "Map" component 
in "App" consists a div which holds MApbox GL JS canvas and shares the map to all Vue components it may contain. This map is able to listen for changes by using
"store".
Default configurations are used in map with "map options" which located under "/utils" directory.

Since we use "slot" in the map, we can easily create MapboxLines. After data is fethed with axios, lines are created with a for loop
in the app.vue file. For each element in the data, a new MapboxLine. The "props" for the component is defined in the mapline configuration file
under "/utils" directory.

If user clicks any buttons on the top, map sets the paint property to redraw the lines based on some conditions such as year, diameter, etc.
Lines have popup ability to show users the details on hover.

To make the map able to handle large size of geojson data, there are some restrictions and predefined configurations. These are tolerance, buffer 
and maxZoom/minZoom in the map creation.



There may be further implementations for loading and rendering large GeoJSON  sources such as; 
	- Clustering the data according to zoom level 
	- Cleaning up the data by removing unused properties and limitting the number of decimal places for coordinates
	- Slitting the data
	-Tiling on the server
	
	
Here is a sample vuejs project with mapbox API.
