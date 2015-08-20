class Pair<A, B>
{
    constructor(public first : A, public second : B) { }
}

class Point extends Pair<number, number>
{
    get x() : number {
        return this.first;
    }
    
    set x(value : number) {
        this.first = value;
    }
    
    get y() : number {
        return this.second;
    }
    
    set y(value : number) {
        this.second = value;
    }
}
