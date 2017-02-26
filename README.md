# playEquation

Uses [fooPlot](https://github.com/dheera/fooplot) primarly to take an equation, generate a 2-second PCM WAV file at 44.1k and plays it back in the browser.

UPDATE 2017-02-26: I wanted to reorganize this project using React but it was really a pain to deal with MathJax so I took it out. fooPlot is even worse as I tried to reorganize that library to fit in es6 but the code is too messy for that to easily be successful. Therefore, at this time, this branch does not have a working version. I may return to this someday.

## Dev Environment

`gulp serve` to run

`gulp test:auto` to test

`gulp` to build

## TODO
 - get it at least working
 - write tests
 - refactor