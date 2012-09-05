/* AG-develop 12.7.1-401 (2011-12-07 17:23:16 UTC) */
rsinetsegs=['H07707_10208','H07707_10257','H07707_10921','H07707_10769','H07707_11001','H07707_11017','H07707_11018','H07707_11028','H07707_11029','H07707_11030','H07707_11031','H07707_11036','H07707_11037','H07707_11038','H07707_11044','H07707_11046','H07707_11048','H07707_11049','H07707_11063','H07707_11087','H07707_11100','H07707_11103','H07707_11138','H07707_10638'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
for(x=0;x<rsinetsegs.length;++x){if(!rsiPat.test(rsinetsegs[x]))rsiSegs+='|'+rsinetsegs[x];}
document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['H07707_10208','H07707_10257','H07707_10921','H07707_10769','H07707_11001','H07707_11017','H07707_11018','H07707_11028','H07707_11029','H07707_11030','H07707_11031','H07707_11036','H07707_11037','H07707_11038','H07707_11044','H07707_11046','H07707_11048','H07707_11049','H07707_11063','H07707_11087','H07707_11100','H07707_11103','H07707_11138','H07707_10638'],'h07707');}