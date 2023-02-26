interface CardList {
    class: string;
    code: string;
    name: string;
    amount: string;
    iconSrcEndpoint: string;
}

export const CARDLIST: CardList[]  = [
    {
        class: "hryvnia base", 
        code: "uah", 
        name: "Ukrainian hryvnia", 
        amount: "1", 
        iconSrcEndpoint: "hryvnia_icon.png" 
    },

    {
        class: "dollar", 
        code: "usd", 
        name: "United States dollar", 
        amount: "1", 
        iconSrcEndpoint: "dollar_icon.png" 
    },
    
    {
        class: "euro", 
        code: "eur", 
        name: "Euro", 
        amount: "1", 
        iconSrcEndpoint: "euro_icon.png" 
    }
]