
let gl1;
let points1;
let theta = 0.0;
let varloc11;
let varloc22;
let axis = 0.0;
let mainColourArray = [];
let mainVectorArray = [];
let type;
let number=60;

let canvas = document.querySelector("#glCanvas");

//SET CANVAS TO WIDTH AND HEIGHT OF WINDOW
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

gl1 = WebGLUtils.setupWebGL(canvas);
let program = initShaders(gl1, 'vertex-shader', 'fragment-shader');


let vertices = [];
//ARRAY TO HOLD FRONT OF THE HOUSE. 
let frontWall = [

   //NEXT, THE ACTUALL BASE OF THE FRONT OF THE HOUSE (WHICH IS A RECTANgl1ULAR SHAPE MADE UP OF 2 TRIANgl1ES)

   //IN TRIANgl1E FRONT TOP LEFT, FRONT BOTTOM LEFT, FRONT BOTTOM RIGHT
   -0.35, 0.1, 0.2,  
   -0.35, -0.6, 0.2, 
   0.35, -0.6, 0.2,     

   //IN TRIANgl1E FRONT TOP LEFT, FRONT TOP RIGHT. FRONT BOTTOM RIGHT, 
   -0.35, 0.1, 0.2,  
   0.35, 0.1, 0.2,
   0.35, -0.6, 0.2,   

    
   //FINALLY, THE DOOR MADE UP OF 2 TRIANgl1ES

   //IN TRIANgl1E FRONT BOTTOM LEFT, FRONT TOP LEFT, FRONT BOTTOM RIGHT
   -0.08, -0.6, 0.2001,   
   -0.08, -0.2, 0.2001,    
   0.08, -0.6, 0.2001,  
   
   //IN TRIANgl1E FRONT BOTTOM RIGHT, FRONT TOP LEFT, FRONT TOP RIGHT
   0.08, -0.6, 0.2001,   
   -0.08, -0.2 , 0.2001,  
   0.08, -0.2, 0.2001
];

//ARRAY TO HOLD BACK WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
let backWall = [

   //NEXT, THE ACTUALL BASE OF THE BACK OF THE HOUSE (WHICH IS A RECTANgl1ULAR SHAPE MADE UP OF 2 TRIANgl1ES)

   //IN TRIANgl1E BACK TOP LEFT, BACK BOTTOM LEFT, BACK BOTTOM RIGHT
   -0.35, 0.1, -0.2,  
   -0.35, -0.6, -0.2, 
    0.35, -0.6, -0.2,    

  //IN TRIANgl1E BACK BOTTOM RIGHT, BACK TOP LEFT, BACK TOP RIGHT
   0.35, -0.6, -0.2,   
   -0.35, 0.1, -0.2,  
   0.35, 0.1, -0.2
];

//ARRAY TO HOLD LEFT WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
let leftWall = [

   //NEXT, THE ACTUALL BASE OF THE BACK OF THE HOUSE (WHICH IS A RECTANgl1ULAR SHAPE MADE UP OF 2 TRIANgl1ES)

   //IN TRIANgl1E FRONT BOTTOM LEFT, FRONT TOP LEFT, BACK TOP LEFT
   -0.35, -0.6, 0.2,
   -0.35, 0.1, 0.2,   
   -0.35, 0.1, -0.2,   

   //IN TRIANgl1E FRONT BOTTOM LEFT, BACK TOP LEFT, BACK BOTTOM LEFT
   -0.35, -0.6, 0.2,   
   -0.35, 0.1, -0.2,   
   -0.35, -0.6, -0.2
];

//ARRAY TO HOLD RIGHT WALL OF THE HOUSE. (NO DOOR AND NO WINDOWS)
let rightWall = [

   //IN TRIANgl1E FRONT BOTTOM RIGHT, FRONT TOP RIGHT, BACK TOP RIGHT
   0.35, -0.6, 0.2,   
   0.35, 0.1, 0.2,  
   0.35, 0.1, -0.2, 

   //IN TRIANgl1E FRONT BOTTOM RIGHT, BACK TOP RIGHT , BACK BOTTOM RIGHT
   0.35, -0.6, 0.2, 
   0.35, 0.1, -0.2,
   0.35, -0.6, -0.2
];

