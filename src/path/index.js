import Bg from './path-bg'; 
import Li from './path-li'; 
import Face from './path-face';
import Test from './path-test';
import Path from './path';
let paths = [Bg, Li, Face, Test];
let search = location.search;
let index = 0;
paths.forEach((item, i) => {
    if (new RegExp(i).test(search)) {
        index = i; 
    }
});
let path = new Path({
    ...paths[index],
    canvas: document.querySelector('#path')
});
path.run();
