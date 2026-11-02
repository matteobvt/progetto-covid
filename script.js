var urlJSON = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json';

var numeroGiorni = 10;

var xhr = new XMLHttpRequest();
xhr.open('GET', urlJSON, true);

xhr.onload = function() {
    if (xhr.status === 200) {
        var dati = JSON.parse(xhr.responseText);
        
        var ultimi10 = dati.slice(-numeroGiorni);

        var intestazione = document.getElementById('intestazione-tabella');
        var corpo = document.getElementById('corpo-tabella');

        var chiavi = Object.keys(ultimi10[0]);

        var htmlTh = "<tr>";
        for (var i = 0; i < chiavi.length; i++) {
            htmlTh = htmlTh + "<th>" + chiavi[i] + "</th>";
        }
        htmlTh = htmlTh + "</tr>";
        intestazione.innerHTML = htmlTh;

        var htmlTd = "";
        for (var i = 0; i < ultimi10.length; i++) {
            htmlTd = htmlTd + "<tr>";
            var giorno = ultimi10[i];

            for (var j = 0; j < chiavi.length; j++) {
                var nomeChiave = chiavi[j];
                htmlTd = htmlTd + "<td>" + giorno[nomeChiave] + "</td>";
            }
            htmlTd = htmlTd + "</tr>";
        }
        corpo.innerHTML = htmlTd;
    }
};

xhr.send();
