const limiter = (...limits) => {
  let asked = false;
  return (...args) => {
    if(asked) {
      return true;
    }
    const reached = limits.every((limit, index) => {
      return limit(args[index]);
    })
    if(!reached) {
      return false;
    }
    asked = true;
    return true;
  }
}
