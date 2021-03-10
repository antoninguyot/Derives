import { useState } from "react";

const TimeController = () => {
    const [date, setDate] = useState(Date)
    const [mois, setMois] = useState(date.getMonth() - 1)
    const [heure, setHeure] = useState(date.getHours())
    const [formattedDate, setFormattedDate] = useState(null)
    const [saison, setSaison] = useState(null)
    const [moment, setMoment] = useState(null)
    
    useEffect(()=>{
        initValues()
      }, [saison, date, mois, heure, formattedDate, moment])


    const initValues = () => {
        setFormattedDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
        calculateSaison()
        calculateMoment()
    }

    /**
     * Calcul de la saison
     */
    const calculateSaison = () =>  {
        if (mois >= 3 && mois < 6) setSaison("printemps")
        else if (mois >= 6 && mois < 9) setSaison("été")
        else if (mois >= 9 && mois < 12) setSaison("automne")
        else setSaison("hiver")
        return sasion 
    }

    /**
     * Calcul du moment de la journée (en fonction de l'heure et de la saison)
     * À passer sur l'API de la météo
     */
    const calculateMoment = () => {
      switch (saison) {
        case "printemps": {
          if (heure <= 6 && heure > 20) setMoment("nuit") // possible faire un switch ?
          else if (heure > 6 && heure <= 10) setMoment("matin")
          else if (heure > 10 && heure <= 17) setMoment("midi") // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
          else setMoment("soir")
          break
        }

        case "été": {
          if (heure <= 5 && heure > 22) setMoment("nuit")
          else if (heure > 5 && heure <= 10) setMoment("matin")
          else if (heure > 10 && heure <= 18) setMoment("midi")
          else setMoment("soir")
          break
        }

        case "automne": {
          if (heure <= 6 && heure > 20) setMoment("nuit")
          else if (heure > 6 && heure <= 10) setMoment("matin")
          else if (heure > 10 && heure <= 17) setMoment("midi")
          else setMoment("soir")
          break
        }

        case "hiver": {
          if (heure <= 7 && heure > 19) setMoment("nuit")
          else if (heure > 7 && heure <= 10) setMoment("matin")
          else if (heure > 10 && heure <= 17) setMoment("midi")
          else setMoment("soir")
          break
        }

        default: {
          if (heure <= 5 && heure > 21) setMoment("nuit")
          else if (heure > 5 && heure <= 10) setMoment("matin")
          else if (heure > 10 && heure <= 18) setMoment("midi")
          else setMoment("soir")
          break
        }
      }
      return {moment}
    }
}

export default TimeController