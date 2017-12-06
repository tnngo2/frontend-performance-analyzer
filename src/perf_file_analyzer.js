var DevtoolsTimelineModel = require('devtools-timeline-model');

class PerfFileAnalyzer {
    constructor (filePath) {
        this._filePath = filePath;
        let events = require('fs').readFileSync(filePath, 'utf8');
        this._devToolModel = new DevtoolsTimelineModel(events);
        this._timelineModel = this._devToolModel.timelineModel();
    }

    getTimelineModel() {
        return this._timelineModel;
    }

    getStartingTime(startingEvent){
        let mouseDownEvts = this._timelineModel._mainThreadEvents.filter(
            (evt) => {
                let isSatisfy = (evt && evt.args && evt.args.data &&
                    evt.args.data.type === startingEvent.name) ?
                    true :
                    false;
                return isSatisfy;
            }
        );
        let startTime = mouseDownEvts[0].startTime;

        return startTime;
    }

    getEndingTime(endingEvent) {
        let compositeLayers = this._timelineModel._mainThreadEvents.filter(
            (evt) => {
                let isSatisfy = (endingEvent.name === 'CompositeLayers') ?
                    (evt.name === endingEvent.name) :
                    false;
                return isSatisfy;
            }
        );
        let lastCompositeLayer = compositeLayers[compositeLayers.length -1];
        let endTime = (lastCompositeLayer) ? lastCompositeLayer.endTime : 0;
        return endTime;
    }

    countDuration(startingEvent, endingEvent) {
        let duration = this.getEndingTime(endingEvent) - this.getStartingTime(startingEvent);
        return duration;
    }
}

module.exports = PerfFileAnalyzer;