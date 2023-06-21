uniform vec2 u_resolution;
uniform float u_time;

float remap(float low1, float high1, float low2, float high2, float value) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

float ln(vec2 a, vec2 b, float n) {
    return pow(pow(abs(a.x - b.x), n) + pow(abs(a.y - b.y), n), 1. );
}

void voronoi() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.;
    
    vec2 points[8];
    points[0] = vec2(0.460,0.630) * 10.;
    points[1] = vec2(0.210,0.740) * 10.;
    points[2] = vec2(0.750,0.780) * 10.;
    points[3] = vec2(0.220,0.180) * 10.;
    points[4] = vec2(0.220,0.230) * 10.;
    points[5] = vec2(1.000,0.430) * 10.;
    points[6] = vec2(0.690,0.180) * 10.;
    points[7] = vec2(0.630,0.820) * 10.;

    vec3 colors[8];
    colors[0] = vec3(1.0, 0.0, 0.0);
    colors[1] = vec3(0.0, 1.0, 0.0);
    colors[2] = vec3(0.0, 0.0, 1.0);
    colors[3] = vec3(1.0, 1.0, 0.0);
    colors[4] = vec3(1.0, 0.0, 1.0);
    colors[5] = vec3(0.0, 1.0, 1.0);
    colors[6] = vec3(1.0, 1.0, 1.0);
    colors[7] = vec3(0.0, 0.5, 0.6);

    vec3 color = vec3(0.);
    float dist;
    vec2 point;

    for (int i = 0; i < 8; i++) {
        
        float l1 = ln(st, points[i], 1.0);
        float l2 = ln(st, points[i], 2.0);
        float l3 = ln(st, points[i], 3.0);
        float l4 = ln(st, points[i], 4.0);
        float l8 = ln(st, points[i], 8.0);
        float l10 = ln(st, points[i], 10.0);
        float l50 = ln(st, points[i], 50.0);
        float l100 = ln(st, points[i], 100.0);
            
        float d = l2;
        
        if (i == 0) {
            point = points[0];
            color = colors[0];
            dist = d;
        }
        
        if (d < dist) {
            point = points[i];
            dist = d;
            color = colors[i];
        }
    }

    //for (int i = 0; i < 4; i++) {
    //    if (distance(st, points[i]) < 0.09) {
    //        color = vec3(0.0);
    //    }
    //}
    for (int i = 0; i < 8; i++) {
        if (distance(st, points[i]) < 0.1) {
            color = vec3(0.0);
        }
    }

    gl_FragColor = vec4(color, 1.0);
}

void main() {
    voronoi();
}

