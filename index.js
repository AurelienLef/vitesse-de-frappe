// Création des variables
let tabPhrase = [
    "Cette découverte suggère en outre que les performances cognitives ne dépendent pas uniquement de la zone du cortex préfrontal (PFC) du cerveau. Cette région est le siège de différentes fonctions cognitives dites supérieures notamment le langage, la mémoire de travail, et le raisonnement.",
    "Le Japon est un archipel constitué de très nombreuses îles disséminées sur 3 300 kilomètres du nord au sud, soit l'équivalent de la distance entre Paris et Beyrouth. En janvier 2021, le ministère des Transports en dénombrait 14 125 au total.",
    "En 30-40 ans, le nombre de cinémas sur les Champs-Élysées a chuté de vingt à cinq. Il ne reste plus que l'UGC Normandie avec sa magnifique salle au ciel étoilé, le Lincoln, le Publicis et dans les rues perpendiculaires, le Balzac et le Mac Mahon. Ces cinémas résistent notamment grâce aux avant-premières et à la programmation de festivals.",
    "En 2015, après la découverte de la tombe de Richard III sous un parking de Leicester et sa réinhumation très médiatisée dans la cathédrale de la ville, le Daily Mail avait été jusqu'à proclamer que \"faire de ce tueur d'enfants un héros national\" était une \"folie\"."
]
let unkonw = [
    "Tab",
    "CapsLock",
    "Shift",
    "Alt"
]
let interdit = [
    "Meta",
    "Control",
    "Backspace"
]

let cpt = 0
let phrase = Math.floor(Math.random()*tabPhrase.length)
let ph=""
let nbMot = tabPhrase[phrase].match(/[\w'À-ÖØ-öø-ÿ-]+(?:['-]\w+)?/g).length
const deb = new Date()

//Fonction de vérification des lettres
let verifLettre = (pos, event) => {
    if (!unkonw.includes(event.key)) {
        if (tabPhrase[phrase][cpt]===event.key) {
            $(`#texte span:nth-of-type(${cpt+1})`).removeClass('surligne')
            cpt++
            $(`#texte span:nth-of-type(${cpt+1})`).addClass('surligne')
        } else {
            event.preventDefault()
        }
    }
    
}

// Ajout de balise html dans la phrase et l'affiche
(affichePhrase = (str) => {
    for (const c in str) {
        ph = ph+`<span>${tabPhrase[phrase][c]}</span>`
        $('#texte').html(ph)
    }
})(tabPhrase[phrase])

$(`#texte span:nth-of-type(${cpt+1})`).addClass('surligne')       

// Event sur un key down
$('textarea').keydown((e) => {
    if (interdit.includes(e.key)) {
        e.preventDefault()
        console.log('stop')
    }else if (cpt+1 >= tabPhrase[phrase].length && (e.key!="CapsLock" && e.key!="Shift")) {
        $('textarea').attr('disabled', true)
        const fin = new Date()
        const differenceEnMillisecondes = fin - deb;
        const sec = Math.floor(differenceEnMillisecondes / 1000)
        const millisec = differenceEnMillisecondes % 1000

        const mPm = Math.floor(60*nbMot / sec)

        $('#taper').after(`<span id="chrono">Votre temps est de :<br>${sec}.${millisec}sec, soit <br>${mPm} mots/min. BRAVO !</span>`)
    }
    else {
        verifLettre(cpt, e)
    }
});
