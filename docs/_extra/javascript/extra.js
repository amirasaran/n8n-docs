// If the user has accepted cookies, set the n8n-consent cookie
// This means if they then go to the website, they won't be prompted again
let docsConsent = __md_get("__consent")
let d = new Date();
d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
let n8nCookie = {'consent': true};
// When user clicks Accept on the consent form, page reloads and this sets
// If it breaks, check the page reload is still happening
if (docsConsent && docsConsent.analytics === true) {
  document.cookie = `n8n-consent=${JSON.stringify(n8nCookie)};expires=${d.toUTCString()};path=/;domain=.n8n.io`;
}

// If the user already has the n8n-consent cookie, accept cookies in docs as well
let n8nCookieConsent = getCookie("n8n-consent");
n8nCookieConsent = JSON.parse(n8nCookieConsent);
console.log("one");
console.log(n8nCookieConsent);
console.log("two");
console.log(n8nCookieConsent.consent);

if(n8nCookieConsent && n8nCookieConsent.consent === true) {
	console.log("in if");
	__md_set("__consent", {"analytics": true})
  let el = document.querySelector("[data-md-component=consent]")
  el.hidden = true
}

// Function to help with extracting cookies by name
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
