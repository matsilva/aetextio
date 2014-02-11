{
    //There is no undo group since this only effects files external to After Effects.
    var TextOut = new Object;
    TextOut.allText = new Array;
    TextOut.fileName = (function() {
        return $.os.osName.match(/Windows/)
                ? "/Desktop/aetextio/textout textout.txt"
                : ($.os.osName.match(/Mac/) ? "~/Desktop/aetextio/textout textout.txt" : "aetextio/textout textout.txt");
    })();

    TextOut.start = function(callback) {
        for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i) instanceof TextItem) {
                TextOut.allText.push(app.project.item(i).sourceText);
            }
        }
        callback(TextOut.allText);
    };

    TextOut.writeFile = function(textArray) {
        //Get destination via save dialog, then write it out
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