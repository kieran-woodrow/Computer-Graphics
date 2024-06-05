
let gl;
let points;

function main(){

  let canvas = document.querySelector("#glCanvas");

  canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

  gl = WebGLUtils.setupWebGL(canvas);

  if(!gl){ alert('Webgl is not supported by this browser. Please switch browsers.')};

  //ARRAY TO HOLD ALL VERTICES OF THE HOUSE. THERE WILL BE 15 VERTICES IN TOTAL ( 5 TRIANGLES = 5 * 3 = 15)
  let verticesArray =[
    
    //CO-ORDINATES FOR THE ROOF..ORDER GOES BOTTOM LEFT, TOP VERTEX, BOTTOM RIGHT
    -0.3, 0.2, 
    0, 0.8, 
    0.3, 0.2,

    //CO-ORDINATES FOR THE BASE/FRONT OF THE HOUSE (2 TRIANGLES)..ORDER GOES TOP LEFT, BOTTOM LEFT, BOTTOM RIGHT, TOP RIGHT, TOP LEFT
    -0.3, 0.2, 
    -0.3, -0.5, 
    0.3, -0.5, 
    0.3, -0.5, 
    0.3, 0.2, 
    -0.3, 0.2, 

    //CO-ORDINATES FOR THE DOOR (2 TRIANGLES)..ORDER GOES BOTTOM LEFT, TOP LEFT, BOTTOM RIGHT, BOTTOM RIGHT, TOP RIGHT, TOP LEFT
    -0.1, -0.5, 
    -0.1, 0.0, 
    0.1, -0.5, 
    0.1, -0.5, 
    0.1, 0.0, 
    -0.1, 0.0 
  ];

  //ARRAY TO COLOUR ALL SHAPES OF THE HOUSE (THE DOOR, THE ROOF, THE BASE)
  let coloursArray = [

    //COLOURING THE ROOF
    vec3(255,0,0), //AQUA
    vec3(255,0,0), //AQUA
    vec3(255,0,0), //AQUA

    //COLOURING IN THE BASE OF THE HOUSE
    vec3(0,128,0), //SPRING GREEN
    vec3(0,128,0), //SPRING GREEN
    vec3(0,128,0), //SPRING GREEN
    vec3(0,128,0), //SPRING GREEN
    vec3(0,128,0), //SPRING GREEN
    vec3(0,128,0), //SPRING GREEN

    //COLOURING IN THE DOOR
    vec3(0,0,255), //ANTIQUE WHITE
    vec3(0,0,255), //ANTIQUE WHITE
    vec3(0,0,255), //ANTIQUE WHITE
    vec3(0,0,255), //ANTIQUE WHITE
    vec3(0,0,255), //ANTIQUE WHITE
    vec3(0,0,255), //ANTIQUE WHITE
  ];

  //CONFIGURE WEBGL

  gl.viewport(0, 0, canvas.width, canvas.height);
  //gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //LOAD SHADERS AND INITIALISE ATTRIBUTE BUFFERS

  let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  //LOAD THE DATA INTO THE GPU

  let bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesArray), gl.STATIC_DRAW);

  //ASSOSIATE THE SHADER VARIABLES WITH THE DATA BUFFER

  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  let cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(coloursArray), gl.STATIC_DRAW);


  let vColour = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColour, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColour);

  render();
}

function render(){

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 15);

  window.requestAnimationFrame(render);
}