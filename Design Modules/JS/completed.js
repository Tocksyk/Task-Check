function emptycomp() {
    var row_no = document.getElementById('Table2').rows.length;
    var row = document.getElementById("Table2");
    for (i = row_no; i > 0; i--) {
        row.deleteRow(1);
    }
}