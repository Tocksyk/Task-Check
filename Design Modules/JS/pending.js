var maxrow;


function emptypend() {
    var row_no = document.getElementById('Table1').rows.length;
    var row = document.getElementById("Table1");
    for (i = row_no; i > 0; i--) {
        row.deleteRow(1);
    }
}

function addrow() {
    var row_no = document.getElementById('Table1').rows.length;
    var table = document.getElementById('Table1');
    var row = table.insertRow(row_no);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    var task = document.getElementById('taskname').value;
    document.getElementById('taskname').value = '';
    if (task.length != 0) {
        var d = new Date();
        db.collection('Row Count').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                maxrow = doc.data().MaxRow;
                cell1.innerHTML = maxrow;
                cell2.innerHTML = task;
                cell3.innerHTML = d.toLocaleDateString();
                cell4.innerHTML = '<input class="Activate" name="grp1" type="radio" value="'+row_no+'" onclick="active(this);"></input>';
                
                //Add Task in the Pending database
                setTimeout(() => {
                    var v = String(maxrow);
                    console.log(v);
                    db.collection("Pending Task").doc(v).set({
                        TaskID: maxrow,
                        TaskName: task,
                        Date: d.toLocaleDateString(),
                        Starth: d.getHours(),
                        Finishh: 0,
                        Startm : d.getMinutes(),
                        Finishm: 0,
                        Duration: 0
                    });
                }, 5000);
                
                maxrow = maxrow + 1;
                //Update MaxRow
                db.collection('Row Count').doc('9').update({
                    MaxRow: maxrow
                });
                
            });
        })
    } else {
        alert("Enter the Task Name");
    }
}