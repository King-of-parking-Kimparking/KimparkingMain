

function read_with_ajax(url,fun,holder){//url,function,just a placeholder
holder = new XMLHttpRequest();

holder.open('GET',url);
holder.onload=fun;
holder.send()

}

function alertTxt(){
    //alert(this.response);
    allText = this.response;
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');


    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                //tarr.push(headers[j] + ":" + data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    for(var i = 0; i < lines.length; i++)
      if(lines[i][5] != ""){
        if(lines[i][16] == "유료")
            setPaidParkLoc(lines[i][5], lines[i][10], lines[i][11]);
        else
          setParkLoc(lines[i][5], lines[i][10], lines[i][11]);
      }
}

var lines = [];
read_with_ajax('./DataBase/jejuParking.csv',alertTxt)
read_with_ajax('./DataBase/seoGuiPo.csv',alertTxt)
