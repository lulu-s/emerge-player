
var fs = require('fs');
var join = require('path').join;
const yaml = require('js-yaml');
 
// 遍历文件夹下的所有文件
function getJsonFiles(jsonPath, callback){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            // if(stat.isDirectory() === true) {
            //     findJsonFile(fPath);
            // }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    callback(jsonFiles);
}
getJsonFiles("content", (data)=>{
    // console.log(data);

    data.forEach(d=>{

        obj = yaml.load(fs.readFileSync(d, {encoding: 'utf-8'})); 

        // console.log(d.split("/")[1].split(".")[0]);

        let filename = d.split("/")[1].replace("yaml", "json");
        console.log(filename);

        fs.writeFileSync('content/json/' + filename, JSON.stringify(obj, null, 2));
    })
});
