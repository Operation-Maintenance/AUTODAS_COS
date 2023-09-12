// ==UserScript==
// @name         OplusM AUTODAS COS
// @namespace    https://oplusm.fr/
// @version      1.0
// @description  Envoie semi-automatique de prevenance ClickOnSIte
// @author       Adi Lasri
// @match        https://cos.ontower.fr/ontower-fr/#/ngs/entity/demande_d_acces_au_site/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Operation-Maintenance/AUTODAS_COS/main/autodas.js?token=GHSAT0AAAAAACGWLZRFQPN7QC345FIQH3QQZIAP6YA
// @downloadURL  https://raw.githubusercontent.com/Operation-Maintenance/AUTODAS_COS/main/autodas.js?token=GHSAT0AAAAAACGWLZRFQPN7QC345FIQH3QQZIAP6YA
// ==/UserScript===

(function () {
  //'use strict';
      // Créer le bouton
        var myButton = document.createElement('div');
        myButton.id = 'myButton';
        myButton.textContent = 'Envoyez un mail';
        myButton.style.font.size = "14px";
        myButton.style.position = 'fixed';
        myButton.style.bottom = '20px';
        myButton.style.right= '20px';
        myButton.style.padding = '20px 40px';
        myButton.style.backgroundColor = '#0066CC';
        myButton.style.color = 'white';
        myButton.style.borderRadius = '50px';
        myButton.style.border = '2px solid #0066cc';
        myButton.style.color = '#fff%';
        myButton.style.boxshadow = 'none';
        myButton.style.fontfamily = 'Roboto, sans-serif';
        myButton.style.cursor = 'pointer';

        // Ajouter le bouton à la page
        document.body.appendChild(myButton);

      // Ajouter un gestionnaire de clic au bouton
      myButton.addEventListener('click' ,function() {

        var BaliseP = document.getElementsByTagName("p");
        if(BaliseP){
          var idDas = BaliseP[3].innerText;
          var idInter = BaliseP[10].innerText;
          var idInterCat = BaliseP[11].innerText;
          idInter += ' '+idInterCat;
          var idSociete =  BaliseP[15].innerText;
          var idLieux = BaliseP[12].innerText;
          var idSpec = BaliseP[20].innerText;
          var idDesc = BaliseP[22].innerText;
          var idDatedebut = BaliseP[16].innerText;
          var idDatedebuth = BaliseP[18].innerText;
          var idDatefin = BaliseP[17].innerText;
          var idDatefinh = BaliseP[19].innerText;
          var DATE ="le "+ idDatedebut +" à " + idDatedebuth + "jusqu\'au " + idDatefin +" à "+ idDatefinh;
          if (idDatedebut == idDatefin){
            DATE= "le "+ idDatedebut+ " de " + idDatedebuth + " à " + idDatefinh;
          }
          console.log(BaliseP);
        }
        var BaliseSpan= document.getElementsByTagName("span");
        if(BaliseSpan){
          var idElement = BaliseSpan[19].innerText;
          idElement=idElement.slice(2);
          var idAdresse= BaliseSpan[65].innerText;
          console.log(BaliseSpan);
        }
                 // Sélectionnez tous les éléments de tableau (balise <table>) sur la page
          var tables = document.getElementsByTagName('table');

          // Vérifiez s'il y a au moins trois tableaux sur la page
          if (tables.length >= 3) {
              // Sélectionnez le troisième tableau (index 2 car les indices commencent à 0)
              var table = tables[2];

              // Sélectionnez toutes les lignes de données (ignorez la première ligne d'en-tête)
              var rows = table.querySelectorAll('tbody tr:not(:first-child)');

              // Créez un tableau pour stocker les données de toutes les lignes
              var contact = [];

              // Parcourez chaque ligne de données
              rows.forEach(function(row) {
                  // Sélectionnez toutes les cellules de données dans la ligne
                  var cells = row.querySelectorAll('td');

                  // Créez un tableau pour stocker les données de cette ligne
                  var rowData = [];

                  // Récupérez les données de chaque cellule et ajoutez-les à rowData
                  rowData.push(cells[0].textContent.trim()); // Nom
                  rowData.push(cells[1].textContent.trim()); // Prenom
                  rowData.push(cells[2].textContent.trim()); // Telephone
                  rowData.push(cells[3].textContent.trim()); // Email
                  rowData.push(cells[4].textContent.trim()); // Fonction
                  rowData.push(cells[5].textContent.trim()); // Entreprise

                  // Ajoutez rowData au tableau rowDataArray
                  contact.push(rowData);
              });

              // À ce stade, toutes les données de chaque ligne sont stockées dans rowDataArray
              // Vous pouvez utiliser rowDataArray pour créer votre e-mail
          } else {
              console.error('La table n\'a pas été trouvée.');
          }


   // Prompt des informations récupéré dans la console
            console.log("Code site: " + idElement +" Code das : " + idDas + " Société : " + idSociete + " Zone d'inter :" + idLieux + " Equipements spéciaux : " + idSpec + " Nature inter :" + idInter+ " Description inter : " + idDesc + " Contact : " + contact + " Adresse : " + idAdresse);
            console.log(DATE);
            // Appelez la fonction pour la première fois
            // ouverture de la fenêtre pour la region
      var choix2;
        do {
            choix2 = prompt("Sélectionnez une Zone : \n1. NORD\n2. IDF\n3. SUD");
            // Vérifie si l'utilisateur a cliqué sur Annuler
            if (choix2 === null) {
                alert("Opération annulée.");
                break; // Sort de la boucle si l'utilisateur a cliqué sur Annuler
            }
        } while (choix2 !== "NORD" && choix2 !== "IDF" && choix2 !== "SUD");

        // Vérifie si l'utilisateur a fait un choix valide
        if (choix2 !== null) {
            sendEmail(idElement, idDas, idSociete, idAdresse, idLieux, idInter, idSpec, idDesc, contact, DATE, choix2);
        }
      });





  // fonction de création du mail
  function sendEmail(idElement, idDas, idSociete, idAdresse, idLieux, idInter, idSpec, idDesc, contact, idIFSpec,DATE, choix2) {
    var recipient = ''; // pas de destinataire automatique
    var subject = "CELLNEX "+choix2 + ' Intervention sur les antennes Free Mobile, ' + idElement + " // " + idDas; // sujet du mail
    var body = 'Bonjour,%0A%0ANous sommes la société CELLNEX France mandatée par l\'antenniste Free Mobile. %0A%0A';
    body += 'Nous vous informons que la société ' + idSociete + ' souhaite intervenir sur votre site situé à ' + idAdresse +" "+DATE + '. %0A%0A'; //corps du mail
    body += 'Ci-dessous les informations concernant l’opération :%0A%0A';
    body += 'Référence du site : ' + idElement +'.%0A';
    body += 'Lieu de l\'intervention : ' + idLieux + '.%0A';
    body += 'Nature d\'intervention : ' + idInter + '.%0A';
    body += 'Sur les équipements de l\’opérateur : Cellnex France.';
    body += '%0AEquipements spéciaux : ' + idIFSpec + " " + idSpec;
    body += '%0AMotif de l’intervention : ' + idDesc;
    body += '%0ALes Intervenants sont : %0A';
    for (var i = 0; i < contact.length; i++) {
        body += contact[i] + "%0A";
    }
    body += '%0AAvons-nous votre accord pour l’intervention ? %0A';
    body += 'Dans l’attente de votre retour.%0A';
    body += 'Cordialement,%0A';


    //var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); // encapsulage dans le mailto
    var urlOWA = "https://outlook.office365.com/owa/?path=/mail/action/compose&to=&subject="+subject+"&body="+body;
    var senderEmail = "guichet.acces@cellnextelecom.fr"; // Remplacez par l'adresse e-mail de l'expéditeur que vous souhaitez utiliser
    urlOWA += "&from=" + encodeURIComponent(senderEmail);

    window.open(urlOWA, "_blank");
    //window.location.href = mailtoLink;
  };
})();
