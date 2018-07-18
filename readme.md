# Simple Javascript Neural Network 
### 
Simple Neural Network (SNN) is a JavaScript Client Side Simplified Neural Network Library for Designing Multi-Layer Neural Network. Developed as extended version to [The Coding Train's](https://www.youtube.com/user/shiffman) Neural Network Library Used by Daniel Shiffman's in Session 4: Neural Network Course. 

## Getting Started
Download the snn.js file and matrix.js file from the /lib into your Working directory.
Link both the files into your HTML document. 


### Creating a Instance
You can create instance of Neural Network by Simply creating an Object of NeuralNetork Class.
```
let brain = new NeuralNetwork(Array, Options);
```

Neural Network Class accepts two paramenters, of which the **First Parameter** i.e the Array is **Mandataory**
The Array defines the number of layers and number of nodes in each layer, 

#### Example
A Network With 3 Hidden Layers Would  Need an array of length 5 (+2 input and output).

```
let design = [3,4,4,3,2];
let brain = new NeuralNetwork(design);
```
In the above example, the first element of design (i.e design[0]) specifies the number of inputs, and the last element (i.e design[4]) specifies the number of ouput. And every other number in between (i.e design[1-3]) specifies number of neuron (nodes) at each layer. 

## Options
The NeuralNetwork Class Second Optional Parameter (a JSON object) can be used to change parameters of the Network such as the Learning Rate and  Activation function.

### Learning Rate
To change the learning rate,  pass an object containing the key learning_rate and a value between 0-1 or 1-100 (the latter will be normalized to 0-1).

> Default learning_rate value is **0.1 (i.e 10)**

```
let options = {
    learning_rate: 0.2   // or 20
};
let design = [3,4,4,3,2];
let brain = new NeuralNetwork(design, options);
```
### Activation Function
To change the Activation Function, pass an object containing the key activation which should have its value as a function that accepts one value and returns a value. Activation function also needs to have a mandatory second key-value pair the Derivative of the new Activation Function.

> Default Activation Function is the Sigmoid Function.
> Note: The derivative function recieves parameter that has been passed through activation function. Work the derivative function relative to it.

```
let options = {
    activation: function(x){
        return (1 / (1 + Math.exp(-x)) );
    },
    derivative: function(y){
        // here the y, is already passed through activation(x). Works well for the Sigmoid.
        return (y * (1-y));
    }
};
let design = [3,4,4,3,2];
let brain = new NeuralNetwork(design, options);
```
## Example Implementation Code
A simple Example for implementing a simple network to find largest of 2 numbers.
```
<body>    
    <script src="./lib/matrix.js"></script>
    <script src="./lib/snn.js"></script>    
    <script>
        brain = new NeuralNetwork([2,3,2]);
        for(let i = 0; i < 10000 ; i++ ){
            let num1 = Math.random();
            let num2 = Math.random();
            brain.train([num1,num2], (num1>num2?[1,0]:[0,1]));
        }

        largest = brain.predict([10,20]);
        console.log(`Probability Score for Largest: ${largest}`)
    </script>
</body>
```

## Credits:
##### Daniel Shiffman  : [The Coding Train](https://www.youtube.com/user/shiffman)