//ARRAY TO HOLD FRONT ROOF OF THE HOUSE. 
let frontRoof = [    
   
   //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANgl1ES...
   //IN TRIANgl1E FRONT TOP LEFT, FRONT TOP VERTEX, FRONT TOP RIGHT
   -0.35, 0.1, 0.2,  
   0, 0.7, 0, 
   0.35, 0.1, 0.2
];

let bottomWall = [

   //IN TRIANgl1E FRONT BOTTOM LEFT, FRONT BOTTOM RIGHT, BACK BOTTOM RIGHT
   -0.35, -0.6, 0.2, 
   0.35, -0.6, 0.2,    
   0.35, -0.6, -0.2,    

   //IN TRIANgl1E FRONT BOTTOM LEFT, BACK BOTTOM LEFT , BACK BOTTOM RIGHT
   -0.35, -0.6, 0.2, 
   -0.35, -0.6, -0.2,
   0.35, -0.6, -0.2
];

//ARRAY TO HOLD BACK ROOF OF THE HOUSE. 
let backRoof = [    
   
   //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANgl1ES...
   //IN TRIANgl1E BACK TOP LEFT, TOP VERTEX, BACK TOP RIGHT
   -0.35, 0.1, -0.2,  
   0, 0.7, 0, 
   0.35, 0.1, -0.2
];

//ARRAY TO HOLD LEFT ROOF OF THE HOUSE. 
let leftRoof = [    
   
   //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANgl1ES...
   //IN TRIANgl1E FRONT TOP LEFT, TOP VERTEX, BACK TOP LEFT
   -0.35, 0.1, 0.2,  
   0, 0.7, 0, 
   -0.35, 0.1, -0.2
];

//ARRAY TO HOLD RIGHT ROOF OF THE HOUSE. 
let rightRoof = [    
   
   //START WITH THE ROOF WHICH IS MADE UP OF 1 TRIANgl1ES...
   //IN TRIANgl1E FRONT TOP RIGHT, TOP VERTEX, BACK TOP RIGHT
   0.35, 0.1, 0.2,  
   0, 0.7, 0, 
   0.35, 0.1, -0.2
];

//ARRAY TO HOLD LEFT WINDOW OF THE HOUSE. 
let leftWindow = [

   //IN TRIANgl1E TOP LEFT, BOTTOM LEFT, TOP RIGHT
   -0.35001, -0.1, 0.1,
   -0.35001, -0.3, 0.1,
   -0.35001, -0.1, -0.1, 

   //IN TRIANgl1E TOP RIGHT, BOTTOM RIGHT, BOTTOM LEFT
   -0.35001, -0.1, -0.1, 
   -0.35001, -0.3, -0.1,
   -0.35001, -0.3, 0.1
];

