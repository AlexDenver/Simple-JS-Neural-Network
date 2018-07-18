# Simple Javascript Neural Network 
### 
Simple Neural Network (SNN) is a JavaScript Simplified Neural Network Library for Designing Multi-Layer Neural Network. SNN helps you to Work with the Basics concepts of Neural Network and Deep Learning, and understand them without being overwhelmed by extra and advanced features Deep Learning has to provide with Tools like TensorFlow. 

SNN can help you get on with the basics of designing and running a basic Neural Network that you can train with your own labeled data-set and have the Network Predict the output for New/Unknown Data Inputs.

## Getting Started
Download the snn.js file and matrix.js file from the /lib into your Working directory.
Link both the files into your HTML document or Import them into your Node Project. 


### Creating a Instance
You can create instance of Neural Network by Simply creating an Object of NeuralNetork Class.
```javascript
let brain = new NeuralNetwork(Array, Options);
```

Neural Network Class accepts two paramenters, of which the **First Parameter** i.e the Array is **Mandataory**
The Array defines the number of layers and number of nodes in each layer, 

#### Example
A Network With 3 Hidden Layers Would  Need an array of length 5 (+2 input and output).

```javascript
let design = [2,4,3,2];
let brain = new NeuralNetwork(design);
```
In the above example, the first element of design (i.e design[0]) specifies the number of inputs, and the last element (i.e design[4]) specifies the number of ouput. And every other number in between (i.e design[1-3]) specifies number of neuron (nodes) at each layer. 
> For the above example, we have two inputs [**2**,4,3,2] and two outputs [2,4,3,**2**]. ( and 2 hidden layers with 4 and 3 nodes ) 

## Options
The NeuralNetwork Class Second Optional Parameter (a JSON object) can be used to change parameters of the Network such as the Learning Rate and  Activation function.

### Learning Rate
To change the learning rate,  pass an object containing the key learning_rate and a value between 0-1 or 1-100 (the latter will be normalized to 0-1).

> Default learning_rate value is **0.1 (i.e 10)**

```javascript
let options = {
    learning_rate: 0.2   // or 20
};
let design = [2,4,3,2];
let brain = new NeuralNetwork(design, options);


```
### Activation Function
To change the Activation Function, pass an object containing the key activation which should have its value as a function that accepts one value and returns a value. Activation function also needs to have a mandatory second key-value pair the Derivative of the new Activation Function.

> Default Activation Function is the Sigmoid Function.

> Note: The derivative function recieves parameter that has been passed through activation function. Work the derivative function relative to it.

```javascript
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
## Working With Network
To work with any Neural Network there are two fundamental behaviours, train the network and test the network. The NeuralNetwork Object also gives you two functions to work/interact with,

### 1. Train Your Network
Training a Network is the process of feeding the network with labelled data-set (i.e give inputs along with actual answers). This allows your network to predict its answer and then verify with actual answer and make corrections to various properties of the network (ex. Weights and Biases) so that it can improve its prediction for consequent new data-inputs. 
> It is recommended to train your data with large *distinct* data-set to make your Network more efficient. 

We make use of the train method of NeuralNetwork class to **train** the Network. 

```javascript
    // Say we are trying to build a network that will predict the largest of two numbers. ( a rather simple example )  
    for(let i = 0; i < 10000 ; i++ ){
        let num1 = Math.random();
        let num2 = Math.random();
        // although random() generates numbers between 0 - 1, the network will be capable to compute for any numbers
        brain.train([num1,num2], (num1>num2?[1,0]:[0,1])); 
        
        //i.e brain.train(Inputs, Targets);
    }
```
The ternary expression above in the train method, tests if num1 is greater than num2. If its true its passes [1,0] (i.e first number is largest) else [0,1] (i.e second number is largest).

> The expression would look like: brain.train([0.43541, 0.24151], [1,0]); as num1 is largest.

> *Make sure the array size of train **Inputs** and **Targets** matches the number of inputs & outputs specified while creating the Instance.*

### 2. Test Your Network
Testing is basically you trying to check how well the network does for given inputs. Here we give the network new set of data to predict and it'll tell its prediction. 
NeuralNetwork class has **predict** method to do this job.
```javascript
largest = brain.predict([10,20]);
console.log(`Probability Score for Largest: ${largest}`)
```
The predict method returns an array containing the probability score telling which of the two numbers is the largest. The score that is highest will be the largest number. 
> *Make sure the array size of predict matches the number of inputs specified while creating the Instance.*

## Example Implementation Code Put Together
A simple Example for implementing a simple network to find largest of 2 numbers.
```javascript
<body>    
    <script src="./lib/matrix.js"></script>
    <script src="./lib/snn.js"></script>    
    <script>
        let design = [2,4,3,2];
        let brain = new NeuralNetwork(design);
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
Developed as extended version to [The Coding Train's](https://www.youtube.com/user/shiffman) Neural Network Library Used by Daniel Shiffman's in Session 4: Neural Network Course. 
