const inp1 = document.getElementById('inp1');
        const inp2 = document.getElementById('inp2');
        const inp3 = document.getElementById('inp3');
        const inp4 = document.getElementById('inp4');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const tb = document.getElementById('tb');
        const par = document.getElementById('par');
        var step = [];
        var arr = [];
        var newArr = [];
        var dir = 'Right';

        btn1.addEventListener('click', () => {
            dir = 'Right';
        });
        btn2.addEventListener('click', () => {
            dir = 'Left';
        });
        btn1.addEventListener('click', addhandler);
        btn2.addEventListener('click', addhandler);
        inp1.addEventListener('blur', addhandler);
        inp2.addEventListener('blur', addhandler);
        inp3.addEventListener('blur', addhandler);
        inp4.addEventListener('blur', addhandler);
        function addhandler() {
            par.innerHTML = '';
            tb.innerHTML = '';
            arr = [];
            newArr = '';
            step = []
            spiral(inp1.value, inp2.value, inp3.value, inp4.value, dir);
            par.innerHTML = newArr;
        }
        function createArr(с) {
            window['circleCreate' + с] = [];
        }
        function createXY(xy, num, n, с) { //dir = right; 
            for (let g = 0; g < n; g++) {
                window['circleCreate' + с].push([xy, num]);
            }
        }
        function createCircle(cN, d) { // cN - circle number
            switch (cN) {
                case 1:
                    createArr(cN);
                    createXY('y', 0, 1, cN);
                    createXY('x', -1, 1, cN);
                    createXY('y', d == 'Right' ? -1 : 1, 1, cN);
                    createXY('x', 1, 2, cN);
                    createXY('y', d == 'Right' ? 1 : -1, 2, cN);
                    step.push(...window['circleCreate' + cN])
                    break;
                default:
                    createArr(cN);
                    createXY('x', -1, cN + 1, cN);
                    createXY('y', d == 'Right' ? -1 : 1, cN * 2 - 1, cN);
                    createXY('x', 1, cN * 2, cN);
                    createXY('y', d == 'Right' ? 1 : -1, cN * 2, cN);
                    createXY('x', -1, cN - 1, cN);
                    step.push(...window['circleCreate' + cN])
                    break;
            }
        }
        function spiral(el, row, sRow, sCol, dir) {  //  малюємо масив (змінюємо розмір через параметри)  
            for (let m = 1; m < (el > row ? el * row / row : el * row / el); m++) { // максимальна кількість витків спіралі при заданих умовах
                createCircle(m, dir);
            }
            let positionX = sCol - 1;
            let positionY = sRow - 1;            
            for (let i = 0; i < row; i++) {  // строки
                arr.push([]);
                for (let j = +arr[i] + 1; j <= el; j++) {  //елементів в строці
                    arr[i].push(j + (i * el));
                }
            }
            for (let k = 0; k < step.length; k++) {    // дані по координатах   
                // debugger;
                step[k][0] == 'x' ? (positionY = positionY + step[k][1]) : (positionX = positionX + step[k][1]);
                if (positionX >= 0 && positionY >= 0 && positionX < row && positionY < el) {
                    // debugger;
                    let expression = arr[positionX][positionY];
                    expression != undefined ? newArr +=expression + '. ' : ''
                };
            }           
            for (let v = 0; v < arr.length; v++) {  // строки
                var html = '';
                for (let s = 0; s < arr[v].length; s++) { // елементи
                    html += `<td>${arr[v][s]}</td>`;                    
                }
                tb.innerHTML += `<tr>${html}</tr>`;
            }
        }