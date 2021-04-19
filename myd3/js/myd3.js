const svg_width = 1000;
const svg_height = 500;

const svg = d3.select('#svg_part')
	.style('margin-top', '20px')
	.attr('width', svg_width)
	.attr('height', svg_height);
	
data = [23, 45, 43, 12, 44, 39, 28]
	
const margin = {top: 60, right: 30, bottom: 60, left: 200};
const innerWidth = svg_width - margin.left - margin.right;
const innerHeight = svg_height - margin.top - margin.bottom;

const g = svg.append('g').attr('id', 'group_part').attr('transform', `translate(${margin.left}, ${margin.top})`);

const gap = 10;

// 初始化
function init(){
	rect_height = innerHeight/data.length-gap;
	i = 0
	data.forEach(d => {
				 i += 1;
	             g.append('rect')
	              .attr('width', (innerWidth/d3.max(data))*d)
	              .attr('height', rect_height)
	              .attr('fill', '#56B6C2')
	              .attr('y', i * (rect_height + gap))
				  
				g.append('text')
					.attr('class', 'values')
					.attr('x', -30)
					.attr('y', i * (rect_height + gap)+rect_height/1.5)
					.attr('fill', 'black')
					.text(d)
	         });
	
	g.append('text').text('Bar Charts').attr('font-size', '22px').attr('transform', `translate(${innerWidth/2}, ${-36})`).attr('text-anchor', 'middle');
	g.append('text').attr('style', 'white-space:pre').text('姓名：白文杰        学号：3018216031       ').attr('font','console').attr('font-size', '16px').attr('transform', `translate(${innerWidth/2+10}, ${-10})`).attr('text-anchor', 'middle');
	 
}

// 排序
function sort(){
	//比较函数，否则sort排序会出错
	var compare = function (x, y) {
	    if (x < y) {
	        return -1;
	    } else if (x > y) {
	        return 1;
	    } else {
	        return 0;
	    }
	}
	data = data.sort(compare);
	update_data(data);
}

// 打乱
function shuffle(){
	data = d3.shuffle(data);
	update_data(data);
}

//删除最后一个
function delete_last_one(){
	data = data.slice(0, data.length-1);
	update_data(data);
}

// 随机添加一个
function add_one(){
	var add_value = Math.floor(Math.random()*100);
	data.push(add_value);
	update_data(data);
}

function update_data(data){
	rect_height = innerHeight/data.length-gap;
	console.log('现在的数组：'+data);
	rects = g.selectAll('rect').data(data);
	text = g.selectAll('.values').data(data);
	update = rects;
	enter = rects.enter();
	exit = rects.exit();
	
	// update.attr()
	
	enter.append('rect').transition()
		.attr('width', function(d){
			return (innerWidth/d3.max(data))*d;
		})
		.attr('height', rect_height)
		.transition()
		.duration(500)
		.attr('fill', 'green')
		.attr('y', function(d, i){
			return i * (rect_height + gap);
		})
		.duration(1360);
	
	update.transition()
		.attr('width', function(d){
			return (innerWidth/d3.max(data))*d;
		})
		.attr('height', rect_height)
		.attr('fill', '#56B6C2')
		.attr('text', d => d)
		.attr('y', function(d, i){
			return i * (rect_height + gap);
		})
		
		// .attr("fill","steelblue")
		.duration(1360);
		
	exit.transition().remove().duration(1360*0.3);
	
	update = text;
	enter = text.enter();
	exit = text.exit();
	
	enter.append('text').transition()
		.attr('class', 'values')
		.attr('x', -30)
		.attr('y', function(d, i){return i * (rect_height + gap)+rect_height/1.5})
		.attr('fill', '#56B6C2')
		.text(function(d){return d})
		.duration(1360*1);
		
	update.transition()
		.attr('y', function(d, i){return i * (rect_height + gap)+rect_height/1.5})
		.attr('fill', '#56B6C2')
		.text(function(d){return d})
		.duration(1360*1.3);
		
	exit.transition().remove().duration(1360*0.3);
}

init();