//ARRAY TO HOLD ALL RIGHT WINDOW OF THE HOUSE. 
let rightWindow = [

   //IN TRIANgl1E TOP LEFT, BOTTOM LEFT, TOP RIGHT
   0.35001, -0.1, 0.1,
   0.35001, -0.3, 0.1,
   0.35001, -0.1, -0.1, 

   //IN TRIANgl1E TOP LEFT, BOTTOM LEFT, TOP RIGHT
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
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
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

let bottomWallColours = [

   //COLOURING THE BOTTOM BASE OF THE HOUSE
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

let coloursArrayWireframe=[

   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black
   vec3(0,0,0), //Black     
];

let verticeswireframe = [];

let bottomWallwireframe = [

   //fbl, fbr
   -0.35, -0.6, 0.2, 
   0.35, -0.6, 0.2,   
   
   //fbr, bbr
   0.35, -0.6, 0.2,   
   0.35, -0.6, -0.2,    

   //bbr, fbl
   0.35, -0.6, -0.2,  
   -0.35, -0.6, 0.2,   

   //fbl, bbl
   -0.35, -0.6, 0.2, 
   -0.35, -0.6, -0.2,

   //bbl, bbr
   -0.35, -0.6, -0.2,
   0.35, -0.6, -0.2,
];

let backWallwireframe = [

   //bbr, bbl
   0.35, -0.6, -0.2,   
   -0.35, -0.6, -0.2, 
   
   //bbl, btl
   -0.35, -0.6, -0.2,
   -0.35, 0.1, -0.2,   
  
   //btl, bbr
   -0.35, 0.1, -0.2,   
   0.35, -0.6, -0.2,

   //bbr, btr
   0.35, -0.6, -0.2,   
   0.35, 0.1, -0.2, 

   //btr, btl
   0.35, 0.1, -0.2, 
   -0.35, 0.1, -0.2,   
];

let leftWallwireframe = [

   //btl, ftl
   -0.35, 0.1, -0.2,   
   -0.35, 0.1, 0.2, 

   //ftl, ftlw
   // -0.35, 0.1, 0.2, 
   // -0.35001, 0.1, 0.2, 

   //ftlw, btlw
   // -0.35001, -0.1, -0.1, 
   // -0.35001, -0.1, 0.1,

   // //btlw, bblw
   // -0.35001, -0.1, 0.1,
   // -0.35001, -0.3, 0.1,

   // //bblw, ftlw
   // -0.35001, -0.3, 0.1,
   // -0.35001, -0.1, -0.1, 

   // //ftlw, fblw
   // -0.35001, -0.1, -0.1, 
   // -0.35001, -0.3, -0.1,


   // //fblw, bblw
   // -0.35001, -0.3, -0.1,
   // -0.35001, -0.3, 0.1,

   // // //bblw, bbl
   // -0.35001, -0.3, 0.1,
   // -0.35, -0.6, -0.2,

   //ftl, bbl
   -0.35, 0.1, 0.2, 
   -0.35, -0.6, -0.2,
   
   //bbl, fbl
   -0.35, -0.6, -0.2,
   -0.35, -0.6, 0.2,

   // //fbl, ftl
   -0.35, -0.6, 0.2,
    -0.35, 0.1, 0.2, 
];

let frontWallwireframe = [

   //ftl, ftr
   -0.35, 0.1, 0.2,   
    0.35, 0.1, 0.2,

    //ftr, fbl
    0.35, 0.1, 0.2,
    -0.35, -0.6, 0.2,

    //fbl, fbld, 
    -0.35, -0.6, 0.2,
    -0.08, -0.6, 0.2001,    

    //fbld, ftld
    -0.08, -0.6, 0.2001, 
    -0.08, -0.2, 0.2001,    
    
    //ftld, fbrd
    -0.08, -0.2, 0.2001,  
    0.08, -0.6, 0.2001, 

    //fbrd, ftrd
    0.08, -0.6, 0.2001,
    0.08, -0.2, 0.2001,

    //ftrd, ftld
    0.08, -0.2, 0.2001,
    -0.08, -0.2, 0.2001,  

    //ftld, fbrd
    -0.08, -0.2, 0.2001,  
    0.08, -0.6, 0.2001, 

    //fbrd, fbr
    0.08, -0.6, 0.2001, 
    0.35, -0.6, 0.2, 

    //fbr, ftr
    0.35, -0.6, 0.2, 
    0.35, 0.1, 0.2, 
];

let rightWallwireframe = [

   //fbl, btr 
   0.35, -0.6, 0.2,  
   0.35, 0.1, -0.2,  
];

let frontRoofwireframe = [    

   //ftr, ftv
   0.35, 0.1, 0.2,
   0, 0.7, 0,   

   //ftv, ftl
   0, 0.7, 0, 
   -0.35, 0.1, 0.2
];

let backRoofwireframe = [    

   //btl, btv
   -0.35, 0.1, -0.2,
   0, 0.7, 0, 

   //btv, btr
   0, 0.7, 0, 
   0.35, 0.1, -0.2
];

let leftRoofwireframe = [   

   //ftl, tv
   -0.35, 0.1, 0.2,  
   0, 0.7, 0, 

   //tv, btl
   0, 0.7, 0, 
   -0.35, 0.1, -0.2
];

let rightRoofwireframe = [    
   
   //btr, btv
   0.35, 0.1, -0.2,
   0, 0.7, 0, 

   //btv, ftr
   0, 0.7, 0, 
   0.35, 0.1, 0.2,  
];


//CONCATONATE ALL ARRAYS INTO ONE COLOUR ARRAY
coloursArray = coloursArray.concat(frontWallColours, backWallColours, 
                                   leftWallColours, rightWallColours,
                                   frontRoofColours, backRoofColours, 
                                   leftRoofColours, rightRoofColours, 
                                   leftWindowColours, rightWindowColours, bottomWallColours
                                   );

//CONCATONATE ALL ARRAYS INTO ONE VERTEX ARRAY
vertices = vertices.concat(frontWall, backWall, leftWall,rightWall, 
                           frontRoof, backRoof, leftRoof, 
                           rightRoof, leftWindow, rightWindow, bottomWall
                           );

verticeswireframe = verticeswireframe.concat(bottomWallwireframe, backWallwireframe, leftWallwireframe, 
                                             frontWallwireframe, rightWallwireframe, rightRoofwireframe, 
                                             frontRoofwireframe, leftRoofwireframe ); //backWall, leftWall,rightWall,
   

function main(){

   if(!gl1){ alert('Webgl1 is not supported by this browser. Please switch browsers.')};
             
  //CONFIGURE WEBgl1
  gl1.viewport(0, 0, canvas.width, canvas.height);

  //LOAD SHADERS AND INITIALISE ATTRIBUTE BUFFERS

  gl1.useProgram(program);
  gl1.enable(gl1.DEPTH_TEST);

  //LOAD THE DATA INTO THE GPU
  let bufferID = gl1.createBuffer();
  gl1.bindBuffer(gl1.ARRAY_BUFFER, bufferID);
  gl1.bufferData(gl1.ARRAY_BUFFER, flatten(mainVectorArray), gl1.STATIC_DRAW);

  //ASSOSIATE THE SHADER VARIABLES WITH THE DATA BUFFER
  let vPosition = gl1.getAttribLocation(program, "vPosition");
  gl1.vertexAttribPointer(vPosition, 3, gl1.FLOAT, false, 0, 0);
  gl1.enableVertexAttribArray(vPosition);

  let cBuffer = gl1.createBuffer();
  gl1.bindBuffer(gl1.ARRAY_BUFFER, cBuffer);
  gl1.bufferData(gl1.ARRAY_BUFFER, flatten(mainColourArray), gl1.STATIC_DRAW);

  let vColour = gl1.getAttribLocation(program, "vColor");
  gl1.vertexAttribPointer(vColour, 3, gl1.FLOAT, false, 0, 0);
  gl1.enableVertexAttribArray(vColour);

  varloc11 = gl1.getUniformLocation(program, "theta"); 

  //LOAD AXIS HERE TO CHANGE AXIS
  varloc22 = gl1.getUniformLocation(program, "axis"); 

  //render();
}

function render(){

   gl1.uniform1f(varloc11, theta);
      theta += 0.01;

   gl1.uniform1f(varloc22, axis);

   gl1.clear(gl1.COLOR_BUFFER_BIT);
   gl1.drawArrays(type, 0, number); //60 BECAUSE THERE ARE 60 TRIANgl1ES

   window.requestAnimationFrame(render);
}

function changeRadioButtons(){


   if(document.getElementById('x-rotate').checked){

      axis = 0.0;
   }
   
   else if(document.getElementById('y-rotate').checked){
      axis = 1.0;
      //main();  

   }
      
   else if(document.getElementById('z-rotate').checked){
      axis = 2.0;
      //main();  

   }

   else
      axis = 0;
}

function changeModel(){

   if(document.querySelector('#colourmodel').checked){
         mainVectorArray = vertices;
         mainColourArray=coloursArray;
         number = 60;
         type=gl1.TRIANGLES;
         main();  
   }
}

function changeModel1(){

   if(document.getElementById('wireframemodel').checked){
      mainVectorArray = verticeswireframe;
      mainColourArray=coloursArrayWireframe;
      number = 62;
      type= gl1.LINE_STRIP;
      main();
   }
}

