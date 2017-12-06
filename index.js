const PERFORMANCE_DATA_PATH = process.argv[2] || './perf-data';
const START_EVENT = process.argv[3] || 'mousedown';
const END_EVENT = process.argv[4] || 'CompositeLayers';

// MAIN
let PerfDirAnalyzer = require('./src/perf_dir_analyzer.js');
let dirAnalyzer = new PerfDirAnalyzer(PERFORMANCE_DATA_PATH);

let avg = dirAnalyzer.countAverageDuration(START_EVENT, END_EVENT);
console.info('Average duration: ' + avg + ' ms');