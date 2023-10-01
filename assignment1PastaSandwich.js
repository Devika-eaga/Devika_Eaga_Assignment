const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    MENULIST: Symbol("menulist"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DESSERTS: Symbol("desserts"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sPickItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDesserts = "";
        this.sDrinks = "";
        this.sItem = ["Pasta", "Sandwich"];
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MENULIST;
                aReturn.push("Welcome to Devika's Restaurant.");
                aReturn.push("Please pick the item from Menu List");
                aReturn.push("1.Pasta");
                aReturn.push("2.Sandwich");
                break;
            case OrderState.MENULIST:
                if (sInput === "1" || sInput.toLowerCase() === "Pasta") {
                    this.sPickItem = "Pasta";
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Please select the size of pasta box?");
                    aReturn.push("small ($8.00), Medium ($12.00), Large ($16.00)");
                } 
                else if (sInput === "2" || sInput.toLowerCase() === "Sandwich") {
                    this.sPickItem = "Sandwich";
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Please select the size of Sandwich ?");
                    aReturn.push("small ($4.50), Medium ($6.00), Large ($10.00)");
                }
                else {
                    aReturn.push("Invalid menu selected, please select either Pasta or Sandwich");
                }
                break;

            case OrderState.SIZE:
                this.sSize = sInput.toLowerCase();
                if(this.sSize === "small" || this.sSize === "medium"|| this.sSize === "large")
                {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?, if yes, please provide which toppings you want.");
                }
                else{
                    aReturn.push("Invalid item please select the correct size.");
                }
                
                break;     
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DESSERTS
                this.sToppings = sInput;
                aReturn.push("Would you like to add Desserts?, if yes, please select Icecream or Sweet.");
                break;
            case OrderState.DESSERTS:
                this.sDesserts = sInput;
                this.stateCur = OrderState.DRINKS;
                aReturn.push("Would you like to add drinks?if yes, please select Pepsi or Coke.");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`your Order deatils:\n Item: ${this.sPickItem} \n Size: ${this.sSize} \n Toppings: ${this.sToppings} \n Dessert: ${this.sDesserts} \n Drinks:${this.sDrinks}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let Price = this.PriceCalculator();
                aReturn.push(`Order Price: $${Price.toFixed(2)}`);
    
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    };
    PriceCalculator() {
        let initialPrice = 0;

        switch (this.sPickItem) {
            case "Pasta":
                switch (this.sSize.toLowerCase()) {
                    case "small":
                        initialPrice = 8.00;
                        break;
                    case "medium":
                        initialPrice = 12.00;
                        break;
                    case "large":
                        initialPrice = 16.00;
                        break;
                }
                break;

            case "Sandwich":
                switch (this.sSize.toLowerCase()) {
                    case "small":
                        initialPrice = 4.50;
                        break;
                    case "medium":
                        initialPrice = 6.00;
                        break;
                    case "large":
                        initialPrice = 10.00;
                        break;
                }
                break;

            default:
                break;
        }
        let finalPrice = initialPrice;
        return finalPrice;
    }
};
