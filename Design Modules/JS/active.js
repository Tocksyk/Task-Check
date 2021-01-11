var lastactive = 0;
var currentactive =0;

//<script>
    //Your web app's Firebase configuration
    //For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAaUCTFwJdIpusJSIZ6qWWEq4SrjObFpBo",
    authDomain: "task-check-2cd5f.firebaseapp.com",
    databaseURL: "https://task-check-2cd5f-default-rtdb.firebaseio.com",
    projectId: "task-check-2cd5f",
    storageBucket: "task-check-2cd5f.appspot.com",
    messagingSenderId: "95709404394",
    appId: "1:95709404394:web:f58bf7577e4b21c12b8b93",
    measurementId: "G-P8GCWS506C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//</script>
const db = firebase.firestore();

function active(x) {
    currentactive = x.value;
    var tab = document.getElementById("Table1");
    var trow = tab.getElementsByTagName("tr");
    


    if (lastactive !=0) {
        var data = trow.item(lastactive);
        var statusnode = data.getElementsByTagName("td").item(3);
    
        statusnode.remove();
        
        var cln = data.cloneNode(true);
        console.log(data);
        data.remove();
        var tab2 = document.getElementById("Table2");
        tab2.appendChild(cln);

        db.collection('Work Hours').doc(day).get().then((snapshot) => {
            var count = snapshot.data().Tcomplete;
            count = count + 1;
            var day = new Date();
            day = day.toLocaleDateString('en-US', {month: "long", day:"numeric", year:"numeric"});
            
            db.collection('Work Hours').doc(day).update({
                Tcomplete: count
            });

            setTimeout(() => {
                db.collection('Row Count').get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        var maxrow = String(doc.data().MaxRow);
                        setTimeout(() => {
                            var td = new Date();
                            console.log('maxrow ' + maxrow);
                            db.collection('Pending Task').doc(maxrow).get().then((snapshot) => {
                                var sh = snapshot.data().Starth;
                                var fh = td.getHours();
                                var sm = snapshot.data().Startm;
                                var fm = td.getMinutes();
                                
                                var dur = (fh-sh)+'.'+(fm-sm);
                                console.log('dur ' + dur + ' fh ' +fh);
                                db.collection('Pending Task').doc(maxrow).update({
                                    Finishh: fh,
                                    Finishm: fm,
                                    Duration: dur
                                });
                            
                            });   
                        }, 1000);
                    });
                    
                });
            }, 3000);
        });
    }
    lastactive = currentactive;
    if (lastactive >= trow.length) {
        lastactive = lastactive - 1;
    }
}