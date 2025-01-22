// REO script
!(function () {
  var e, t, n;
  (e = "638190bf025179e"),
    (t = function () {
      Reo.init({ clientID: "638190bf025179e" });
    }),
    ((n = document.createElement("script")).src = "https://static.reo.dev/" + e + "/reo.js"),
    (n.async = !0),
    (n.onload = t),
    document.head.appendChild(n);
})();

// Hubspot script
const script = document.createElement("script");
script.type = "text/javascript";
script.id = "hs-script-loader";
script.async = true;
script.defer = true;
script.src = "//js.hs-scripts.com/23114811.js";
document.head.appendChild(script);

// RB2B script.
!(function () {
  var reb2b = (window.reb2b = window.reb2b || []);
  if (reb2b.invoked) return;
  reb2b.invoked = true;
  reb2b.methods = ["identify", "collect"];
  reb2b.factory = function (method) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      reb2b.push(args);
      return reb2b;
    };
  };
  for (var i = 0; i < reb2b.methods.length; i++) {
    var key = reb2b.methods[i];
    reb2b[key] = reb2b.factory(key);
  }
  reb2b.load = function (key) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/8XOE9GH5EDOM.js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
  };
  reb2b.SNIPPET_VERSION = "1.0.1";
  reb2b.load("8XOE9GH5EDOM");
})();
