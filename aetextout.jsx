{
    //There is no undo group since this only effects files external to After Effects.
    clearOutput();
    var TextOut = new Object;
    TextOut.allText = new Array;
    TextOut.fileName = (function() {
        return $.os.match(/Windows/)
                ? "/Desktop/aetextio/textout/ textfile.txt"
                : ($.os.match(/Mac/) ? "~/Desktop/aetextio/textout/ textfile.txt" : "aetextio/textout/ textfile.txt");
    })();

    TextOut.start = function(callback) {
        for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i) instanceof CompItem) {
                for (var j = 1; j <= app.project.item(i).layers.length ; j++) {
                    if(app.project.item(i).layer(j) instanceof TextLayer){
                        TextOut.allText.push(app.project.item(i).layer(j).text.sourceText.value.toString().replace(/(,)/g, '\\$1'));
                    }
                }
            }
        }
        callback(TextOut.allText);
    };

    TextOut.writeFile = function(textArray) {
        //Get destination via save dialog, then write it out
        
        //Todo: check if layers are null before calling
        var joinText = textArray.join(",");
        var initFile = new File(TextOut.fileName);
        var textFile = initFile.saveDlg("Save .txt file", "Text: *.txt")
        if (textFile != null) {
            textFile.open("w");
            textFile.write(joinText);
            textFile.changePath(textFile);
            textFile.close();
        }
    };

    //Execute script
    TextOut.start(TextOut.writeFile);
} 