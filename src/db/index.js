const sqlite3 = require('sqlite3').verbose();

class Storage{
    constructor(path = ':memory:') {
        this.db = new sqlite3.Database(path)
    }
    init() {
        const this_class = this
        return new Promise((resolve, reject)=>{
            const initdb = Storage.initdb_commands
            try{
                this_class.db.serialize(()=>{
                    initdb.forEach((command)=>{
                        this_class.db.run(command)
                    })
                    this_class.addNullElement(0)
                    .then( _id => resolve(_id))
                    .catch(err => reject(err))
                })
            }catch(e){
                reject(e)
            }
        })
    }
    find(find_with/* {_id} | {p_id, key} */){
        const this_class = this
        return new Promise((resolve, reject)=>{
            try{
                if(typeof find_with._id === 'number'){
                    console.log(find_with._id);
                    this_class.db.serialize(()=>{
                        this_class.db.all(
                            Storage.select_commands.tree_with_id,
                            [find_with._id],
                            (err, rows)=>{
                                console.log(err, rows);
                                if(err){reject(err); return}
                                resolve(rows.length?rows[0]:null)
                            }
                        )
                    })
                }else if((typeof find_with.p_id === 'number')&& (typeof find_with.key === 'string')){
                    this_class.db.serialize(()=>{
                        this_class.db.all(
                            Storage.select_commands.tree_with_p_id_key,
                            [find_with.p_id, find_with.key],
                            (err, rows)=>{
                                console.log(err, rows);
                                if(err){reject(err); return}
                                resolve(rows.length?rows[0]:null)
                            }
                        )
                    })
                }
            }catch(e){
                reject(e)
            }
        })
    }
    addNullElement(p_id){
        const this_class = this
        return new Promise((resolve, reject)=>{
            try{
                if(typeof p_id !== "number") throw Error('p_id should be an integer')
                p_id = Math.floor(p_id)
                console.log(Storage.insert_commands.insert_null[0]
                    .replace('?', `${p_id}`));
                
                this_class.db.run(
                    Storage.insert_commands.insert_null[0]
                    .replace('?', `${p_id}`),
                    function (err){
                        if(err) reject(err)
                        else resolve(this.lastID)
                    }
                )
            } catch(e){
                reject(e)
            }
        })
    }
    print(){
        this.db.all(
            Storage.select_commands.tree,
            [],
            (err, results)=>{
                console.log(err, results);
            }
        )
    }
}
Storage.initdb_commands = require('./initdb')
Storage.select_commands = require('./selectdb')
Storage.insert_commands = require('./insertdb')

class Element{
    constructor(storage, { _id, p_id, key}){
        this.node    = { _id, p_id, key}
        this.storage = storage
    }
    init(){
        const this_class = this
        return new Promise((resolve, reject)=>{
            try{
                console.log("Inside", this_class.storage);
                this_class.storage.find(this_class.node)
                .then(result => {
                    if(result === null) {reject(Error("invalid identifiers")); return}
                    this_class.node = result
                    console.log(result);
                    resolve(this_class)
                })
                .catch(err => reject(err))
            }catch(e){
                reject(e)
            }
        })
    }
    create_element(object){

    }
}
Element.trace = async (storage, { _id, p_id, key})=>{
    if(!(storage instanceof Storage)){
        throw Error("storage should be instance of Storage class")
    }
    const element = new Element(storage, { _id, p_id, key})
    console.log(element);
    await element.init()

    return element
}

module.exports = {Element, Storage}