import Bg from './path-bg'; 
import Li from './path-li'; 
import Face from './path-face';
import Path from './path';
let paths = [Bg, Li, Face];
let search = location.search;
let index = 0;
if (/1/.test(search)) {
    index = 1;
} else if (/2/.test(search)) {
    index = 2;
}
let path = new Path({
    ...paths[index],
    canvas: document.querySelector('#path')
});
path.run();
