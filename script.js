let brain;
function setup(){
    brain = new NeuralNetwork([2,2]);
    
    for(let i = 0; i < 10000 ; i++ ){
        let num1 = Math.random();
        let num2 = Math.random();
        brain.train([num1,num2], (num1>num2?[1,0]:[0,1]));
    }
}

setup();