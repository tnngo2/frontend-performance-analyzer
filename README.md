# Description
I use this project to extract time-taken between two events in front-end.
The time-taken data is essential to compare how effective your optimization are.

The input is Timeline data recorded in Chrome DevTools and the name of starting and ending events.
The output is the average of time-taken between two events above.

# Installation
```
npm install
```

# Usage
The syntax of the running command is as follows:
```
node index.js {TimelineDataPath} {Start_Event} {End_Event}
```
## Example
I would like to have the average of time-taken between `mousedown` (User click on an element) and
`CompositeLayers` (The application completes its rendering).

I record Timeline data in Chrome's DevTools for the use case, export and store all data in `./perf-data`. The more data collected, the better accurate the average time-take. Also, it is better to use automation tool such as UIPath to automate the use case.

After collecting Timeline data, please run the following command.
```
node index.js ./perf-data mousedown CompositeLayers
```