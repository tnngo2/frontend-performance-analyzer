var fs = require('fs');
var PerfFileAnalyzer = require('./perf_file_analyzer.js');

class PerfDirAnalyzer {
    constructor (dir) {
        this.filePathArr = this.retrieveFiles(dir);
    }

    retrieveFiles (dir){
        let fileList = fs.readdirSync(dir);
        var pathList =[];
        fileList.forEach (function(fileName){
            pathList.push(dir + '/' + fileName);
        });
        return pathList;
    }

    countAverageDuration (startEvent, endEvent){
        let totalDuration = 0;
        this.filePathArr.forEach(function(filePath, index){
            console.info('Analyzing ' + filePath);
            let analyzer = new PerfFileAnalyzer(filePath);
            let duration = analyzer.countDuration({
                name: startEvent
            }, {
                name: endEvent 
            });
            console.info('Duration: ' + duration + ' ms');
            console.info('-----------------------------');
            totalDuration += duration;
        });

        return totalDuration / this.filePathArr.length;
    }
}

module.exports = PerfDirAnalyzer;

