uniform float u_time;

attribute vec3 position0;
attribute vec3 position2;
attribute vec3 position3;
attribute vec3 position4;

float remap(float low1, float high1, float low2, float high2, float value) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

#define PI 3.1415926535897932384626433832795
float easeInOutElastic(float x) {
    float c5 = (2. * PI) / 4.5;

    if (x == 0.) {
        return 0.;
    }
    if (x == 1.) {
        return 1.;
    }
    if (x < 0.5) {
        return -(pow(2., 20. * x - 10.) * sin((20. * x - 11.125) * c5)) / 2.;
    }
    if (x >= 0.5) {
        return (pow(2., -20. * x + 10.) * sin((20. * x - 11.125) * c5)) / 2. + 1.;
    }

    //return x == 0.
    //  ? 0.
    //  : x == 1.
    //  ? 1.
    //  : x < 0.5
    //  ? -(pow(2, 20. * x - 10.) * sin((20. * x - 11.125) * c5)) / 2.
    //  : (pow(2, -20. * x + 10.) * sin((20. * x - 11.125) * c5)) / 2. + 1.;
}

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

void main() {
    vec3 position1 = position;

    const int KEYFRAMES = 11;
    vec3 shapes[KEYFRAMES] = vec3[](
        position0,
        position0,
        position1,
        position1,
        position2,
        position2,
        position3,
        position3,
        position4,
        position4,
        position1
    );
    float timestamps[KEYFRAMES] = float[](
        -1.5,
        -0.5,
         0.0,
         1.0,
         1.5,
         2.5,
         3.0,
         4.0,
         4.5,
         5.5,
         6.0
    );

    float end_time = timestamps[KEYFRAMES - 1];

    float time = u_time;
    time /= 2.0;
    time += float(gl_VertexID) / 1000.0;
    //time += mod(float(gl_VertexID), 2.) * 0.2;
    // offset time to allow for inital animation
    time += timestamps[0];

    // mod by time to make animation loop continuously
    if (time > 0.) {
        time = mod(time, end_time);
    }

    vec3 shape1;
    vec3 shape2;
    float progress;

    for (int i = 0; i < KEYFRAMES - 1; i++) {
        float this_time = timestamps[i];
        float next_time = timestamps[i + 1];

        if (time >= this_time && time < next_time) {
            shape1 = shapes[i];
            shape2 = shapes[i + 1];
            progress = remap(this_time, next_time, 0., 1., time);
            //progress = easeInOutElastic(progress);
            progress = exponentialInOut(progress);
            break;
        }
    }

    gl_Position = vec4(mix(shape1, shape2, progress), 1.);

    gl_PointSize = 2.0;
}
