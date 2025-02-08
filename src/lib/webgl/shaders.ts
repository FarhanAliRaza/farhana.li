export const vertexShader = `
    attribute vec3 a_position;
    uniform mat4 u_matrix;
    uniform float u_scale;
    uniform mediump float u_z_offset;
    varying mediump float v_z;
    varying mediump float v_gradient;
    float near = -0.5;
    float far = 1.0;
    
    void main() {
        vec4 transformed_position = u_matrix * vec4(a_position, 1.0);
        gl_Position = transformed_position;
        gl_PointSize = u_scale;
        float z = (transformed_position.z + u_z_offset);
        v_z = clamp((far - z) / (far - near), 0.0, 1.0);
        v_gradient = a_position.y / 2.0 + 0.5;
    }
`;

export const fragmentShader = `
    precision mediump float;
    varying float v_z;
    varying float v_gradient;
    uniform vec3 u_color_top;
    uniform vec3 u_color_bottom;
    
    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5, 0.5);
        float dist = length(coord);
        if (dist > 0.5) {
            discard;
        }
        vec3 color = mix(u_color_bottom, u_color_top, v_gradient);
        float alpha = max(0.3, v_z);
        gl_FragColor = vec4(color * alpha, alpha);
    }
`;
