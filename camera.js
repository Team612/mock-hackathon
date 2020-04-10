var canvas, context, vid, photo, table, loop;
var size = 3;

var promise = window.navigator.mediaDevices.getUserMedia({video: true}).then(function(stream){

    document.getElementById("increase").addEventListener("mousedown", function(event){
        // there has to be a better way to do this, I just didn't figure it out lol
        clearInterval(loop);
        var table = document.getElementById("kernel");
        var tbody = table.childNodes[1];
        var rows = tbody.children;
        size += 2;
        for(var i=0;i<rows.length;i++){
            var row = rows[i];
            var newItem = document.createElement("TD");
            newItem.appendChild(makeInput());
            row.insertBefore(newItem, null);
        }
        for(var i=0;i<rows.length;i++){
            var row = rows[i];
            var newItem = document.createElement("TD");
            newItem.appendChild(makeInput());
            row.insertBefore(newItem, row.children[0]);
        }
        var newPrevRow = document.createElement("TR"); // these variable names are reversed but I'm lazy
        for (var i=0;i<size;i++) {
          var newItem = document.createElement("TD");
          newItem.appendChild(makeInput());
          newPrevRow.appendChild(newItem);
        }
        tbody.appendChild(newPrevRow);
        var newAfterRow = document.createElement("TR");
        for (var i=0;i<size;i++) {
          var newItem = document.createElement("TD");
          newItem.appendChild(makeInput());
          newAfterRow.appendChild(newItem);
        }
        tbody.insertBefore(newAfterRow, tbody.children[0]);
        loop = setInterval(updateCanvas, 100);
    });

    document.getElementById("decrease").addEventListener("mousedown", function(e) {
      clearInterval(loop);
      var table = document.getElementById("kernel");
      table.deleteRow(size - 1);
      table.deleteRow(0); // why can't adding a row be this easy????
      var rows = table.childNodes[1].children;
      for (var i=0;i<rows.length;i++) {
        rows[i].deleteCell(size - 1);
        rows[i].deleteCell(0);
      }

      size -= 2;
      loop = setInterval(updateCanvas, 100);
    });

    document.getElementById("randomize").addEventListener("mousedown", function(e) {
      var table = document.getElementById("kernel");
      for (var i=0;i<size;i++) {
        for (var j=0;j<size;j++) {
          var randomness = +document.getElementById("range").value;
          table.rows[i].cells[j].childNodes[0].value = randomness * 2 * Math.random() - randomness;
          console.log(table.rows[i].cells[j].childNodes);
        }
      }
    })


    vid = document.getElementById("camera");
    photo = document.getElementById("mod");
    canvas = document.getElementById("canvas");
    canvas.width = 427;
    canvas.height = 320;
    context = canvas.getContext("2d");
    vid.srcObject = stream;
    vid.onloadedmetadata = function(e){
        vid.play();
        loop = setInterval(updateCanvas, 100);
    }
});

function makeInput() {
  var newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "number");
  newInput.setAttribute("min", "-100");
  newInput.setAttribute("max", "100");
  newInput.setAttribute("max", "0.01");
  return newInput;
}

function updateCanvas(){
    context.drawImage(vid, 0, 0, 427, 320);
    table = document.getElementById("kernel");
    var kernel = [[]];
    for(var i=0,row;row=table.rows[i];i++){
        for(var j=0,col;col=row.cells[j];j++){
            if(!(col.childNodes[0])) continue;
            if(!(col.childNodes[0].value)){
                kernel[i].push(0);
            } else {
                kernel[i].push(parseFloat(col.childNodes[0].value));
            }
        }
        kernel.push([]);
    }
    kernel.splice(kernel.length-1, 1);
    var pixels = context.getImageData(0, 0, 427, 320);
    var newPixels = convolution(kernel, pixels);
    context.putImageData(newPixels, 0, 0);
    var data = canvas.toDataURL("image/png");
    photo.setAttribute('src', data);
}

function convolution(kernel, pixels){
    var useScale = document.getElementById("scale").checked;
    var ansPixels = context.createImageData(pixels);
    pixels = pixels.data;
    if(kernel.length!=kernel[0].length){
        console.log("Not a square matrix");
        return;
    }
    var n = kernel.length;
    if(n%2!=1){
        console.log("Not an odd sized kernel");
        return;
    }
    var border = (n-1)/2;
    var scale = 0.0;
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            scale += kernel[i][j];
        }
    }
    console.log("------------"+scale+"--------------");
    for(var index=4*border;index<pixels.length-(4*border);index+=4){
        var sumRed = 0;
        var sumGreen = 0;
        var sumBlue = 0;
        for(var i=0;i<n;i++){
            for(var j=0;j<n;j++){
                sumRed += pixels[index-(4*border)+(i*4*n)+(j*4)]*kernel[i][j];
                sumGreen += pixels[index+1-(4*border)+(i*4*n)+(j*4)]*kernel[i][j];
                sumBlue += pixels[index+2-(4*border)+(i*4*n)+(j*4)]*kernel[i][j];
            }
        }
        if(useScale){
            sumRed /= scale;
            sumGreen /= scale;
            sumBlue /= scale;
        }
        sumRed = sumRed<0?0:sumRed>255?255:sumRed;
        sumGreen = sumGreen<0?0:sumGreen>255?255:sumGreen;
        sumBlue = sumBlue<0?0:sumBlue>255?255:sumBlue;

        ansPixels.data[index] = Math.floor(sumRed);
        ansPixels.data[index+1] = Math.floor(sumGreen);
        ansPixels.data[index+2] = Math.floor(sumBlue);
        ansPixels.data[index+3] = 255; //Alpha
    }
    return ansPixels;
}
