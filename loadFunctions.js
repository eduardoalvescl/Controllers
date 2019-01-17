import {o, success, danger} from 'dek'
import glob from 'glob'
import ControllerTemplate from './controller.template'
import fs from 'fs'

export let loadAllControllers = async (app,folders,cb) =>{
    
    let listFiles = async (dir) => {
        return new Promise((acc, rej) => {
            glob(dir, async (er, file) => {
                acc(file)
            })
        })
    }

    let getFiles =  () => {
        return new Promise(async (acc, rej) =>{
            let filesList = []
            for(let i in folders){
                let dir = folders[i]
                let files = await listFiles(dir)
                
                files.forEach(el => {
                   filesList.push(el) 
                });
                
                if(folders.length - 1 == i){
                    acc(filesList)
                }
            }
        })
    }

    let files = await getFiles()
    
    for(let i in files){

        let file         = files[i]
        const routerFile = require(file)
        
        if(typeof routerFile == 'object' && routerFile.hasOwnProperty('default')){
            new routerFile.default("",app)
        }

        if(files.length - 1 == i)
            if(cb) cb()
        
    }
   
}

export let controllerGenerator = (arg) => {

    if(!arg["_"].hasOwnProperty('2')){
        danger('Vocé deve utilizar o parâmetro --name para definir o nome do seu controller')
        process.exit(1)
    }
    
    let controllerName = arg["_"][2]
    let routerName     = controllerName.toLowerCase()
    let className      = `${capitalize(controllerName)}Controller`
    let file           = ControllerTemplate(className, routerName)

    try{
        fs.writeFileSync(`${process.cwd()}/controllers/${className}.js`, file)
        success(`Arquivo ${process.cwd()}/controllers/${className}.js criado com sucesso!`)
    }catch(e){
        error(e.message)
    }
    
    if(o.hasOwnProperty('mongodb')){
        o.mongodb.close()
    }
}

let capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}