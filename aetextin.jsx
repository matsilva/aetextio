{
  app.beginUndoGroup("Import csv text file"); // create undo group

    var TextIn = new Object;
    TextIn.allText = new Array;
    
    //Get all text layers and replace their source with corresponding value in array
    TextIn.replaceText = function(textArray){
        var b=0;
        for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i) instanceof CompItem) {
                for (var j = 1; j <= app.project.item(i).layers.length ; j++) {
                    if(app.project.item(i).layer(j) instanceof TextLayer){
                        app.project.item(i).layer(j).text.sourceText.setValue(textArray[b]);
                        b++;
                    }
                }
            }
        }
    };
    
    //Get text file, read it, then split csv into global array
    TextIn.getFile = function(callback){
        var textFile = File.openDialog("Please select input text file.");
        if (textFile != null){
            textFile.open("r");  // open file
        }
        var text;
        while (!textFile.eof){
            text = textFile.readln();
            if (text == "") text = "\r" ;
        }
        TextIn.allText =text.replace(/([^\\]),/g, '$1\u000B').replace(/\\(,)/g, '$1').split('\u000B');
        writeLn(TextIn.allText.toString());
        textFile.close();
        callback(TextIn.allText);
    };

    TextIn.getFile(TextIn.replaceText); //Execute script
    
    app.endUndoGroup();
}