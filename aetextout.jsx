{
    
    var TextOut = new Object;
    TextOut.allText = new Array;
    TextOut.fileName = null;
    TextOut.path = null;
    TextOut.getAllText = (function(){
        //iterate through project and store into array
        //return array
        for(var i = 1; i <= app.project.numItems; i++){
            if(app.project.item(i) instanceof TextItem){
                TextOut.allText.push(app.project.item(i).sourceText);
            }
        }
    })();
    TextOut.writeFile = function(){
        //Get destination via save dialog, then write it out
        var _joinText = TextOut.allText.join(",");
        
    };
    // export text to a txt file
    function exportAsTxt () {
        // generate heading
        var introText = "exportForClient report\n\n" + 
                            "Creation date:\t" + today.toString() +
                            "\nProject name:\t" + myProj +
                            "\nMain Composition:\t" + myComp.name + "\n\n";
        // create txt file
        var tempFile = new File (defaultName);
        myFile = tempFile.saveDlg(promptPath,extension); // create save dialog
        if (myFile != null) {
            myFile.open("w"); // open file
            myFile.write(introText); // write intro text
            // function which generate txt file text
            writeText (myComp);
            myFile.changePath(myFile); // save in path
            myFile.close(); // close file
            }
        }
    // function exportAsTxt
    
     // generate text to write into txt file
    function writeText (selectedComp) {
        // get frames per second
        var fps = 1/myComp.frameDuration;
        // loop
        for (var i = 1; i <= selectedComp.numLayers; i++) {
            // if layer is a comp
            if (selectedComp.layer(i).source instanceof CompItem && selectedComp.layer(i).enabled == true) {
                writeText (selectedComp.layer(i).source); // go on recursively
            // if layer is a text layer
            } else if (selectedComp.layer(i) instanceof TextLayer && selectedComp.layer(i).enabled == true) {
                // if asked for timecode, then write it
                if (exportWithTC == true) {
                    // write composition info
                    myFile.write("Composition: \t");
                    myFile.write(selectedComp.name);
                    myFile.write("\n");
                    // write timecode info
                    myFile.write("Timecode: \t");
                    myFile.write(timeToCurrentFormat(selectedComp.layer(i).inPoint,fps) + " --> " + timeToCurrentFormat(selectedComp.layer(i).outPoint,fps));
                    // write text
                    myFile.write("\n");
                    myFile.write("Text:\n\t");
                    }
                // write text source
                layerText = selectedComp.layer(i).text.sourceText;
                if (exportAllValues == true && layerText.numKeys > 0) { // if it has been told to write every keyframe and has keyframes
                    for (var h = 1; h <= layerText.numKeys; h++) {
                        myFile.write(layerText.keyValue(h));
                        myFile.write("\n\t");
                        }
                } else { // if it hasn't been told to write every keyframe
                    if (layerText.expressionEnabled == true) { // if it has expression
                        myFile.write("EXPRESSION:\t");
                        myFile.write(layerText.expression);
                        myFile.write("\n");
                    } else { // if it doesn't have a expression
                        myFile.write(layerText.value);
                        myFile.write("\n");
                        }
                    }
                myFile.write("\n");
                }
            }    
        }
    // function writeText

} 