var ss = document.styleSheets;

for (i = 0; i < ss.length; i++) {
  var rules = ss[i];
  for (j = 0; j < rules.cssRules.length; j++) {
    var r = rules.cssRules[j];
    if (r.selectorText == ".bg:before" || r.selectorText == ".bg::before") {
      console.log('Old rule: ' + r.cssText)
      r.style.height = window.innerHeight + 'px';
      console.log('Modified rule: ' + r.cssText)
    }
  }
}