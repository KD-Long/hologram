uniform float uTime;

varying vec3 vNormal;
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
    // using 0 makes sure we dont apply scale translate and scale to the normal
    // we dont want the normal changing but we do want its position with the model to be updated
    vec4 modelNormal = modelMatrix * vec4(normal,0.0);
    vNormal = modelNormal.xyz;
    vMP = modelPosition.xyz;

}