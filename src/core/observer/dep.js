// @flow

export default class Dep{

    constructor(){
        this.subs = [];
    }
    depend(){
        if(Dep.target){
            this.target.addDep(this);
        }
    }


    notify(){
        let watcher;
        for(watcher of this.subs){
            watcher.update();
        }
    }
}