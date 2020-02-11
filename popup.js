$(function() {
    //https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function fmDate(v) {

    var date = new Date(v);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = gg+ "-"+ mm + "-" +aaaa;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}

    $('#submitButton').click(function() {
        var source = $('#source').val();
        if (source == 0) {
            $('#updateTimeWorld').hide();
            $('#tableResultVn').hide();
            $('#tableResultWorld').show();
            $("#tableResultWorld").LoadingOverlay("show");
            //get viet nam
            var linkApiTotal = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&outSR=102100&cacheHint=true`;
            $.ajax(linkApiTotal, {
                type: "get",
                dataType: 'json', // type of response data
                success: function(data) { // success callback function
                    var total = data.features[0].attributes.value;
                    total = numberWithCommas(total);
                    $('#QT-01').html(total);
                    //$("#tableResultWorld").LoadingOverlay("hide");
                },
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                    $("#tableResultWorld").LoadingOverlay("hide");
                }
            });
            var linkApiTotalDeath = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true`;
            $.ajax(linkApiTotalDeath, {
                type: "get",
                dataType: 'json', // type of response data
                success: function(data) { // success callback function
                    var totalDeath = data.features[0].attributes.value;
                    totalDeath = numberWithCommas(totalDeath);
                    $('#QT-02').html(totalDeath);
                },
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                    $("#tableResultWorld").LoadingOverlay("hide");
                }
            });
            var linkApiTotalRecover = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true`;
            $.ajax(linkApiTotalRecover, {
                type: "get",
                dataType: 'json', // type of response data
                success: function(data) { // success callback function
                    var totalRecover = data.features[0].attributes.value;
                    totalRecover = numberWithCommas(totalRecover);
                    $('#QT-04').html(totalRecover);
                },
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                    $("#tableResultWorld").LoadingOverlay("hide");
                }
            });
            var linkApiVnAndChina = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true`;
            $.ajax(linkApiVnAndChina, {
                type: "get",
                dataType: 'json', // type of response data
                success: function(data) { // success callback function
                    var lenghtData = data.features.length;
                    for (var i = 0; i < lenghtData; i++) {
                        var OBJECTID = data.features[i].attributes.OBJECTID;
                        var total = data.features[i].attributes.Confirmed;
                        total = numberWithCommas(total);
                        var totalDeath = data.features[i].attributes.Deaths;
                            totalDeath = numberWithCommas(totalDeath);
                        var totalRecover = data.features[i].attributes.Recovered;
                            totalRecover = numberWithCommas(totalRecover);
                        if (OBJECTID == 19) {
                            $('#VN-01').html(total);
                            $('#VN-02').html(totalDeath);
                            $('#VN-04').html(totalRecover);
                        }
                        if (OBJECTID == 13) {
                            $('#TQ-01').html(total);
                            $('#TQ-02').html(totalDeath);
                            $('#TQ-04').html(totalRecover);
                        }
                    }
                    $("#tableResultWorld").LoadingOverlay("hide");
                },
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                    $("#tableResultWorld").LoadingOverlay("hide");
                }
            });
        }else{
            $('#updateTimeWorld').show();
            $('#tableResultWorld').hide();
            $('#tableResultVn').show();
            $("#tableResultVn").LoadingOverlay("show");
            //get viet nam
            var linkApiVnExpress = `http://demo.gacoder.info/demo4/corona`;
            $.ajax(linkApiVnExpress, {
                type: "get",
                dataType: "json", // type of response data,
                success: function(data) { // success callback function
                    var result = data;
                    var lenghtData = result.data.data[0].table_left.length;
                    for (var i = 0; i < lenghtData; i++) {
                        if(i>0){
                            var dataChild=result.data.data[0].table_left[i];
                            var so_ca_nhiem=numberWithCommas(dataChild.cases);
                            var nguy_kich=numberWithCommas(dataChild.critical);
                            var chet=numberWithCommas(dataChild.deaths);
                            var new_today=numberWithCommas(dataChild.new_today);
                            var recovered=numberWithCommas(dataChild.recovered);
                            var today_death=numberWithCommas(dataChild.today_deaths);
                            if(dataChild.country=='Việt Nam'){
                                $('#VNE-01').html(so_ca_nhiem);
                                $('#VNE-02').html(nguy_kich);
                                $('#VNE-03').html(chet);
                                $('#VNE-04').html(recovered);
                                $('#VNE-05').html(new_today);
                                $('#VNE-06').html(today_death);
                            }
                            if(dataChild.country=='Trung Quốc'){
                                $('#TQE-01').html(so_ca_nhiem);
                                $('#TQE-02').html(nguy_kich);
                                $('#TQE-03').html(chet);
                                $('#TQE-04').html(recovered);
                                $('#TQE-05').html(new_today);
                                $('#TQE-06').html(today_death);
                            }
                        }
                        
                    }
                    //the gioi
                    var dataWorld=result.data.data[0].table_right;
                    $('#QTE-01').html(numberWithCommas(dataWorld.total.cases));
                    $('#QTE-03').html(numberWithCommas(dataWorld.total.deaths));
                    $('#QTE-04').html(numberWithCommas(dataWorld.total.recovered));
                    $("#tableResultVn").LoadingOverlay("hide");
                    //update date
                    var dateUpdate=fmDate(result.data.updated_at);
                    $('#updateTime').html(dateUpdate);
                },
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                    $("#tableResultVn").LoadingOverlay("hide");
                }
            });
        }

    });
});