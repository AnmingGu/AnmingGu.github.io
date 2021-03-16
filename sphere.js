var light=[30,30,-50],gR,gk,gambient;
 
function normalize(v){
	var len=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
	v[0]/=len;
	v[1]/=len;
	v[2]/=len;
	return v;
}
 
function dot(x,y){
	var d=x[0]*y[0]+x[1]*y[1]+x[2]*y[2];
	return d<0?-d:0;
}
 
function draw_sphere(R,k,ambient){
	var i,j,intensity,b,vec,x,y,cvs,ctx,imgdata,idx;
	cvs=document.getElementById("c");
	ctx=cvs.getContext("2d");
	cvs.width=cvs.height=2*Math.ceil(R)+1;
	imgdata=ctx.createImageData(2*Math.ceil(R)+1,2*Math.ceil(R)+1);
	idx=0;
	for(i=Math.floor(-R);i<=Math.ceil(R);i++){
		x=i+.5;
		for(j=Math.floor(-R);j<=Math.ceil(R);j++){
			y=j+.5;
			if(x*x+y*y<=R*R){
				vec=[x,y,Math.sqrt(R*R-x*x-y*y)];
				vec=normalize(vec);
				b=Math.pow(dot(light,vec),k)+ambient;
				intensity=(1-b)*256;
				if(intensity<0)intensity=0;
				if(intensity>=256)intensity=255;
				imgdata.data[idx++]=imgdata.data[idx++]=255-~~(intensity); //RG
				imgdata.data[idx++]=imgdata.data[idx++]=255; //BA
			} else {
				imgdata.data[idx++]=imgdata.data[idx++]=imgdata.data[idx++]=imgdata.data[idx++]=255; //RGBA
			}
		}
	}
	ctx.putImageData(imgdata,0,0);
}
 
light=normalize(light);