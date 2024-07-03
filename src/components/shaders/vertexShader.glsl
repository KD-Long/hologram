uniform float uTime;
varying vec2 vUv;
varying vec3 vMP;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    //final position 
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Note the uv value is hidden by magic here we want to pass the uv mapping to frag shader
    // So we are adding a varying to pass the value to the frag shader

    // Varryings
    vUv = uv;
    vMP = modelPosition.xyz;

}