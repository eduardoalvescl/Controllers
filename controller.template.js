export default (controllerName, routerName) => {
    let file = `
import {o} from 'dek'
import Router from '../plugins/Controllers/Router'

export default class ${controllerName} extends Router {

    get services() {
        return  {
            'GET /${routerName}': 'index', 
        };
    }

    async index(req, res){
        res.send('Rota de ${controllerName}')
    }

}`

return file
}