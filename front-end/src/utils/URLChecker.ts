export function URLChecker(urlToCheck:string):boolean{
    //THIS HELPER FUNCTION CHECK IF THE URL IS VALID OR NOT.
    try {
        new URL(urlToCheck);
        return true;
    }catch {
        return false;
    }
}

