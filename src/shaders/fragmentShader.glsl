uniform float uTime;
uniform vec3 uColor;

varying vec3 vNormal;
varying vec2 vUv; // this is the uv mapping from vertex shader (the coordinate of the pixel x-y)
varying vec3 vMP; // model position passed vron vertex shader 

void main() {

    // vvvvvvvv STRIPES

    float stripes = vMP.y - uTime * 0.05;
    // expands y range from 0-1.0 to 0-10.0 and divides in 10 slices
    stripes = mod(stripes * 10.0, 1.0);

    // makes the darks darker to make sharper effect
    // essentially we are focing all the low values closer to 1.0 (black)
    // so the transition from black to white is faster
    stripes = pow(stripes, 3.0);

    // ^^^^^^^^ STRIPES

    // vvvvvvvvv Fresnel effect (brighter around the edges)

    // interpolated normals are sometimes less than 1 causing weird pattern
    // normalise to mak sure
    vec3 normal =normalize(vNormal);

    // check back facing and invert normal fixing effect
    if(!gl_FrontFacing){
        normal*=-1.0;
    }
    

    // force vector length to 1 with normalize
    vec3 viewDirection = normalize(vMP - cameraPosition);

    // dotproduct returns 
    // 1 when in same direction 
    // 0 when perpendicular
    // -1 when oposite
    float fresnel = dot(viewDirection, normal) + 1.0;
    // we are adding 1.0 to change the range from -1 ->1 to 0 ->2

    // push brighter on the sides darker in middle
    fresnel = pow(fresnel,2.0);

    // ^^^^^^^ Fresnel effect
 

    // fall off to 0 on edge of holo
    float falloff = smoothstep(0.8,0.0,fresnel);

    float holographic = fresnel * stripes;
    // amplify fresnel effect compared to stripes
    holographic+= fresnel*1.25;
    holographic*= falloff;




    //final color
    gl_FragColor = vec4(uColor, holographic);

    // this enables on runtime from renderer
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    //color will look strange if this is not included
}