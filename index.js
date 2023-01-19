const puppeteer = require("puppeteer");
const fs = require("fs")
// html to pdf conversion using puppeteer
const generate = async() =>{
        const html = fs.readFileSync("./template.html")
           const browser= await puppeteer.launch();
           const page = await browser.newPage();
           await page.setContent(html);
           await page.pdf({path:'puppeteer.pdf',format:"A4"});
           await browser.close();
    }
generate();

//html to pdf conversion using phantom-html-to-pdf
var conversion = require("phantom-html-to-pdf")();
const data = fs.readFile("./template.html",(err,data) => {
    if(err){
        console.log("error in file read",err)
    }
    // console.log("html data",data.toString())
    conversion({ html: data.toString() }, function(err, pdf) {
      var output = fs.createWriteStream('phantom.pdf')
      console.log(pdf.numberOfPages);
        // since pdf.stream is a node.js stream you can use it
        // to save the pdf to a file (like in this example) or to
        // respond an http request.
      pdf.stream.pipe(output);
    });
})
