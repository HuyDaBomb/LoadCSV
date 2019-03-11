var MyData = '';

document.getElementById("openFile").addEventListener('change', function () {
    $('#FileContents').empty();
    var fr = new FileReader();
    fr.onload = function () {
        // document.getElementById("FileContents").textContent = this.result;
        // $('#MyFile').append(fr.result);
       
        $('#FileContents').append(fr.result);
    }
    // console.log();
    try {
        fr.readAsText(this.files[0]);
        console.log (this.files);
    }
    catch {
        console.error('nada');
        
    }
    
});

$(document).ready(function () {

    $('#load_data').attr('disabled', false);  //enables the doit button

    
});


$('#load_data1').on('click', function () {
    // $('#load_data1').click(function () {
    console.log("Clicked!");
    $.ajax({
        // url: "small_sample.csv",
        // url: "huy1.csv",
        url: "file.csv",
        dataType: "text"
        // success: function (data) {
        //     // console.log(data);
        //     MyData = opsi(data);
        //     // console.warn(MyData);
        //     successWorkgroupFn(MyData);
        //     var junk = document.getElementById("FileContents").textContent;
        //     console.log(junk);
        // }
    })
        .done(function (data) {
            // console.log(data);
            MyData = opsi(data);
            // console.warn(MyData);
            successWorkgroupFn(MyData);
            // var junk = document.getElementById("FileContents").textContent;
            // console.log(junk);
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");

        })
});

$('#load_data').on('click', function () {
    console.log("Clicked!");
    var junk = document.getElementById("FileContents").textContent;
    // console.log(junk);

    // console.log(data);
    MyData = opsi(junk);
    // console.warn(MyData);
    $('#MyTableDiv').empty();
    $('#MyTableDiv').append(MyData);
    // $('#userData').DataTable();
    // var mytable = $('#userData').DataTable();
    var mytable = $('#MyTable').DataTable();


    $('#MyTable').on('click', 'tr', function () {
        var mydata = mytable.row(this).data();
        console.warn('you clicked on row ' + mydata[0] + '\'s');
        // myUser = data;
        // $('#userGet').val(myUser.configurationId.id)
    });
    $('#MyTable tbody').on('click', 'td', function () {
        var mydata = mytable.cell(this).data();
        console.warn('you clicked on cell data ' + mydata);
        console.log('row index ' + mytable.row(this).index() + ' ' + mytable.row(this).data()[0]);
        var cell = mytable.cell(this);
        console.log('cell index ' + cell.index().column);
        var tdindex = $(this).index();
        var header = mytable.columns(tdindex).header();
        console.log($(header).html() + ' ' + mydata);
        // if (tdindex == 4) {
            // cell.data(parseInt(cell.data()) + 1).draw();
            $(this).addClass('changed');
            $(this).css('background', 'pink');
        // }
    })



})

function successWorkgroupFn(data) {
    // console.warn(data);
    // data = displayWorkgroups(data);
    $('#MyTableDiv').empty();
    $('#MyTableDiv').append(data);
    // $('#userData').DataTable();
    // var mytable = $('#userData').DataTable();
    var mytable = $('#MyTable').DataTable();
    $('#MyTable').on('click', 'tr', function () {
        var mydata = mytable.row(this).data();
        console.warn('you clicked on row ' + mydata[0] + '\'s');
    });
} // end of function

function displayWorkgroups(response) {
    console.log(response);
    //   var response = JSON.parse(response);
    //console.log('Response Items:' + response.items.length);
    // var users = response.items;
    //console.log(users);
    var output = '';
    output += '<table id="userWorkgroupData" class="display compact cell-border">';
    // output += '<caption>Workgroup Information</caption>';
    output += '<thead><tr><th>Queue</th><th>Status</th><th>Has Queue?</th><th>Email Routing</th></tr></thead>';
    output += '<tbody>';

    var workgroups = response.items;

    for (let i = 0; i < workgroups.length; i++) {
        if (workgroups[i].queueType != 1) {
            output += '<tr>';
            output += '<td>' + workgroups[i].configurationId.id + '</td>';
            output += '<td>' + workgroups[i].isActive + '</td>';
            output += '<td>' + workgroups[i].hasQueue + '</td>';
            output += '<td>' + workgroups[i].isAcdEmailRoutingActive + '</td>';
            output += '</tr>';

        }
    }

    output += '</tbody></table>';
    // $('#users').append(output);
    return output;
}



function opsi(data) {
    var allRows = data.split(/\r?\n|\r/);
    var table = '<table id="MyTable" class="display compact cell-border">';
    for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += "<thead>";
            table += "<tr>";
        } else {
            table += "<tr>";
        }
        var rowCells = allRows[singleRow].split(',');
        for (let rowSingleCell = 0; rowSingleCell < rowCells.length; rowSingleCell++) {
            if (singleRow === 0) {
                table += "<th>";
                table += rowCells[rowSingleCell];
                table += "</th>";
            } else {
                table += "<td>";
                table += rowCells[rowSingleCell];
                table += "</td>";
            }
        }
        if (singleRow === 0) {
            table += "</tr>";
            table += "</thead>";
            table += "<tbody>";
        } else {
            table += "</tr>";
        }
    }
    table += "</tbody>";
    table += "</table>";
    // $('#MyTableDiv').append(table);
    // $('#MyTable').html(table);

    return table;
}

