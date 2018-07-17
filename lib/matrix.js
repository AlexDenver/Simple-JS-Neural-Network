class Matrix {

    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
    
        this.data = [];    
        for(let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++)
                this.data[i][j] = 0;
        }
    
    
    }
    static multiply(m1, m2){
        if(m1.cols!==m2.rows){
            console.log("Cannot Operate, Check Matrix Multiplication Rules.");
            return undefined;
        }else{
            let result = new Matrix(m1.rows, m2.cols);                
            
            for(let i = 0; i < result.rows; i++)     
                for(let j = 0; j < result.cols; j++){
                    let sum = 0;
                    for(let k = 0; k < m1.cols; k++){
                        sum += m1.data[i][k] * m2.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            return result;
        }
    }
    
    multiply(n) {
        if(n instanceof Matrix){

            for(let i = 0; i < this.rows; i++)     
               for(let j = 0; j < this.cols; j++)
                this.data[i][j] *= n.data[i][j];

        }else{
            
            for(let i = 0; i < this.rows; i++)     
               for(let j = 0; j < this.cols; j++)
                    this.data[i][j] *= n;
        }
    }
    
    add(n) {
        if(n instanceof Matrix){
            for(let i = 0; i < this.rows; i++)     
                for(let j = 0; j < this.cols; j++)
                    this.data[i][j] += n.data[i][j];
        } else {
            for(let i = 0; i < this.rows; i++)     
                for(let j = 0; j < this.cols; j++)
                    this.data[i][j] += n;
        }
        
    }

    static subtract(a , b){
        let res = new Matrix(a.rows, a.cols);
        for(let i = 0; i < a.rows; i++)     
                for(let j = 0; j < a.cols; j++)
                    res.data[i][j] = a.data[i][j] - b.data[i][j];
        return res;
    }

    map(func){
        for(let i = 0; i < this.rows; i++)     
                for(let j = 0; j < this.cols; j++){
                    let val = this.data[i][j];
                    this.data[i][j] = func(val);
                }
    }

    static map(m,func){
        for(let i = 0; i < m.rows; i++)     
                for(let j = 0; j < m.cols; j++){
                    let val = m.data[i][j];
                    m.data[i][j] = func(val);
                }
        return m;
    }

    

    randomize(){
        for(let i = 0; i < this.rows; i++)     
            for(let j = 0; j < this.cols; j++)
                this.data[i][j] = (Math.random()*2) - 1;  //between -1 and 1
    }

    static transpose(m){
        let res = new Matrix(m.cols, m.rows);
        for(let i = 0; i < m.rows; i++)     
                for(let j = 0; j < m.cols; j++)
                    res.data[j][i] = m.data[i][j];
        return res;
    }

    print(){
        console.table(this.data);
    }

    toArray(){
        let arr = [];
        for(let i = 0; i < this.rows; i++)     
                for(let j = 0; j < this.cols; j++)
                    arr.push(this.data[i][j]);
        return arr;
    }

    static fromArray(array){
        let m = new Matrix(array.length, 1);
        for(let i = 0; i < array.length; i++){
            m.data[i][0] = array[i];
        }
        // m.print();
        return m;
    }

};


