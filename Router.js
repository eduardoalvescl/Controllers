"use strict";

export default class Router {

	constructor(routePath,app) {
		if (app == null)
			throw new Error("Missing required App");

		this.app = app;
		this.routePath = routePath;
        this._routes = [];
		this.registerServices();
	}
  

    get services() {
		return {};
	}

	registerServices() {
        var router_services = this.services;
		Object.keys(router_services).forEach( full_path => {

            var service_function = router_services[full_path];
            var path_items = full_path.split(' ');
            var verb = (path_items.length > 1 ? path_items[0] : 'get').toLowerCase();
            var path = this.routePath + (path_items.length > 1 ? path_items[1] : full_path);
            
			try{
                if(this[service_function])
                    this.app[verb](path, this[service_function].bind(this));
                else
                    throw {message:`ERROR: Não foi possível encontrar o método ${service_function} que deveria ser configurado para a rota (${verb.toUpperCase()}) ${path} no controller ${this.constructor.name}`}
            } catch(e){
                console.log(e.message)
            }
		});
	}

}