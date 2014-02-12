aetextio
========

This library is used to export/import comma separated text files via After Effects. it is good for mass replacing text layer values.

You can run scripts using **File > Scripts > aetextout.jsx     or     aetextin.jsx**

aetextout.jsx
========
This script will export all of your text layer values to a csv(comma separated value text file), in order. From here you can replace values with what ever you would like.... when you are done, run the aetextin.jsx script.

The output file path will be `Desktop/aetextio/ textfile.txt`

aetextin.jsx
========
This script will import your updated csv text file and replace the text layers with the corresponing data.
You can undo via `ctr+z` Windows or `cmd+z` Mac.

**Additional Info** - Commas will be escaped using a `\` when exporting text. They will also be escaped while importing by using `\` before the comma. So the correct syntax for an escaped comma would be `\,`.
