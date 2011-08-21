About
=====
 An implementation of a Set which supports multiple values per key, 
 sorting and iteration over elements without knowing any of the keys!
 (Not technically a "hashed" set just yet, but possibly in the near future)...

Features
--------
* Sorted by keys
* Reversed sorting
* Multiple values per key
* Force one to one key to value (I.E. only one value per key)
* Iterate over items without knowing any of the keys
* Supports hasNext() and next() for iteration
* Supports removeFirst() to remove the first item in the set
* Supports removeLast() to remove last item in the set
* Add or Remove items by key

Example
-------
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="hashset.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            window.onload=function(){
                set= new HashSet();
                //We're going to demonstrate multiple values per key
                for(var i=0;i<500;i++){
                    set.add(i, i+1);
                }
                for(var i=250;i<750;i++){
                    set.add(i, i+1);
                }
                while(set.hasNext()){
                    document.getElementById("output").innerHTML=
                        document.getElementById("output").innerHTML+"<br />"+
                        set.next();//returns an array of all values for the next item
                }
                
            }
        </script>

        <div id="output"></div>
    </body>
</html>
