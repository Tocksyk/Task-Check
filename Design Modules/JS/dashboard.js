var day = new Date()
day = day.toLocaleDateString('en-US', {month: "long", day:"numeric", year:"numeric"});


function start() {
    var d = new Date();
    db.collection("Work Hours").doc(day).set({
        Starthour: d.getHours(),
        Startmin: d.getMinutes(),
        Finishhour:0,
        Finishmin:0,
        Duration: 0
    })
}

function exit() {
    var d = new Date();
    db.collection('Work Hours').doc(day).update({
        Finishhour: d.getHours(),
        Finishmin: d.getMinutes()
    });

    setTimeout(() => {
        db.collection('Work Hours').doc(day).get().then((snapshot) => {
            startm = snapshot.data().Startmin;
            starth = snapshot.data().Starthour;
            finishm = snapshot.data().Finishmin;
            finishh = snapshot.data().Finishhour;
            var diff = (finishh-starth)+"."+(finishm-startm);
            console.log(diff);
            db.collection('Work Hours').doc(day).update({
                Duration: diff
            });
        });
    }, 5000);
}


function dashboard () {
    var row_no = document.getElementById('Table3').rows.length;
    var table = document.getElementById('Table3');
    var row = table.insertRow(row_no);
    
    if (row_no > 1) {
        for (let index = row_no; index > 0; index--) {
            document.getElementById('Table3').deleteRow(index);
        }
    }else {
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        db.collection('Work Hours').get().then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                row = table.insertRow(row_no++);
                row.insertCell(0).innerHTML = doc.id,
                row.insertCell(1).innerHTML = doc.data().Tcomplete,
                row.insertCell(2).innerHTML = doc.data().Duration
            });
        });

    }
    
}

function taskdashboard() {
    var row_no = document.getElementById('Table4').rows.length;
    var table = document.getElementById('Table4');
    var row = table.insertRow(row_no);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    if (row_no > 1) {
        for (let index = row_no; index > 0; index--) {
            document.getElementById('Table4').deleteRow(index);
        }
    } else {
        var search = String(document.getElementById('getduration').value);
        db.collection('Pending Task').where('Date','==',search).get().then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                row = table.insertRow(row_no++);
                row.insertCell(0).innerHTML = doc.id,
                row.insertCell(1).innerHTML = doc.data().TaskName,
                row.insertCell(2).innerHTML = doc.data().Duration
            });
        });
    }
}