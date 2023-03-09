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
    adversaires: number[]
    gameWin: number
    gamePlayed: number
    estLeBye:boolean
}

export interface MatchI{
    id: number
    joueurA: JoueurI
    joueurB: JoueurI
    scoreA: number
    scoreB: number
    vainqueur: JoueurI | undefined
    fini: boolean
}

export interface RondeI{
    id: number
    matchs: MatchI[]
}
