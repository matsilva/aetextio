{
  app.beginUndoGroup("Import csv text file"); // create undo group

    var TextIn = new Object;
    TextIn.allText = new Array;
    
    //Get all text layers and replace their source with corresponding value in array
    TextIn.replaceText = function(textArray){
        for(var i = 1; i <= app.project.numItems ; i++){
            var b = i-1;
            if (app.project.item(i) instanceof TextItem) {
                app.project.item(i).sourceText = textArray[b];
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
            text = myFile.readln();
            if (text == "") text = "\r" ;
        }
        TextIn.allText = text.split(",");
        textFile.close();
        callback(TextIn.allText);
    };

    TextIn.getFile(TextIn.replaceText); //Execute script
    
    app.endUndoGroup();
}