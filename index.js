let express = require ('express');
let request= require ('request');
let cheerio = require ('cheerio');
let fs = require ('fs');

var url;

var title ,release ,rating

var json = {title:"", release:"", rating:""};

const app = express();

app.get("/scrape",(req, res)=>{
    // code for scraping
      url = "https://www.imdb.com/title/tt1922777/"
      request(url,function(error, response, html){
         
       var $ = cheerio.load(html);
       // console.log(html);

       $(".title_wrapper").filter(function(){
           var data = $(this)

           title = data.children().first().text()
           console.log(title);
           
           json.title=title.trim()
       })
       $("#titleYear").filter(function(){
         var data=$(this)

         release = data.children().first().text()
         console.log(release)
         json.release=release
       })
       $(".ratingValue strong").filter(function(){
         var data = $(this)
         rating=data.children().first().text()
         console.log(rating)
         json.rating=rating
       })
       // json file
       fs.writeFile("output.json",JSON.stringify(json,null,4),function(err){
         console.log("FIle successfully created check your directory")
       })
      res.send("Check your directory file is created")
      })
    
    })

app.listen(5000,function(){
    console.log("Server is listening on port 5000")
})