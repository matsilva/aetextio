{
    var TextOut = new Object;
    TextOut.allText = new Array;
    TextOut.fileName = (function(){
            return $.os.osName.match(/Windows/) 
                ? "/Desktop/aetextio/textout textout.txt" 
                : ($.os.osName.match(/Mac/ ? "~/Desktop/aetextio/textout textout.txt" : "aetextio/textout textout.txt");
    })();
    TextOut.start = function(callback){
        for(var i = 1; i <= app.project.numItems; i++){
            if(app.project.item(i) instanceof TextItem){
                TextOut.allText.push(app.project.item(i).sourceText);
            }
        }
    callback(TextOut.allText);
    };
    TextOut.writeFile = function(textArray){
        
        //Get destination via save dialog, then write it out
        var _joinText = textArray.join(",");
        var _initFile = new File(TextOut.fileName);
        var _textFile = initFile.saveDlg ("Save .txt file", "Text: *.txt")
        if(_textFile != null){
            _textFile.open("w");
            _textFile.write(_joinText);
            _textFile.changePath (_textFile);
            _textFile.close();
        }
    };

    //Execute script
    TextOut.start(TextOut.writeFile);
} 