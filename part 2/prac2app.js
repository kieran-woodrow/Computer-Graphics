
let gl;
let points;
let theta = 0.0;
let varloc;

function main(){

   let canvas = document.querySelector("#glCanvas");

   //SET CANVAS TO WIDTH AND HEIGHT OF WINDOW
   canvas.width=window.innerWidth;
   canvas.height=window.innerHeight;

   gl = WebGLUtils.setupWebGL(canvas);

   if(!gl){ alert('Webgl is not supported by this browser. Please switch browsers.')};


   let vertices = [];
   //ARRAY TO HOLD FRONT OF THE HOUSE. 
   let frontWall = [

      //NEXT, THE ACTUALL BASE OF THE FRONT OF THE HOUSE (WHICH IS A RECTANGLULAR SHAPE MADE UP OF 2 TRIANGLES)

      //IN TRIANGLE FRONT TOP LEFT, FRONT BOTTOM LEFT, FRONT BOTTOM RIGHT
      -0.35, 0.1, 0.2,  
      -0.35, -0.6, 0.2, 
      0.35, -0.6, 0.2,     

      //IN TRIANGLE FRONT TOP RIGHT. FRONT BOTTOM RIGHT, FRONT TOP LEFT, 
      0.35, 0.1, 0.2,
      0.35, -0.6, 0.2,   
      -0.35, 0.1, 0.2,  
       
      //FINALLY, THE DOOR MADE UP OF 2 TRIANGLES

      //IN TRIANGLE FRONT BOTTOM LEFT, FRONT TOP LEFT, FRONT BOTTOM RIGHT
      -0.08, -0.6, 0.2001,   
      -0.08, -0.2, 0.2001,    
      0.08, -0.6, 0.2001,  
      
      //IN TRIANGLE FRONT BOTTOM RIGHT, FRONT TOP LEFT, FRONT TOP RIGHT
      0.08, -0.6, 0.2001,   
      -0.08, -0.2 , 0.2001,  
      0.08, -0.2, 0.2001
   ];

   //ARRAY TO HOLD BACK WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
   let backWall = [

      //NEXT, THE ACTUALL BASE OF THE BACK OF THE HOUSE (WHICH IS A RECTANGLULAR SHAPE MADE UP OF 2 TRIANGLES)

      //IN TRIANGLE BACK TOP LEFT, BACK BOTTOM LEFT, BACK BOTTOM RIGHT
      -0.35, 0.1, -0.2,  
      -0.35, -0.6, -0.2, 
       0.35, -0.6, -0.2,    

     //IN TRIANGLE BACK BOTTOM RIGHT, BACK TOP LEFT, BACK TOP RIGHT
      0.35, -0.6, -0.2,   
      -0.35, 0.1, -0.2,  
      0.35, 0.1, -0.2
   ];

   //ARRAY TO HOLD LEFT WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
   let leftWall = [

      //NEXT, THE ACTUALL BASE OF THE BACK OF THE HOUSE (WHICH IS A RECTANGLULAR SHAPE MADE UP OF 2 TRIANGLES)

      //IN TRIANGLE FRONT BOTTOM LEFT, FRONT TOP LEFT, BACK TOP LEFT
      -0.35, -0.6, 0.2,
      -0.35, 0.1, 0.2,   
      -0.35, 0.1, -0.2,   

      //IN TRIANGLE FRONT BOTTOM LEFT, BACK TOP LEFT, BACK BOTTOM LEFT
      -0.35, -0.6, 0.2,   
      -0.35, 0.1, -0.2,   
      -0.35, -0.6, -0.2
   ];

   //ARRAY TO HOLD RIGHT WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
   let rightWall = [

      //IN TRIANGLE FRONT BOTTOM RIGHT, FRONT TOP RIGHT, BACK TOP RIGHT
      0.35, -0.6, 0.2,   
      0.35, 0.1, 0.2,  
      0.35, 0.1, -0.2, 

      //IN TRIANGLE FRONT BOTTOM RIGHT, BACK TOP RIGHT , BACK BOTTOM RIGHT
      0.35, -0.6, 0.2, 
      0.35, 0.1, -0.2,
      0.35, -0.6, -0.2
   ];

   //ARRAY TO HOLD FRONT ROOF OF THE HOUSE. 
   let frontRoof = [    
      
      //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANGLES...
      //IN TRIANGLE FRONT TOP LEFT, FRONT TOP VERTEX, FRONT TOP RIGHT
      -0.35, 0.1, 0.2,  
      0, 0.7, 0, 
      0.35, 0.1, 0.2
   ];

   //ARRAY TO HOLD BACK ROOF OF THE HOUSE. 
   let backRoof = [    
      
      //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANGLES...
      //IN TRIANGLE BACK TOP LEFT, TOP VERTEX, BACK TOP RIGHT
      -0.35, 0.1, -0.2,  
      0, 0.7, 0, 
      0.35, 0.1, -0.2
   ];

   //ARRAY TO HOLD LEFT ROOF OF THE HOUSE. 
   let leftRoof = [    
      
      //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANGLES...
      //IN TRIANGLE FRONT TOP LEFT, TOP VERTEX, BACK TOP LEFT
      -0.35, 0.1, 0.2,  
      0, 0.7, 0, 
      -0.35, 0.1, -0.2
   ];

   //ARRAY TO HOLD RIGHT ROOF OF THE HOUSE. 
   let rightRoof = [    
      
      //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANGLES...
      //IN TRIANGLE FRONT TOP RIGHT, TOP VERTEX, BACK TOP RIGHT
      0.35, 0.1, 0.2,  
      0, 0.7, 0, 
      0.35, 0.1, -0.2
   ];

   //ARRAY TO HOLD LEFT WINDOW OF THE HOUSE. 
   let leftWindow = [

      //IN TRIANGLE TOP LEFT, BOTTOM LEFT, TOP RIGHT
      -0.35001, -0.1, 0.1,
      -0.35001, -0.3, 0.1,
      -0.35001, -0.1, -0.1, 

      //IN TRIANGLE TOP RIGHT, BOTTOM RIGHT, BOTTOM LEFT
      -0.35001, -0.1, -0.1, 
      -0.35001, -0.3, -0.1,
      -0.35001, -0.3, 0.1
   ];

   //ARRAY TO HOLD ALL RIGHT WINDOW OF THE HOUSE. 
   let rightWindow = [

      //IN TRIANGLE TOP LEFT, BOTTOM LEFT, TOP RIGHT
      0.35001, -0.1, 0.1,
      0.35001, -0.3, 0.1,
      0.35001, -0.1, -0.1, 

      //IN TRIANGLE TOP LEFT, BOTTOM LEFT, TOP RIGHT
      0.35001, -0.1, -0.1, 
      0.35001, -0.3, -0.1,
      0.35001, -0.3, 0.1
   ];

  //ARRAY TO HOLD ALL COLOURS FOR ALL SHAPES OF THE HOUSE 
  let coloursArray = [];

  //ARRAY TO HOLD ALL COLOURS FOR FRONT OF THE HOUSE  
  let frontWallColours = [

      //COLOURING THE FRONT WALL OF THE HOUSE
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta

      //COLOURING THE DOOR OF THE HOUSE 
      vec3(1, 1, 1), //White
      vec3(1, 1, 1), //White
      vec3(1, 1, 1), //White
      vec3(1, 1, 1), //White
      vec3(1, 1, 1), //White
      vec3(1, 1, 1), //White
  ];

  //ARRAY TO HOLD ALL COLOURS FOR BACK OF THE HOUSE  
  let backWallColours = [

      //COLOURING THE BACK WALL OF THE HOUSE
      vec3(0, 1, 1), //Aqua
      vec3(0, 1, 1), //Aqua
      vec3(0, 1, 1), //Aqua
      vec3(0, 1, 1), //Aqua
      vec3(0, 1, 1), //Aqua
      vec3(0, 1, 1), //Aqua
  ];

  //ARRAY TO HOLD ALL COLOURS FOR LEFT OF THE HOUSE  
  let leftWallColours = [

      //COLOURING THE LEFT WALL WALL
      vec3(1,1,0), //Yellow
      vec3(1,1,0), //Yellow
      vec3(1,1,0), //Yellow
      vec3(1,1,0), //Yellow
      vec3(1,1,0), //Yellow
      vec3(1,1,0), //Yellow
  ];

   //ARRAY TO HOLD ALL COLOURS FOR RIGHT OF THE HOUSE  
   let rightWallColours = [

      //COLOURING THE FRONT WALL OF THE HOUSE
      vec3(0,128,0), //Lime
      vec3(0,128,0), //Lime
      vec3(0,128,0), //Lime
      vec3(0,128,0), //Lime
      vec3(0,128,0), //Lime
      vec3(0,128,0), //Lime
   ];

   //ARRAY TO HOLD ALL COLOURS FOR FRONT ROOF OF THE HOUSE  
   let frontRoofColours = [

      //COLOURING THE FRONT ROOF OF THE HOUSE
      vec3(0, 0, 1), //Blue
      vec3(0, 0, 1), //Blue
      vec3(0, 0, 1), //Blue
   ];

   //ARRAY TO HOLD ALL COLOURS FOR BACK ROOF OF THE HOUSE  
   let backRoofColours = [

      //COLOURING THE BACK ROOF OF THE HOUSE
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
      vec3(1, 0, 1), //Magenta
   ];

   //ARRAY TO HOLD ALL COLOURS FOR LEFT ROOF OF THE HOUSE  
   let leftRoofColours = [

       //COLOURING THE LEFT ROOF OF THE HOUSE
      vec3(0,1,0), //Lime
      vec3(0,1,0), //Lime
      vec3(0,1,0), //Lime
   ];

   //ARRAY TO HOLD ALL COLOURS FOR RIGHT ROOF OF THE HOUSE  
   let rightRoofColours = [

       //COLOURING THE RIGHT ROOF OF THE HOUSE
      vec3(1,0,0), //Red
      vec3(1,0,0), //Red
      vec3(1,0,0), //Red
   ];

   //ARRAY TO HOLD ALL COLOURS FOR LEFT WINDOW OF THE HOUSE  
   let leftWindowColours = [

      //COLOURING THE LEFT WINDOW OF THE HOUSE
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
   ];

   //ARRAY TO HOLD ALL COLOURS FOR RIGHT WINDOW OF THE HOUSE  
   let rightWindowColours = [

       //COLOURING THE RIGHT WINDOW OF THE HOUSE
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
      vec3(0,0,0), //Black
   ];


   //CONCATONATE ALL ARRAYS INTO ONE COLOUR ARRAY
   coloursArray = coloursArray.concat(frontWallColours, backWallColours, 
                                      leftWallColours, rightWallColours,
                                      frontRoofColours, backRoofColours, 
                                      leftRoofColours, rightRoofColours, 
                                      leftWindowColours, rightWindowColours 
                                      );

   //CONCATONATE ALL ARRAYS INTO ONE VERTEX ARRAY
   vertices = vertices.concat(frontWall, backWall, leftWall,rightWall, 
                              frontRoof, backRoof, leftRoof, 
                              rightRoof, leftWindow, rightWindow
                              );

  //CONFIGURE WEBGL
  gl.viewport(0, 0, canvas.width, canvas.height);

  //LOAD SHADERS AND INITIALISE ATTRIBUTE BUFFERS
  let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);

  //LOAD THE DATA INTO THE GPU
  let bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  //ASSOSIATE THE SHADER VARIABLES WITH THE DATA BUFFER
  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  let cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(coloursArray), gl.STATIC_DRAW);

  let vColour = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColour, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColour);

  varloc = gl.getUniformLocation(program, "theta");

  render();
}

function render(){

gl.uniform1f(varloc, theta);
theta += 0.01;

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 54); //54 BECAUSE THERE ARE 54 TRIANGLES

  window.requestAnimationFrame(render);
}