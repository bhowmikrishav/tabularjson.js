const {Element, Storage} = require('./src/db/index')

const store = new Storage();

(async ()=>{
    try{
        await store.init()
        //const root = await Element.trace(store, {_id:0})
        //console.log(root);
        //console.log(await store.addNullElement(0))
        store.print()
    }catch(e){
        console.log(e);
    }
})()