import { ref } from 'vue';

export function englishWords() {
    const mostUsed = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
        "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
        "when", "make", "can", "like", "time", "no", "just", "him", "know",
        "take", "people", "into", "year", "your", "good", "some", "could", "them",
        "see", "other", "than", "then", "now", "look", "only", "come", "its",
        "over", "think", "also", "back", "after", "use", "two", "how", "our",
        "work", "first", "well", "way", "even", "new", "want", "because", "any",
        "these", "give", "day", "most", "us", "is", "are", "were", "was",
        "has", "had", "may", "must", "so", "do", "of", "in", "on",
        "for", "a", "by", "the", "with", "at", "this", "I", "not",
        "have", "you", "it", "or", "be", "an", "from", "or", "that",
        "a", "on", "they", "by", "he", "she", "we", "with", "are",
        "as", "but", "is", "his", "her", "was", "if", "will", "can",
        "your", "my", "their", "our", "there", "here", "out", "in", "up",
        "down", "into", "off", "over", "under", "between", "through", "above", "below",
        "same", "different", "like", "unlike", "too", "very", "so", "such", "no",
        "not", "all", "some", "few", "many", "several", "every", "each", "any",
        "one", "two", "three", "four", "five", "first", "last", "very", "really",
        "almost", "well", "badly", "quickly", "slowly", "suddenly", "next", "now", "later",
        "before", "early", "always", "never", "often", "sometimes", "usually", "already", "soon",
        "still", "just", "ever", "once", "here", "there", "where", "everywhere", "nowhere",
        "anywhere", "this", "that", "these", "those", "my", "your", "his", "her",
        "its", "our", "their", "mine", "yours", "his", "hers", "ours", "theirs",
        "what", "which", "who", "whom", "whose", "why", "when", "where", "how",
        "whether", "because", "since", "as", "although", "though", "even", "if", "unless",
        "until", "while", "so", "because", "therefore", "however", "although", "though",
        "but", "and", "or", "yet", "so", "either", "neither"
    ];

    const numbers = [
        '2000', '13', '3405', '3', '1', '100', '233', '808', '111', '12', '234', '20', '234', '099', '001', '706', '23', '23',
        '324', '23', '132', '45', '644', '345', '324', '2121', '86', '43', '7609', '345', '2000', '3423'
    ]

    const mediumUsed = ["augment", "complaisant", "denouement", "egregious",
        "flabbergasted", "gregarious", "haphazard", "inculcate", "jejune",
        "kaleidoscope", "maelstrom", "nefarious", "obfuscate",
        "plethora", "quixotic", "recalcitrant", "stalwart", "taciturn",
        "ubiquitous", "vexatious", "wanderlust", "xenophobia", "yesterday",
        "zealous", "aspire", "baroque", "catalyst", "dichotomy",
        "ephemeral", "facetious", "garrulous", "hierarchy", "inundate",
        "juxtapose", "kinetic", "languid", "meticulous", "nemesis",
        "oblivion", "pervasive", "quandary", "resilient", "serendipity",
        "trepidation", "ubiquitous", "vestige", "wistful", "xenial",
        "yielding", "zephyr", "banal",]

    const rarelyUsed = [
        "acarpous", "acerbic", "acerbity", "adumbrate", "adventitious", "braggadocio",
        "alacrity", "anachronism", "antithesis", "apocryphal", "apotheosis",
        "asymptote", "bellicose", "belligerent", "cacophony", "cataclysm",
        "chicanery", "circumlocution", "cogent", "concomitant", "contravene",
        "deleterious", "desultory", "diaphanous", "disparate", "ebullient",
        "effervescent", "effulgent", "egregious", "egregious", "enervate",
        "equanimity", "esoteric", "evanescent", "exacerbate", "exiguous",
        "expedient", "expunge", "extricate", "facetious", "feckless",
        "furtive", "garrulous", "gregarious", "hermetic", "iconoclast",
        "ignominious", "impecunious", "inchoate", "inimical", "insidious",
        "intransigent", "jejune", "juxtapose", "labyrinthine", "laconic",
        "languid", "legerdemain", "lugubrious", "machiavellian", "maelstrom",
        "malfeasance", "malinger", "mellifluous", "mendicant", "mercurial",
        "misanthrope", "munificent", "nefarious", "obfuscate", "obloquy",
        "obtuse", "parsimonious", "paucity", "pecuniary", "pellucid",
        "perfidious", "perfunctory", "pernicious", "perspicacious", "pertinacious",
        "petulant", "plethora", "precipitate", "prevaricate", "proclivity",
        "profligate", "prosaic", "punctilious", "pungent", "quiescent",
        "quixotic", "raconteur", "recalcitrant", "recondite", "redolent",
        "reprehensible", "reprobate", "resplendent", "sagacious", "sanguine",
        "scurrilous", "serendipity", "simulacrum", "spurious", "stalwart",
        "strident", "succinct", "surreptitious", "taciturn", "trenchant",
        "truculent", "tumultuous", "ubiquitous", "umbrage", "usurp",
        "vacillate", "veracity", "vituperate", "vociferous", "voracious",
        "wheedle", "winsome", "wistful", "wizened", "zealous",
        "aberration", "accede", "accolade", "acme", "acquiesce",
        "adamant", "admonish", "adulate", "adumbrate", "aegis",
        "affectation", "aleatory", "amalgamate", "ameliorate", "anachronism",
        "antediluvian", "apocryphal", "apogee", "apoplectic", "approbation",
        "arduous", "ascertain", "assimilate", "assortment", "attenuate",
        "audacious", "augment", "aureate", "austerity", "autodidact",
        "baleful", "bellicose", "bibulous", "bilious", "boondoggle",
        "cacophony", "captious", "cavil", "censorious", "chimerical",
        "compendious", "complaisant", "concomitant", "contumacious", "coruscate",
        "coterie", "craven", "credence", "cupidity", "deleterious",
        "demagogue", "denigrate", "denouement", "desultory", "diaphanous",
        "diffident", "disparate", "ebullient", "efficacious", "elide",
        "eloquent", "emollient", "enervate", "enigmatic", "ephemeral",
        "epistolary", "equanimity", "equipoise", "euphonious", "evanescent",
        "exacerbate", "exculpate", "expunge", "extemporaneous", "extirpate",
        "fatuous", "feckless", "flabbergasted", "flibbertigibbet", "fulsome",
        "furtive", "garrulous", "grandiloquent", "hackneyed", "halcyon",
        "harangue", "hirsute", "iconoclast", "ignominious", "impecunious",
        "imperious", "impertinent", "implacable", "impute", "inchoate",
        "indefatigable", "ineffable", "inexorable", "insidious", "insouciant"
    ];

    return {mostUsed, rarelyUsed, mediumUsed, numbers}
}