
const urlJSON = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json';

function elaboraDati(numeroGiorni) {

    const tabella = document.getElementById('tabella-covid');
    const sottotitolo = document.getElementById('testo-sottotitolo');

    numeroGiorni = Number(numeroGiorni);

    if (!Number.isInteger(numeroGiorni) || numeroGiorni < 1) {
        tabella.innerHTML = '<tr><td>Inserisci un numero valido di giorni.</td></tr>';
        return;
    }

    sottotitolo.innerText =
        `Visualizzazione degli ultimi ${numeroGiorni} giorni registrati`;

    tabella.innerHTML =
        '<tr><td>Caricamento dati in corso...</td></tr>';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', urlJSON, true);

    xhr.onload = function() {

        if (xhr.status === 200) {

            try {

                const dati = JSON.parse(xhr.responseText);

                if (!Array.isArray(dati) || dati.length === 0) {
                    throw new Error('Dati non validi');
                }

                const ultimiDati = dati.slice(-numeroGiorni);

                const chiavi = Object.keys(dati[0]);

                let htmlTabella = '<thead><tr>';

                chiavi.forEach(function(chiave) {

                    const nome = chiave.replace(/_/g, ' ');

                    htmlTabella += `<th>${nome}</th>`;

                });

                htmlTabella += '</tr></thead><tbody>';

                ultimiDati.forEach(function(giorno) {

                    htmlTabella += '<tr>';

                    Object.keys(giorno).forEach(function(chiave) {

                        let valore = giorno[chiave];

                        if (chiave === 'data' && valore) {

                            valore = valore.substring(0, 10)
                                .split('-')
                                .reverse()
                                .join('/');

                        }

                        else if (typeof valore === 'number') {

                            valore = valore.toLocaleString('it-IT');

                        }

                        if (valore === null) {
                            valore = '';
                        }

                        htmlTabella += `<td>${valore}</td>`;

                    });

                    htmlTabella += '</tr>';

                });

                htmlTabella += '</tbody>';

                tabella.innerHTML = htmlTabella;

            }

            catch (errore) {

                console.error('Errore:', errore);

                tabella.innerHTML =
                    '<tr><td>Errore nell\'elaborazione dei dati.</td></tr>';

            }

        } else {

            tabella.innerHTML =
                '<tr><td>Errore nel caricamento del JSON.</td></tr>';

        }

    };

    xhr.onerror = function() {

        tabella.innerHTML =
            '<tr><td>Impossibile caricare i dati.</td></tr>';

    };

    xhr.send();

}

elaboraDati(10);

document.getElementById('btn-aggiorna')
    .addEventListener('click', function() {

        const giorniScelti =
            document.getElementById('input-giorni').value;

        elaboraDati(giorniScelti);

    });
