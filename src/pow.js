d3.pow = function() {
  var linear = d3.linear(),
      p = 1,
      b = 1 / p;

  function powp(x) {
    return Math.pow(x, p);
  }

  function powb(x) {
    return Math.pow(x, b);
  }

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  scale.exponent = function(x) {
    if (!arguments.length) return p;
    var domain = scale.domain();
    p = x;
    b = 1 / x;
    return scale.domain(domain);
  };

  return scale;
};
