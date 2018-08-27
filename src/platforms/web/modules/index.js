let target: any;

function add(event, handler) {

    target.addEventListener(event, handler);
}


function updateListeners(oldVnode, newVnode) {
    
}

export default {
    create: updateListeners
};