var json2csv = require('json2csv');
var fs = require('fs');

var fields = [ 'sid','id','position','created_at','created_meta','updated_at','updated_meta','meta','name','title','department_name','regular','retro','other','overtime','injured','detail','quinn','total_earnings','zip'];

fs.readFile('data.json', 'utf8', function(err, boston) {
    if (err) throw err;    
    var employees = JSON.parse(boston);

    var length = employees.data.length;
    console.log('Number of columns: ' + length);

    var  pretty = [];

    employees.data.forEach(function(employee){
        var obj = {};
        employee.forEach(function(item,index){
            var property = fields[index];
            obj[property] = item;
        });
        pretty.push(obj);
    });

    var result = json2csv({ data: pretty, fields: fields });

    fs.writeFile('output.csv', result, function(err) {
      if (err) throw err;
      console.log('file saved');
    });


});

