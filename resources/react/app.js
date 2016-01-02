import routesMap from './route'

if(typeof __SERVER === 'undefined') {
    ReactDOM.render(routesMap, document.getElementById("main"));    
}
