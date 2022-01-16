window.onload=function(){
p=document.getElementsByTagName('pre')[0]
b=eval(p.innerHTML)
p.style.display='none'

avg=function(x){
  m=0
  t=0
  for (i in x){
    if (x[i]!='DNF')
    {
      m+=x[i]
      t++
    }
  }
  return (m/t).toFixed(2)
}

a=[]

for (i in b){
  a.push([b[i][0],avg(b[i][1])])
}

w=window.innerWidth
h=window.innerHeight

marginDown = 35
marginLeft = 65

f=(a[a.length-1][0]-a[0][0]) / (w - marginLeft)
s=5
t=(h - marginDown) / 140

document.body.setAttribute('style','overflow:hidden;margin:0')

canvas=document.getElementById('canvas')
canvas.width=w
canvas.height=h
ctx=canvas.getContext("2d")

ctx.fillStyle='white'
ctx.fillRect(0,0,w,h)
ctx.fillStyle='black'
ctx.font='14px verdana'

D=document.lastModified.split(' ')
DD=D[0].split('/')

ctx.fillText('Última atualização: ' + DD[1] + '/' + DD[0] + '/' + DD[2] + ' ' + D[1],w-300,20)

months=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

dateArray=function(x){
  d=new Date(x*1000)
  return [d.getFullYear(),d.getMonth(),d.getDate()]
}

lastM=lastY='lol'
for (x=a[0][0];x<a[a.length-1][0];x+=86400)
{
  m=((x-a[0][0])/f)+ marginLeft
  d=dateArray(x)
  if (d[1]!=lastM) {
    if (d[0]!=lastY){
      u=2
      ctx.font='18px verdana'
      ctx.fillText(d[0],m+2,h-20)      
    }
    else {
      u=0.5
    }
    ctx.font='10px verdana'
    ctx.fillText(months[d[1]],m+2,h-10)
    ctx.fillRect(m,0,u,h)
    lastM=d[1]
  }
  lastY=d[0]
}

ctx.fillStyle='red'

for (i in a){
  m = ((a[i][0] - a[0][0])/f) + marginLeft
  lol = h - marginDown - a[i][1]*t
  ctx.fillRect(m-s/2,lol-s/2,s,s)
  if (i) ctx.lineTo(m,lol)
  else ctx.moveTo(m,lol)
}
ctx.stroke()

toMin=function(x){return x>60?parseInt(x/60) + ':' + (x%60).toFixed(2):x.toFixed(2)}

ctx.font='13px verdana'
ctx.fillStyle='black'
for (x=140;x>=0;x-=10){
  Y=h-marginDown-x*t
  time = toMin(x)
  ctx.beginPath()
  ctx.moveTo(0,Y)
  ctx.lineTo(w,Y)
  ctx.stroke()
  if (x) ctx.fillText(toMin(x),8,Y-2)
}

k=document.getElementsByTagName('span')[0]

function todata(s){return s[2]+'/'+months[s[1]]+'/'+s[0]}

}