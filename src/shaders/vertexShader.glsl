uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vMP;

// we dont have random number in GLSL this is kindof random enough for this usage
//returns value from 0.0 -> 1.0
float random2D(vec2 value){
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // position is automattcially provided by glsl
    vec4 modelPosition = modelMatrix * vec4(position,1.0);


    //Glitch effect

    float glitchTime = uTime - modelPosition.y;
    
    //based on y value translate that to sin making it look like a wave over time vertically
    // add multiple to make temp less regular and seem more random wave times and also have different strengths of wave
    float glitchStrength = sin(glitchTime) + sin(glitchTime*3.5) + sin(glitchTime*8.76); 
    glitchStrength/=3.0;
    // this makes it smoother transitioins making it sharper at strong and 0 at weak
    //when glitch strnegth > 0.3 set to 0
    glitchStrength = smoothstep(0.3,1.0,glitchStrength);



    glitchStrength *= 0.25;


    // we need to use utime otherwise it always picks the same random number
    // making it not move
    modelPosition.x += (random2D(modelPosition.xz + uTime) -0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) -0.5) * glitchStrength;
    //-.5 is to shift the random ness from 0-1 to -.5 to .5



    //final position 
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Note the uv value is hidden by magic here we want to pass the uv mapping to frag shader
    // So we are adding a varying to pass the value to the frag shader

    // Varryings
    vUv = uv;
    // using 0 makes sure we dont apply scale translate and scale to the normal
    // we dont want the normal changing but we do want its position with the model to be updated
    vec4 modelNormal = modelMatrix * vec4(normal,0.0);
    vNormal = modelNormal.xyz;
    vMP = modelPosition.xyz;

}