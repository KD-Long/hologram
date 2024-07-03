uniform float uTime;
varying vec2 vUv; // this is the uv mapping from vertex shader (the coordinate of the pixel x-y)
varying vec3 vMP; // model position passed vron vertex shader 

void main() {


    // vvvvvvvv STRIPES

    float stripes = vMP.y - uTime*0.05;
    // expands y range from 0-1.0 to 0-10.0 and divides in 10 slices
    stripes= mod(stripes*10.0,1.0);

    // makes the darks darker to make sharper effect
    // essentially we are focing all the low values closer to 1.0 (black)
    // so the transition from black to white is faster
    stripes=pow(stripes,3.0);

    // ^^^^^^^^ STRIPES



    //final color
    gl_FragColor = vec4(1.0,1.0,1.0, stripes);
    // gl_FragColor = vec4(1,0,1, 1);



    // this enables on runtime from renderer
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    //color will look strange if this is not included
}