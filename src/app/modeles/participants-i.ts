export interface ParticipantsI {

}

export interface JoueurI{
    id: number
    nom: string
    rang: number
    nbVictoire: number
    nbDefaite: number
    nbNull: number
    score: number
}

export interface MatchI{
    joueurA: JoueurI
    joueurB: JoueurI
    scoreA: number
    scoreB: number
    vainqueur: JoueurI
}

