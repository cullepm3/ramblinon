
(function(){
window.NYTD = NYTD || {};
NYTD.NYTMM = NYTD.NYTMM || {};
NYTD.NYTMM.InfoTable = Class.create({
initialize: function(itemData, container) {
this.data = itemData;
this.container = $(container)
this.rounds = ["REGION","SEED","TEAM","ROUND OF 32", "ROUND OF 16", "ELITE 8", "FINAL 4", "FINALS", "CHAMPIONS"];
this.teams = [];
this.probs = [];
this.lastSort = {column:-1, descending:true}
//			for (var i = 0; i < this.teams.length; i++) {
//				var chance = 1
//				for (var j = 0; j < this.rounds.length; j++) {
//					chances.push(chance.toFixed(2))
//				this.probs.push(chances)
var clean = function(s) {
//			if (Number(s>.9)) return 1
if (s.indexOf('E-')>=0 || (s < 0.000001 && s>0) ) {
return 0.000001;
}
else {
return s;
}
}
var cleanSeed = function(s) {
var mark = Math.max(s.indexOf('a'),s.indexOf('b'));
if ( mark >= 0) {
return (s.substring(0,mark))
}
else {
return s;
}
}
for (var i = 0; i < this.data.length; i++) {
var t = this.data[i];
this.teams.push(t.team_name);
this.probs.push([t.team_region, cleanSeed(t.team_seed), t.team_name, clean(t.rd2_win), clean(t.rd3_win), clean(t.rd4_win), clean(t.rd5_win), clean(t.rd6_win), clean(t.rd7_win)]);
}
this.sortOnColumn(1,false);
this.sortOnColumn(1,false);
this.sortOnColumn(0,true)
//			this.sortOnColumn(8,true)
},
draw: function() {
this.container.update()
var table = new Element('table');
var tbody = new Element('tbody')
table.insert(tbody);
this.container.insert(table)
var cellWidth = ((950 - 140) / this.rounds.length) + 'px'
for (var i = -1; i < this.teams.length; i++) {
var teamData = this.probs[Math.max(i,0)]
var row = new Element('tr');
tbody.insert(row);
if (i==-1) {
row.addClassName('columnLabel');
}
else {
row.addClassName('dataRow');
}
for (var j = 0; j<teamData.length; j++) {
if (i==-1) {
var cell = new Element('th');
row.insert(cell)
cell.update(this.rounds[j]);
cell.observe('click', this.onHeaderClick.bindAsEventListener(this,j));
if (j <= 2 ) {
cell.addClassName('topLeft')
}
else {
cell.addClassName('topRight')
}
}
else {
if (j==0) {
var cell = new Element('th', {'class':'regionLabel'});
cell.update(teamData[j] );
row.insert(cell);
}
else if (j==1) {
var cell = new Element('th', {'class':'seedLabel'});
cell.update(teamData[j] );
row.insert(cell);
}
else if (j==2) {
var cell = new Element('th', {'class':'rowLabel'});
cell.update(teamData[j] );
row.insert(cell);
}
else {
var cell = new Element('td');
row.insert(cell)
var chance = teamData[j];
if (chance == 1) {
chance = 'WON';
}
else if (chance == 0) {
chance = 'LOST';
}
else if (chance < .001) {
chance = "<0.1";
}
else {
chance = (Math.round(chance*1000)/10).toFixed(1)
if (j==3 && i==0) {
cell.update(chance + '%');
}
}
cell.update(chance)
cell.setStyle({color: this.getColor(teamData[j]), backgroundColor:this.getBgColor(teamData[j]) })
}
}
}
}
},
onHeaderClick: function(e, x) {
this.sortOnColumn(x, true);
},
sortOnColumn: function(colNum, andDraw) {
var that = this;
var sortFunc = function(a,b) {
var x = a[colNum];
var y = b[colNum]
if (colNum != 0 && colNum != 2) {
x = parseFloat(x);
y = parseFloat(y);
}
if (x < y) {
return 1;
}
else if (x > y) {
return -1
}
else {
var a = a[that.lastSort.column];
var b = b[that.lastSort.column]
if (that.lastSort.column == 1) {
a = parseInt(a);
b = parseInt(b);
}
var reverse = (that.lastSort.descending ? 1 : -1);
if (a < b) {
return reverse * 1;
}
else if (a > b) {
return reverse * -1;
}
return 0
}
};
this.probs.sort(sortFunc);
if (colNum == this.lastSort.column && this.lastSort.descending == true) {
this.probs.reverse();
this.lastSort.descending = false;
}
else {
this.lastSort.descending = true;
}
this.lastSort.column = colNum;
if (andDraw) {
this.draw()
var cell = this.container.down('.columnLabel th',(colNum));
cell.update((this.lastSort.descending ? '&#9650;' : '&#9660;') + ' ' + this.rounds[colNum]);
}
},
getColor: function(percent) {
if (percent < .001) {
return '#AAAAAA';
}
else if (percent < .75) {
return '#000000';
}
else {
return '#FFFFFF';
}
},
getBgColor: function(percent) {
if (percent == 1) {
return '#004276';
}
else if (percent > .75) {
return '#6883bd';
}
else if (percent > .60) {
return '#879fcd';
}
else if (percent > .45) {
return '#bcd3ea';
}
else if (percent > .30) {
return '#e7eaf1';
}
else if (percent > .15) {
return '#ebebeb';
}
else if (percent > .001) {
return '#f8f8f8';
}
else {
return '#fdfdfd';
}
}
})
new NYTD.NYTMM.InfoTable(nytint_data_vault, "nytmm");
})();
