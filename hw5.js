



document.addEventListener('DOMContentLoaded', function () {


  Promise.all([d3.csv('flights_space.csv'),
  d3.csv('dogs_space.csv')])
    .then(function (values) {

      flights =values[0]
      dogs=values[1]

      draw();
    })

});


function draw() 
{

   
  // console.log(flights)
   let svgSimple = d3.select('#svg-circular');
   let svgWidth = svgSimple.node().clientWidth + 100;
   let svgHeight = svgSimple.node().clientHeight - 100;
   
  console.log(flights)

 
let nodes = dogs

nodes.push({rocket:"R-5A",altitude:451,name_latin:"R-5A",date:"1958-02-21 1958-08-27  1958-02-21"});
nodes.push({rocket:"R-1V",altitude:100,name_latin:"R-1V",date:"1951-07-22 1951-08-19"});
nodes.push({rocket:"R-1B",altitude:100,name_latin:"R-1B",date:"1951-07-29 1951-08-15 1951-08-28 1951-09-03"});
nodes.push({rocket:"R-1D",altitude:100,name_latin:"R-1D",date:"1951-06-26 1954-07-02 1954-07-07"});





let simulation1 = d3.forceSimulation()
.nodes(nodes);

simulation1.force('charge',d3.forceManyBody()) 
.force('collide', d3.forceCollide())
.force('center', d3.forceCenter( svgWidth/2, svgHeight/2 ));  



 //for div1          
let simpleNodes = svgSimple.selectAll('.node')
//.data(nodes)
.join('circle')
.classed('node',true)
.style('fill', d => d.gender == 'Male' ? 'khaki' : 'paleturquoise' )
.attr('r', 20);

           
let simpleLabels = svgSimple.selectAll('.node-label')
                                      //.data(nodes)
                                      .join('text')
                                      .classed('node-label', true)
                                      .text(d => d.name_latin)





let links =[]

for(var i=0;i<flights.length;i++)
{

  links.push({source :flights[i]["dog1"],target:flights[i]["dog2"],type_link:"dog"}) // latin name in link force1

  links.push({source :flights[i]["rocket"],target:flights[i]["dog1"],type_link:"flight"})
  links.push({source :flights[i]["rocket"],target:flights[i]["dog2"],type_link:"flight"})
  

  

}
// console.log("====="+links)


let linkForce1 = d3.forceLink(links)
.id(d =>  d.name_latin);

simulation1.force('links', linkForce1)
.on('tick', updateLayout2);

let simpleLinks = svgSimple.selectAll('.link')
//.data(links)
.join('line')
.classed('link',true);

// And an updated layout function
function updateLayout2() {
simpleNodes.attr('cx', d => d.x)
.attr('cy', d => d.y);
simpleLabels.attr('x', d => d.x)
.attr('y', d => d.y);
simpleLinks.attr('x1', d => d.source.x)
.attr('y1', d => d.source.y)
.attr('x2', d => d.target.x)
.attr('y2', d => d.target.y);
}





let svgCircular = d3.select('#svg-circular');  
let circularG = svgCircular.append('g')
                        .attr('transform', `translate(${svgWidth/2},${svgHeight/2})`)

let radius = (svgHeight-60) / 2;

let radius_inner = (svgHeight-60) / 4;


// Calculate the positions of each node
let polarScale = d3.scaleLinear()
                    .domain([0, nodes.length-4])
                    .range([0, 2 * Math.PI]);



let polarScale_inner = d3.scaleLinear()
                    .domain([0, 4])
                    .range([0, 2 * Math.PI]);


// Convert from polar to cartesian coordinates
// x = r cos Θ
//  y = r sin Θ
nodes.forEach((d,i) => {
    let theta = polarScale(i);
    let theta1 = polarScale_inner(i);

       d.theta = theta;
      if("rocket" in d)
      {
          radius=radius_inner
          theta=theta1


      }

     

    d.polarX = radius * Math.cos(theta);
    d.polarY = radius * Math.sin(theta)

    console.log(d.name_latin+"=="+ d.polarX+"=="+ d.polarY)



});




//LEGEND






d3.select("#svg-circular")
            .append("svg:image")
            .attr("xlink:href", "svg_icons/ma1.svg")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x", 1128)
            .attr("y",53);

   d3.select("#svg-circular")
            .append("text")
            .text("MALE SURVIVED ")
            .style("font-weight","bold")

            .attr("x", 1128)
            .attr("y",53);            


/////////////////////////////////////////////////
 d3.select("#svg-circular")
            .append("svg:image")
            .attr("xlink:href", "svg_icons/fa1.svg")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x", 1128)
            .attr("y",183);            

   d3.select("#svg-circular")
            .append("text")
            .text("FEMALE SURVIVED ")
            .style("font-weight","bold")

            .attr("x", 1128)
            .attr("y",183);            

 ////////////////////////////////
   d3.select("#svg-circular")
            .append("svg:image")
            .attr("xlink:href", "svg_icons/fd1.svg")
            .attr("width", 100)
            .attr("height", 100)
            .attr("x", 1128)
            .attr("y",323);            

   d3.select("#svg-circular")
            .append("text")
            .text("FEMALE DIED ")
            .style("font-weight","bold")

            .attr("x", 1128)
            .attr("y",323);            

////////////////////////////////////////
d3.select("#svg-circular")
.append("svg:image")
.attr("xlink:href", "svg_icons/md1.svg")
.attr("width", 100)
.attr("height", 100)
.attr("x", 1128)
.attr("y",453);            

d3.select("#svg-circular")
.append("text")
.style("font-weight","bold")

.text("MALE DIED")
.attr("x", 1128)
.attr("y",453);      
//////////////////////////////////////
d3.select("#svg-circular")
.append("text")
.text(" NUMBER OF BLACK DOTS ON SKIN =  TOTAL MISSIONS")
.style("font-weight","bold")
.attr("x", 828)
.attr("y",653);   







male_alive = ['ma1.svg','ma2.svg','ma3.svg']
male_death = ['md1.svg','md2.svg','md3.svg']

female_alive = ['fa1.svg','fa2.svg','fa3.svg']
female_death = ['fd1.svg','fd2.svg','fd3.svg']


var div_tool = d3.select("#tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0);

circularG.selectAll('.node')
             .data(nodes)
             .enter()
             .append("svg:image")
             .attr("class","zoom")
            .attr("xlink:href", function(d,i) {
               if("rocket" in d)
             {
                   location_svg = "svg_icons/rocket4.svg";
             }
        
            else  
             {
                           
                if(d.gender=="Male")
               {    
                 x = d.Flights_count -1  //x is index

                 if(d.fate==0)
                 {
                  location_svg = "svg_icons/"+male_death[x];

                 }
                 else
              
                 location_svg = "svg_icons/"+male_alive[x];
              
              
              }
                            
               else
                  {
                    
                    
                             
                   x = d.Flights_count -1  //x is index
 
                  if(d.fate==0)
                  {
                    location_svg =   "svg_icons/"+female_death[x];
 
                  }
                  else
               
                  location_svg =  "svg_icons/"+female_alive[x];
                
                
                }

        
            }
      
            return location_svg;


             })
        .attr("width",50)
        .attr("height",50)
        .attr('x', d => d.polarX)
        .attr('y', d => d.polarY)
        .on('mouseover', function (d, i) {


        //  console.log(img)
    
        txt=""
         if("date" in d)
          {    txt = "Misssons:   " +d.date    +"  ALT-"+d.altitude+" KM"}

          console.log(d.name_latin+ txt)
          div_tool.html("NAME:"+d.name_latin + "  "+ txt)
          // .style("left", (d3.event.pageX + 15) + "px")
          // .style("top", (d3.event.pageY - 50) + "px")
          .style("left",  15 + "px")
          .style("top", 450 + "px")
          .style("background","white")
          .style("display","inline")
          .style("opacity",1.0)
          .style("color","blue")
          .style("font-size",30+"px")

          
      
      




               if("rocket" in d)
             {
                   location_svg = "svg_icons/rocket4.svg";
             }
        
            else  
             {
                           
                if(d.gender=="Male")
               {    
                 x = d.Flights_count -1  //x is index

                 if(d.fate==0)
                 {
                  location_svg = "svg_icons/"+male_death[x];

                 }
                 else
              
                 location_svg = "svg_icons/"+male_alive[x];
              
              
              }
                            
               else
                  {
                    
                    
                             
                   x = d.Flights_count -1  //x is index
 
                  if(d.fate==0)
                  {
                    location_svg =   "svg_icons/"+female_death[x];
 
                  }
                  else
               
                  location_svg =  "svg_icons/"+female_alive[x];
                
                
                }

        
            }

            d3.select("#svg-circular")
            .append("svg:image")
            .attr("xlink:href", location_svg)
            .attr("id","svg_image")

            .attr("width", 200)
            .attr("height", 200)
            .attr("x", 228)
            .attr("y",153);


  



        })
      
      
        .on('mousemove', function (d, i) {

      
        })
        .on('mouseout', function (d, i) {

          document.getElementById("svg_image").remove();         
          div_tool.html("")
          .style("display","none")
      
      
        });
     




circularG.selectAll('.node-label')
            .data(nodes)
            .join('text')
            .classed('node-label', true)
            .attr('x', d => d.polarX)
            .attr('y', d => d.polarY)
            .text(d =>  d.name_latin)
            .style('font-size',function(d,i) {
              
              if("rocket" in d)
                return 25+"px";

                return 22+"px"
                
        
             })
             .style('color',function(d,i) {
              
              if("rocket" in d)
                return "red";

                return "yellow"
                
        
             });
             



circularG.selectAll('.link')
            .data(links)
            .join('line')
            .classed('link', true)
            .style("stroke", function(d,i) {
              
             //console.log("---"+links[i].type_link);
            if(links[i].type_link=="dog")
                { 
                   return "green";

                }
                  return "red";
       
            })
            .style("stroke-width",function(d,i) {
              
             //console.log("---"+links[i].type_link);
            if(links[i].type_link=="dog")
                { 
                   return 10;
                   
                }
                  return 5;
       
            })

            .style("opacity",0.8)

            .attr('x1', d => d.source.polarX)
            .attr('y1', d => d.source.polarY)
            .attr('x2', d => d.target.polarX)
            .attr('y2', d => d.target.polarY);


circularG.selectAll('.link').lower();

    
circularG.selectAll('.node').raise();
circularG.selectAll('.node-label').raise();









/////////////////////////////////////////////////////////////////////



}