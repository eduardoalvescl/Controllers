import {o, add, addGenerator} from 'dek'
import Router from './Router'
import {loadAllControllers, controllerGenerator} from './loadFunctions'

export let name = 'controllers'

export let dependencies = ['express']

export default async (arg) => {
    add('APIController', true)
    add('Router', Router)
    loadAllControllers(o.app, [process.cwd() + '/controllers/*'])
}

export let cli = {
    name: 'controller',
    action: async (args) => { 
        console.log('Teste')
    }
}

export let generator = {
    name: 'controller',
    action: controllerGenerator
}

