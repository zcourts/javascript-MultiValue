/**
 *An implementation of a HashSet which supports multiple values per key, 
 *sorting and iteration over elements without knowing any of the keys!
 *(Not technically a "hashed" set just yet... 
 */
window.HashSet=function(){
    this.length=0;
    //set of array keys
    this.keys=[];
    //set of objects keyed by keys.values
    this.values={};
    this.lastKeyIndex=null;
    //keys already sorted?
    this.sorted=false;

    /**
     * Adds a row to the set
     * @param key The key for this element
     * @param value the value to go with this key
     * @param sort (Optional) If true then the array keys are sorted after adding
     * note that it will be more efficient to not sort on every insert and instead all
     * the sort() method when you're done adding items
     */
    this.add=function (key,value,sort){
        //its a set so no duplicate keys allowed
        if(this.indexOf(key)==-1){
            this.keys.push(key);
        }
        if(this.values[key]==undefined) {
            this.values[key] = {
                count: 1,
                objects: new Array()
            };
        } else {
            this.values[key].count = this.values[key].count +1;
        }
        this.values[key].objects.push(value);
        if(sort!=undefined&&sort==true){
            this.keys.sort();
        }
        this.length++;
        //mark as unsorted now
        this.sorted=false;
    }
    /**
     *Adds a K/V to the set, using put only one value is ever stored per key
     *To have multiple values under the same key use add()
     */
    this.put=function(key, value){
        //its a set so no duplicate keys allowed
        if(this.indexOf(key)==-1){
            this.keys.push(key);
        }
        this.values[key]=value;
        this.sorted=false;
    }

    /**
     *Removes the element keys by @param key
     *@params keys The key of the object (s) to remove
     *@return undefined if the key does not exist or true if deleted
     */
    this.remove=function(key){
        var index=this.indexOf(key);
        if(index==-1){
            return undefined;
        }
        this.sort();
        //remove from values first so we don't remove key reference
        this.values[key]=null;
        delete this.values[key];
        //now remove from keys
        //this.keys[index]=null;
        //delete this.keys[index];
        this.keys=this.keys.slice(index+1);
        this.length-=1;
        return true;
    }
    /**
     *Removes the first element in the set
     *WARNING: Every invocation results in a sort of the keys!!!
     *@return true if there are elements to remove false otherwise
     */
    this.removeFirst=function(){
        if(this.keys.length>0){
            this.sort();
            this.remove(this.keys[0]); 
            return true;
        }else{
            return false;
        }
    }
    /**
     *Removes the last element in the set
     *WARNING: Every invocation results in a sort of the keys!!!
     *@return true if there are elements to remove false otherwise
     */
    this.removeLast=function(){
        if(this.keys.length>0){
            this.sort();
            this.remove(this.keys[this.keys.length-1]); 
            return true;
        }else{
            return false;
        }
    }
    /**
     * Gets the object stored under this key...This is the object used internally
     * to store your values and data about them. To just get an array of values
     * use getValues instead
     * @return undefined if the key cannot be found or the object pointed to by 
     * this key which has an array of objects under the same key and a count of how many objects are there
     */
    this.getObject=function(key){
        if(this.keys[this.indexOf(key)]==-1){
            return undefined;
        }else{
            return this.values[key];
        }
    }
    /**
     * Gets the list of items store under this key
     * @return An array of items under this key or undefined if the key doesn't exist
     */
    this.getValues=function(key){
        if(this.keys[this.indexOf(key)]==-1){
            return undefined;
        }else{
            return this.values[key].objects;
        }
    }
    /**
     * Sorts the keys of this map
     */
    this.sort=function(reversed){
        //only re sort if not already sorted
        if(this.sorted==false){
            this.keys.sort(this.assending);
            if(reversed!=undefined&& reversed==true){
                this.keys.reverse();
            }
            this.sorted=true;
        }
        
    }
    /**
     * @return The next object or undefined;
     */
    this.next=function(){
        if(this.lastKeyIndex==null){
            this.lastKeyIndex=0;
            return this.values[this.keys[0]].objects;
        }else{
            if(this.hasNext()){
                this.lastKeyIndex+=1;
                return this.values[this.keys[this.lastKeyIndex]].objects;
            }else{
                return undefined;
            }
        }
    }
    /**
     * @return True if there is another object to be retrieved using next(),
     * false otherwise.
     */
    this.hasNext=function(){
        if(this.values[this.keys[this.lastKeyIndex+1]]!=undefined){
            return true;
        }else{
            //no more so reset
            this.lastKeyIndex=0;
            return false;
        }
    }
    /**
     * @return How many keys are in the set
     */
    this.size=function(){
        return this.keys.length;
    }
    /**
     *Check if a key exists
     */
    this.exist=function(key){
        if(this.keys[this.indexOf(key)]==-1){
            return false;
        }else{
            return true;
        }
    }
    /**
     *@return the index of a key in the internal key array
     */
    this.indexOf=function(key){
        return this.keys.indexOf(key);
    }
    /**
     * @return How many items have been added to this set - may be different to 
     * size of keys if multiple values added under the same key
     */
    this.sizeAdded=function(){
        return this.length;
    }
    this.assending= function(a, b){
        return (a-b);
    }
    this.descending=function(a, b){
        return (b-a);
    }
}