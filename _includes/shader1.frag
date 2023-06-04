vec2 position;
uniform float u_time;
uniform float u_mouse_velocity;
uniform vec2 u_resolution;

uniform sampler2D u_sdf1;
uniform sampler2D u_sdf2;
uniform sampler2D u_sdf3;

#define M_PI 3.14159265358979323846

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
	float unit = u_resolution.x/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(M_PI*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}

float circle(vec2 p, float r) {
    return length(p) - r;
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdBlobbyCross( in vec2 pos, float he )
{
    pos = abs(pos);
    pos = vec2(abs(pos.x-pos.y),1.0-pos.x-pos.y)/sqrt(2.0);

    float p = (he-pos.y-0.25/he)/(6.0*he);
    float q = pos.x/(he*he*16.0);
    float h = q*q - p*p*p;
    
    float x;
    if( h>0.0 ) { float r = sqrt(h); x = pow(q+r,1.0/3.0)-pow(abs(q-r),1.0/3.0)*sign(r-q); }
    else        { float r = sqrt(p); x = 2.0*r*cos(acos(q/(p*r))/3.0); }
    x = min(x,sqrt(2.0)/2.0);
    
    vec2 z = vec2(x,he*(1.0-2.0*x*x)) - pos;
    return length(z) * sign(z.y);
}

float sdCross( in vec2 p, in vec2 b, float r ) 
{
    
    p = abs(p); p = (p.y>p.x) ? p.yx : p.xy;
    vec2  q = p - b;
    float k = max(q.y,q.x);
    vec2  w = (k>0.0) ? q : vec2(b.y-p.x,-k);
    return sign(k)*length(max(w,0.0)) + r;
}

float sdVesica(vec2 p, float r, float d)
{
    p = abs(p);
    float b = sqrt(r*r-d*d);
    return ((p.y-b)*d>p.x*b) ? length(p-vec2(0.0,b))
                             : length(p-vec2(-d,0.0))-r;
}

const float PI = 3.1415926535;
float atan2(in float y, in float x)
{
    return atan(y, x);
    bool s = (abs(x) > abs(y));
    // return mix(PI/2.0 - atan(x,y), atan(y,x), float(s))
    if (s) {
    	return PI/2.0 - atan(x,y);
    } else {
        return atan(y,x);
    }
}

float remap(float low1, float high1, float low2, float high2, float value) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

vec2 translate(vec2 position, vec2 offset) {
    return position - offset;
}

float linstep(float start, float end, float value) {
    return clamp((value - start) / (end - start), 0.0, 1.0);
}

float pixellize(float value, float size) {
    return floor(value * size) / size;
}
vec2 pixellize(vec2 value, float size) {
    return floor(value * size) / size;
}

vec3 border(float dist) {
    vec3 outside_color = vec3(0.585,0.371,0.161);
    vec3 inside_color = vec3(0.062,0.395,0.490);
    vec3 border_color = vec3(1.000,1.000,1.000);
    vec3 black = vec3(0., 0., 0.);
    
    float boundary_size = 0.006;
    float delta = 0.001;

    vec3 col1 = vec3(0.,0.,0.);;
    vec3 col2 = vec3(0.,0.,0.);
    vec3 col3 = vec3(0.,0.,0.);
    // col1 = outside_color * smoothstep(0., boundary_size, -dist);
    col2 = border_color
        * (1.0 - smoothstep(boundary_size-delta, boundary_size, dist))
        * (1.0 - smoothstep(-boundary_size+delta, -boundary_size, dist));
    // col3 = inside_color * smoothstep(0., boundary_size, dist);
    
    col1 = mix(col1, black, sin(dist*300. + -u_time*5.));
    col3 = mix(col3, black, sin(dist*300. + u_time*5.));
        
    vec3 color = col1  + col2 + col3;
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //st.x *= u_resolution.x/u_resolution.y;

    st = pixellize(st, 4000.);

    vec3 color = vec3(0.);
    
    vec2 position = st+vec2(-0.5,-0.5);
    
    vec2 offset = vec2(-0.00,0.000);
    position -= offset;
    
    float theta = 0.;
    mat2 rotation = mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
    position *= rotation;
    
    float scale = 1.;
    position *= scale;
    
    float angle = atan2(position.x, position.y);
    float angle_scaled = (angle+PI)/(2.*PI);
    float radius = length(position);

    float dist;

    float radial_offset1 = (sin(angle_scaled*PI*20.+u_time*3.)+1.)/4.;
    float radial_offset2 = (sin(1.+angle_scaled*PI*40.+u_time*3.)+1.)/4.;
    float radial_offset3 = (sin(2.+angle_scaled*PI*80.+u_time*3.)+1.)/4.;
    float radial_offset4 = (sin(3.+angle_scaled*PI*160.+u_time*3.)+1.)/4.;
    radial_offset4 *= (u_mouse_velocity) * 0.09;
    float radial_offset =  radial_offset1 + radial_offset2 + radial_offset3 + radial_offset4;
    radial_offset *= (sin(-angle+u_time*0.5) + sin(-angle*2.+u_time*0.5))*0.5;
    position += position*radial_offset*0.120;

    float circle = circle(position, 0.35);
    float cross = sdBlobbyCross(position, 0.560);
    float vesica = sdVesica(position, 0.5, 0.45);

    dist = mix(vesica, cross, remap(-1., 1., 0., 1., sin(u_time + position.y / 100.)));
    //dist += remap(-1., 1., 0., 1., sin(angle * 24. + u_time * 5.)) * (u_mouse_velocity+10.)* 0.005;
    //dist += remap(-1., 1., 0., 1., sin(angle * 48. + u_time * 5.)) * (u_mouse_velocity+10.)* 0.005;
    //dist += remap(-1., 1., 0., 1., sin(angle * 12. + u_time * 5.)) * (u_mouse_velocity+10.)* 0.005;
    
    color = border(dist);
    color = 1. - color;
    gl_FragColor = vec4(color, 1.0);
    return;


    vec2 pos_for_tex = st;
    pos_for_tex.y = 1. - pos_for_tex.y;
    float sdf1 = texture2D(u_sdf1, pos_for_tex)[0];
    float sdf2 = texture2D(u_sdf2, pos_for_tex)[0];
    float sdf3 = texture2D(u_sdf3, pos_for_tex)[0];

    float shape1;
    float shape2;
    float lerp_value;

    const int timeline_size = 7;
    float shapes[timeline_size] = float[timeline_size](sdf1, sdf2, sdf2, sdf3, sdf3, sdf1, sdf1);
    float times[timeline_size]  = float[timeline_size](0.,   2.,  4.,  6.,   8.,   10.,  12.);

    float timestamp = u_time;
    timestamp += st.y;
    timestamp = mod(timestamp, times[timeline_size - 1]);

    for (int i = 0; i < timeline_size - 1; i++) {
        float this_shape = shapes[i];
        float next_shape = shapes[i+1];
        float this_time = times[i];
        float next_time = times[i+1];
        if (timestamp >= this_time && timestamp < next_time) {
            lerp_value = smoothstep(this_time, next_time, timestamp);
            //lerp_value = linstep(this_time, next_time, timestamp);
            shape1 = this_shape;
            shape2 = next_shape;
        }
    }

    /* shape1 += pNoise(position, 19) * 9.; */
    /* shape2 += pNoise(position, 19) * 9.; */
    /* gl_FragColor = vec4(vec3(pNoise(position * 20., 19)) + 0.5, 1.); */
    /* return; */

    dist = mix(shape1, shape2, lerp_value);
    
    float clamped_dist = smoothstep(0.49, 0.51, dist);
    color = vec3(clamped_dist);

    gl_FragColor = vec4(color,1.0);
}

