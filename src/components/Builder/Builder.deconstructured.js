const thresholdAlert = (...limits) => {
  let asked = false;
  return (args) => {
    if(asked) {
      return false;
    }
    const reached = limits.every(limit => limit(args));
    if(!reached) {
      return false;
    }
    asked = true;
    return true;
  }
}
