class LayerLink{
    constructor(prevNode_count,node_count){
        this.weights = new Matrix(node_count, prevNode_count);
        this.bias = new Matrix(node_count, 1);
        this.weights.randomize();
        this.bias.randomize();
        
        //console.table(this.weights.data)
        //console.table(this.bias.data)
    }
    updateWeights(weights){
        this.weights = weights;
    }
    getWeights(){
        return this.weights;
    }
    getBias(){
        return this.bias;
    }
    add(deltaWeight, bias){
        this.weights.add(deltaWeight);
        this.bias.add(bias);
    }
}

class NeuralNetwork {
    constructor(layers, options) {
        if(layers.length < 2){
            console.error("Neural Network Needs Atleast 2 Layers To Work.");
            return {layers: layers};
        }
        this.options = {
            activation: function(x){
                return (1 / (1 + Math.exp(-x)) );
            },
            derivative: function(y){
                return (y * (1-y));
            }
        }
        this.learning_rate = 0.1;
        if(options){
            if(options.learning_rate)
                this.setLearningRate(parseFloat(options.learning_rate));
            if( options.activation && options.derivative && 
                options.activation instanceof Function && 
                options.derivative instanceof Function){
                this.options.activation = options.activation;
                this.options.derivative = options.derivative;
            }else{
                console.error("Check Documentation to Learn How To Set Custom Activation Function");
                console.warn("Documentation Link: http://github.com/AlexDenver")
                return {options: options};
            }
        }
        this.layerCount = layers.length - 1;   // Ignoring Output Layer.
        this.inputs = layers[0];
        this.output_nodes = layers[layers.length-1];                
        this.layerLink = [];
        for(let i = 1, j = 0; j<(this.layerCount); i++, j++){
            if(layers[i] <= 0 ){
                console.error("A Layer Needs To Have Atleast One Node (Neuron).");
                return {layers: layers};
            }
            this.layerLink[j] = new LayerLink(layers[j], layers[i]);    // Previous Layer Nodes & Current Layer Nodes
        }

    }

    predict(input_array) {
        if(input_array.length !== this.inputs){
            console.error(`This Instance of NeuralNetwork Expects ${this.inputs} Inputs, ${input_array.length} Provided.`);
            return {inputs : input_array};
        }
        let input = Matrix.fromArray(input_array);
        let layerResult = input;
        for(let i = 0 ; i < this.layerCount ; i++ ){
            layerResult = Matrix.multiply(this.layerLink[i].getWeights(), layerResult);
            layerResult.add(this.layerLink[i].getBias());
            layerResult.map(this.options.activation);
        }
        // The Last Layer Result will be the Final Output.
        return layerResult.toArray();
    }

    setLearningRate(n){
        if(n>1 && n<100){
            n = n/100;
        }else{
            console.error("Set Learning Rate Between (0 - 1) or (1 - 100)");
            return;
        }
        if(n>0.3){
            console.warn("It is recommended to Set Lower Learning Rates");
        }
        this.learning_rate = n;
    }

    train(input_array, target_array) {
        if(input_array.length !== this.inputs){
            console.error(`This Instance of NeuralNetwork Expects ${this.inputs} Inputs, ${input_array.length} Provided.`);
            return {inputs : input_array};
        }
        if(target_array.length !== this.output_nodes){
            console.error(`This Instance of NeuralNetwork Expects ${this.output_nodes} Outputs, ${target_array.length} Provided.`);
            return {outputs : target_array};
        }
        let input = Matrix.fromArray(input_array);
        // Array to Store/Track each Layer Weighted Result (sum)
        let layerResult = [];
        layerResult[0] = input;  // Since input is First Layer.
        // Predicting the Result for Given Input, Store Output of each Consequent layer
        for (let i = 0; i < this.layerCount; i++) {            
            layerResult[i + 1] = Matrix.multiply(this.layerLink[i].getWeights(), layerResult[i]);
            layerResult[i + 1].add(this.layerLink[i].getBias());
            layerResult[i + 1].map(this.options.activation);
        }

    
        
        let targets = Matrix.fromArray(target_array);
        // Variables to Store Errors and Gradients at each Layer.
        let layerErrors = [];
        let gradients = [];

        // Calculate Actual Error based on Target.
        layerErrors[this.layerCount] = Matrix.subtract(targets, layerResult[this.layerCount]);

        // Correcting and Recalculating Error for each Layer
        for ( let i = this.layerCount ; i >  0 ; i-- ){
            // Calculate the Layer Gradient 
            // dyE/dyW = learning_rate * layerError * sigmoid(x) * (1-sigmoid(x)); 
            // NOTE: dsigmoid = sigmoid(x) * (1-sigmoid(x) ie derivative of sigmoid

            gradients[i] = Matrix.map(layerResult[i], this.options.derivative);       
            gradients[i].multiply(layerErrors[i]);              
            gradients[i].multiply(this.learning_rate);            
        
            // Calculate the Changes to be made to the weighs
            let hidden_T = Matrix.transpose(layerResult[i-1]);           
            let weight_ho_deltas = Matrix.multiply(gradients[i], hidden_T);   
            
            // Update the Weights and Gradient According to Deltas & Gradient.
            this.layerLink[i-1].add(weight_ho_deltas, gradients[i]);

            // Calculate the Previous Layer Errors (Proportional Error based on Current Layer Error.)
            // NOTE: We are Backpropogating, Therefore we are going backwards 1 step (i.e. i-1)
            layerErrors[i-1] = Matrix.multiply(Matrix.transpose(this.layerLink[i-1].getWeights()), layerErrors[i]);
        }
    }
}



