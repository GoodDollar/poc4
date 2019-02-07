//@flow
class Shared {

    isClient():boolean{
        return(typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]')
    }

    isNode():boolean{
        return(typeof global !== "undefined"  && ({}).toString.call(global) === '[object global]')
    }   
}

export default Shared