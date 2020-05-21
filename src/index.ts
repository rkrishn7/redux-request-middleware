function delay(t : number, v? : any) : Promise<any> {
    return new Promise(function(resolve) {
        setTimeout(resolve.call(null, v), t);
    });
}